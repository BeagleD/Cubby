import request from 'request';

const singleton = Symbol('Webhook');
const singletonEnforcer = Symbol('WebhookEnforcer');

class Webhook {

  send(session, event) {
    const { mongo, secretKey } = session;
    const { WebhooksDB } = mongo.getDB(secretKey);
    const { type, userId } = event;

    WebhooksDB.find({
      userId,
      eventTypes: { $in: [type] },
    }).toArray((error, webhooks) => {
      if (webhooks) {
        delete event._id;
        delete event.userId;

        for (let i = 0, len = webhooks.length; i < len; i += 1) {
          const webhook = webhooks[i];
          if (webhook.url.indexOf('api.sharetempus.com') < 0) {
            // send webhook by post method
            try {
              request.post({
                url: webhook.url,
                json: true,
                headers: { 'content-type': 'application/json' },
                body: event,
              });
            } catch (err) {
              // console.log(err);
            }
          }
        }
      }
    });
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Webhook(singletonEnforcer);
    }

    return this[singleton];
  }
}

const webhook = Webhook.instance;

export default webhook;
