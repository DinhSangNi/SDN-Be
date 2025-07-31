import { ConfigService } from '@nestjs/config';
import { Booking } from '../booking/schema/booking.schema';
export declare class MailService {
    private readonly configService;
    private transporter;
    constructor(configService: ConfigService);
    sendAccountCreationEmail(email: string): Promise<void>;
    sendBookingCreationEmail(email: string, booking: Booking & {
        user: {
            email: string;
        };
        lab: {
            name: string;
        };
        seat: {
            seatNumber: string;
        };
    }): Promise<void>;
}
