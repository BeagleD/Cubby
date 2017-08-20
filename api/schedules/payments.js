import moment from 'moment';
import schedule from 'node-schedule';
import mongo from '../services/mongo';

const startPaymentsSchedules = () => {
  mongo.connect().then(() => {
    const testDB = mongo.getTestDB();
    const liveDB = mongo.getLiveDB();

    runPaymentStatusSchedule(testDB, {
      date: 1,
      hour: 4,
      minute: 5,
    });

    runPaymentStatusSchedule(liveDB, {
      date: 1,
      hour: 2,
      minute: 5,
    });

    runPaymentTaxesSchedule(testDB, {
      date: 11,
      hour: 4,
      minute: 5,
    });

    runPaymentTaxesSchedule(liveDB, {
      date: 11,
      hour: 2,
      minute: 5,
    });
  });
};

function runPaymentStatusSchedule(db, scheduleTime) {
  const rule = new schedule.RecurrenceRule();

  rule.date = scheduleTime.date;
  rule.hour = scheduleTime.hour;
  rule.minute = scheduleTime.minute;

  schedule.scheduleJob(rule, () => {
    const date = moment().add(-1, 'month');
    const year = date.year();
    const month = date.month();

    const { PaymentsDB } = db;

    PaymentsDB.find({
      year,
      month,
    }).toArray((err, payments) => {
      if (!err && payments && payments.length > 0) {
        updatePaymentStatus(db, payments);
      }
    });
  });
}

function updatePaymentStatus(db, payments) {
  if (payments.length !== 0) {
    const { PaymentsDB } = db;
    const payment = payments[0];
    payment.status = 'payable';

    PaymentsDB.update({
      _id: payment._id,
    }, {
      $set: payment,
    }, (err) => {
      if (err) {
        updatePaymentStatus(db, payments);
      } else {
        payments.splice(0, 1);
        updatePaymentStatus(db, payments);
      }
    });
  }
}

function runPaymentTaxesSchedule(db, scheduleTime) {
  const rule = new schedule.RecurrenceRule();

  rule.date = scheduleTime.date;
  rule.hour = scheduleTime.hour;
  rule.minute = scheduleTime.minute;

  schedule.scheduleJob(rule, () => {
    const today = moment().valueOf();
    const { PaymentsDB } = db;

    PaymentsDB.find({
      status: 'payable',
      expires: { $lte: today },
    }).toArray((err, payments) => {
      if (!err && payments && payments.length > 0) {
        updatePaymentTax(db, payments);
      }
    });
  });
}

function updatePaymentTax(db, payments) {
  if (payments.length === 0) {
    const { PaymentsDB } = db;
    const payment = payments[0];
    const MONTH = 2592000000;
    const taxValue = payments[0].value * 0.05;

    if (!payment.taxes) {
      payment.taxes = [];
    }

    payment.taxes.push({
      percent: 0.05,
      value: taxValue,
      totalBefore: payment.value,
      totalAfter: (payment.value + taxValue),
    });

    payment.value += taxValue;
    payment.expires += MONTH;

    PaymentsDB.update({
      _id: payment._id,
    }, {
      $set: payment,
    }, (err) => {
      if (err) {
        updatePaymentTax(db, payments);
      } else {
        payments.splice(0, 1);
        updatePaymentTax(db, payments);
      }
    });
  }
}

export default startPaymentsSchedules;
