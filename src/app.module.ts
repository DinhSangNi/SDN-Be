import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { MediaModule } from './modules/media/media.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LabModule } from './modules/lab/lab.module';
import { BookingModule } from './modules/booking/booking.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { SeatModule } from './modules/seat/seat.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    CloudinaryModule,
    UserModule,
    PostModule,
    AuthModule,
    MediaModule,
    LabModule,
    BookingModule,
    GeminiModule,
    SeatModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
