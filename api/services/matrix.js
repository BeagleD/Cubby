const singleton = Symbol('Matrix');
const singletonEnforcer = Symbol('MatrixEnforcer');

class Matrix {

  createMatrix({ session, matrix }) {
    const { mongo, secretKey } = session;
    const { MatrixDB } = mongo.getDB(secretKey);

    MatrixDB.insert(matrix);
  }

  updateMatrix({ session, matrix }) {
    const { mongo, secretKey } = session;
    const { MatrixDB } = mongo.getDB(secretKey);

    MatrixDB.update({
      _id: matrix._id,
    }, {
      $set: matrix,
    });
  }

  updateMatrixValues({ session, policy, type }) {
    return new Promise((resolve) => {
      const { mongo, secretKey } = session;
      const { MatrixDB } = mongo.getDB(secretKey);
      const { startDate, endDate, product } = policy;
      const { subcategory } = product;
      const timeDiff = Math.abs(Number(endDate) - Number(startDate));
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const interval = {};

      // number of years
      interval.year = Math.floor(diffDays / 365);
      diffDays %= 365;

      // number of months
      interval.month = Math.floor(diffDays / 30);
      diffDays %= 30;

      // number of weeks
      interval.week = Math.floor(diffDays / 7);
      diffDays %= 7;

      // number of days
      interval.day = diffDays;

      MatrixDB.find().toArray((err, matrices) => {
        let matrix = {};

        if (matrices.length > 0) {
          matrix = matrices[0];

          if (!matrix[subcategory]) {
            matrix[subcategory] = this.generateNewMatrix();
          }
        } else {
          matrix[subcategory] = this.generateNewMatrix();
        }

        // increment total
        matrix[subcategory].total += 1;

        // calculate value
        const price = matrix[subcategory].price;
        const productValue = policy.product.value;
        const value = {
          day: productValue * price.day * interval.day,
          week: productValue * price.week * interval.week,
          month: productValue * price.month * interval.month,
          year: productValue * price.year * interval.year,
        };

        // update income matrix
        if (type === 'income') {
          matrix[subcategory].income.day += value.day;
          matrix[subcategory].income.week += value.week;
          matrix[subcategory].income.month += value.month;
          matrix[subcategory].income.year += value.year;
        } else if (type === 'expense') {
          matrix[subcategory].expense.day += value.day;
          matrix[subcategory].expense.week += value.week;
          matrix[subcategory].expense.month += value.month;
          matrix[subcategory].expense.year += value.year;
        }

        // profit = (income / expense) / profitExpected
        const { income, expense, averageProfit, total } = matrix[subcategory];
        const minimumExpense = 0.4;
        const profitExpected = 1.5;

        const expenses = {
          day: (income.day * minimumExpense > expense.day) ?
            income.day * minimumExpense : expense.day,
          week: (income.week * minimumExpense > expense.week) ?
            income.week * minimumExpense : expense.week,
          month: (income.month * minimumExpense > expense.month) ?
            income.month * minimumExpense : expense.month,
          year: (income.year * minimumExpense > expense.year) ?
            income.year * minimumExpense : expense.year,
        };
        const profit = {
          day: (income.day / expenses.day) / profitExpected,
          week: (income.week / expenses.week) / profitExpected,
          month: (income.month / expenses.month) / profitExpected,
          year: (income.year / expenses.year) / profitExpected,
        };

        if (profit.day === 0) { profit.day = 1; }
        if (profit.week === 0) { profit.week = 1; }
        if (profit.month === 0) { profit.month = 1; }
        if (profit.year === 0) { profit.year = 1; }

        const profitAverage = {
          day: ((averageProfit.day * (total - 1)) / total) + (profit.day / total),
          week: ((averageProfit.week * (total - 1)) / total) + (profit.week / total),
          month: ((averageProfit.month * (total - 1)) / total) + (profit.month / total),
          year: ((averageProfit.year * (total - 1)) / total) + (profit.year / total),
        };

        // update average profit matrix
        matrix[subcategory].averageProfit = profitAverage;

        // update profit matrix
        matrix[subcategory].profit = profit;

        // price = ( currentPrice / profit )
        const prices = {
          day: price.day / profit.day,
          week: price.week / profit.week,
          month: price.month / profit.month,
          year: price.year / profit.year,
        };

        // update price matrix
        matrix[subcategory].price = prices;

        if (matrices.length > 0) {
          this.updateMatrix({ session, matrix });
        } else {
          this.createMatrix({ session, matrix });
        }

        resolve();
      });
    });
  }

  generatePolicyQuote({ session, policy }) {

  }

  generateNewMatrix() {
    const percent = {
      day: 0.15,
      week: 0.15,
      month: 0.15,
      year: 0.15,
    };
    const price = {
      day: (percent.day / 365),
      week: (percent.week / 365) * 7,
      month: (percent.month / 365) * 30,
      year: (percent.year / 365) * 365,
    };

    return {
      total: 0,
      income: { day: 0, week: 0, month: 0, year: 0 },
      expense: { day: 1, week: 1, month: 1, year: 1 },
      profit: { day: 1, week: 1, month: 1, year: 1 },
      averageProfit: { day: 1, week: 1, month: 1, year: 1 },
      price,
    };
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Matrix(singletonEnforcer);
    }

    return this[singleton];
  }
}

export default Matrix;
