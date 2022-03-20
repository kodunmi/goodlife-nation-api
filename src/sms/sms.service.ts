import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { UserService } from 'src/user/user.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
    public constructor(
        @InjectTwilio()
        private readonly client: TwilioClient) { }

    async sendSMS(phoneNumber: string, message: string) {
        phoneNumber = phoneNumber.replace(/[^A-Z0-9+]+/ig, "").slice(0, 4) +  phoneNumber.replace(/[^A-Z0-9+]+/ig, "").slice(5,  phoneNumber.replace(/[^A-Z0-9+]+/ig, "").length)
        try {
            return await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber,
            });
        } catch (e) {
            return e;
        }
    }
}
