import moment from 'moment';
import schedule from 'node-schedule';
import mongo from '../services/mongo';
import Matrix from '../services/matrix';

const startPoliciesSchedules = () => {
  mongo.connect().then(() => {
    runUpdateMatrixPolicySchedule(mongo.getTestDB(), {
      hour: 3,
      minute: 5,
    });

    runUpdateMatrixPolicySchedule(mongo.getLiveDB(), {
      hour: 1,
      minute: 5,
    });
  });
};

// run policies schedule to update matrix with expired policies
function runUpdateMatrixPolicySchedule(db, scheduleTime) {
  const rule = new schedule.RecurrenceRule();

  // rule.date = 25;
  rule.hour = scheduleTime.hour;
  rule.minute = scheduleTime.minute;

  schedule.scheduleJob(rule, () => {
    const today = moment().startOf('day').valueOf();
    const yesterday = moment().add(-1, 'day').startOf('day').valueOf();
    const { PoliciesDB } = db;

    // remove rejected policies
    PoliciesDB.find({
      createdAt: { $gte: yesterday },
      'private.created': false,
    }).toArray((err, policies) => {
      if (!err && policies && policies.length > 0) {
        const policiesId = policies.map(policy => policy._id);

        PoliciesDB.deleteMany({ _id: { $in: policiesId } });
      }
    });

    // update matrix
    PoliciesDB.find({
      endDate: { $lte: today },
      'private.matrixUpdated': false,
      'private.created': true,
    }).toArray((err, policies) => {
      if (!err && policies && policies.length > 0) {
        updatePolicyMatrix(db, policies);
      }
    });
  });
}

function updatePolicyMatrix(db, policies) {
  if (policies.length !== 0) {
    const { PoliciesDB } = db;
    const policy = policies[0];

    Matrix.updateMatrixValues({
      db,
      policy,
      type: 'income',
    }, () => {
      policy.private.matrixUpdated = true;

      PoliciesDB.update({
        _id: policy._id,
      }, {
        $set: policy,
      }, (err) => {
        if (err) {
          updatePolicyMatrix(db, policies);
        } else {
          policies.splice(0, 1);
          updatePolicyMatrix(db, policies);
        }
      });
    });
  }
}

export default startPoliciesSchedules;
