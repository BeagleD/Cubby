import nodemailer from 'nodemailer';
import { MAIL_URL, MAIL_FROM } from '../configs';
import { formatDate, formatValue } from '../libs/utils';

const transporter = nodemailer.createTransport(MAIL_URL);

const singleton = Symbol('Email');
const singletonEnforcer = Symbol('EmailEnforcer');

class Email {
  sendTicketEmail({ customer, policy }) {
    const {
      quote,
      startDate,
      endDate,
      product,
      ticket,
    } = policy;
    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: MAIL_FROM,
      to: customer.email,
      subject: 'ShareTempus - Policy details', // Subject line
      // text: 'Hello world', // plaintext body
      html: `
        <p>Hi ${customer.legalEntity.firstName}, </p>
        <br/><br/>
        <p>Thanks for use ShareTempus! Here is your policy details: </p></br>
        <hr style="border: 0; border-bottom: 1px solid #ddd;"/>'
        <h4> Policy details: </h4>
        <ul>
          <li> Quote: $${formatValue(quote)} </li>
          <li> Period: ${formatDate(startDate)} - ${formatDate(endDate)} </li>
          <li> Ticket: <b>${ticket}</b> </li>
        </ul>
        <hr style="border: 0; border-bottom: 1px solid #ddd;"/>
        <h4> Product details: </h4>
        <ul>
          <li> Name: ${product.name} </li>
          <li> Value: $${formatValue(product.value)} </li>
          <li> Category: ${product.category} </li>
          <li> Subcategory: ${product.subcategory} </li>
          <li> Manufacturer: ${product.manufacturer} </li>
        </ul>
        <hr style="border: 0; border-bottom: 1px solid #ddd;"/>
        <p>You can use your ticket to open a claim clicking <a href="http://customers.sharetempus.com">here</a>. </p></br>
        <small>© 2017 ShareTempus</small>
      `,
    };

    this.sendEmail(mailOptions);
  }

  sendEmail(mailOptions) {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else if (info) {
        console.log(`Message sent: ${info.response}`);
      }
    });
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Email(singletonEnforcer);
    }

    return this[singleton];
  }
}

const email = Email.instance;

export default email;