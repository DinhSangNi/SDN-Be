"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    configService;
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configService.get('EMAIL_USER'),
                pass: configService.get('EMAIL_PASS'),
            },
        });
    }
    async sendAccountCreationEmail(email) {
        const mailOptions = {
            from: this.configService.get('EMAIL_USER'),
            to: email,
            subject: `Your account with email ${email} has been created on the FPT AISE Laboratory Management System`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              padding: 20px;
              color: #333;
              }
              .container {
                max-width: 600px;
                margin: auto;
                background-color: #fff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #2c3e50;
              }
              .footer {
                margin-top: 30px;
                font-size: 13px;
                color: #999;
                text-align: center;
              }
              .credentials {
                background-color: #f0f0f0;
                padding: 10px;
                border-radius: 4px;
                margin: 10px 0;
                font-family: monospace;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">Hello ${email},</div>
              <p>Your account has been successfully created on the <strong>FPT AISE Laboratory Management System</strong>.</p>
              <p>Please log in with this email: ${email}</p>

              <p>You can access the system at: <a href="${this.configService.get('FE_URL')}">${this.configService.get('FE_URL')}</a></p>

              <p>Best regards,<br />The System Administration Team</p>
              <div class="footer">
                This is an automated message. Please do not reply to this email.
              </div>
            </div>
          </body>
        </html>
      `,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendBookingCreationEmail(email, booking) {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(booking.date);
        const sendOptions = {
            from: this.configService.get('EMAIL_USER'),
            to: email,
            subject: `[Booking Confirmed] ${booking.lab.name} - Slot ${booking.slot} on ${formattedDate} (Seat ${booking.seat.seatNumber})`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              color: #333;
              }
              .container {
                max-width: 600px;
                margin: auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                font-size: 20px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 20px;
              }
              .details {
                background-color: #f0f0f0;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
                font-family: monospace;
              }
              .footer {
                font-size: 13px;
                color: #888;
                margin-top: 30px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">Your Lab Booking is Confirmed</div>

              <p>Hi ${booking.user.email},</p>
              <p>
                You have successfully reserved a seat using the <strong>FPT AISE Laboratory Management System</strong>.
                Below are the details of your booking:
              </p>

              <div class="details">
                <p><strong>Lab:</strong> ${booking.lab.name}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time Slot:</strong> Slot ${booking.slot}</p>
                <p><strong>Seat:</strong> ${booking.seat.seatNumber}</p>
              </div>

              <p>Please arrive on time and follow all lab safety rules during your session.</p>

              <p>You can view or manage your booking at: <a href="${`${this.configService.get('FE_URL')}/booking`}">${`${this.configService.get('FE_URL')}/booking`}</a></p>

              <p>Best regards,<br />FPT AISE Laboratory Managemant Team</p>

              <div class="footer">
                This is an automated email. Please do not reply to this message.
              </div>
            </div>
          </body>
        </html>
      `,
        };
        await this.transporter.sendMail(sendOptions);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map