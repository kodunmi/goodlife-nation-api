import { Convert } from './convert/entities/convert.entity';
import { UserService } from 'src/user/user.service';
import { RoyalChapter } from 'src/royal-chapter/entities/royal-chapter.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoyalChapterModule } from './royal-chapter/royal-chapter.module';
import { User } from './user/entities/user.entity';
import { TenModule } from './ten/ten.module';
import { Ten } from './ten/entities/ten.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { RpnTodayModule } from './rpn-today/rpn-today.module';
import { QuoteModule } from './quote/quote.module';
import { Quote } from './quote/entities/quote.entity';
import { RpnToday } from './rpn-today/entities/rpn-today.entity';
import { TwilioModule } from 'nestjs-twilio';
import { SmsService } from './sms/sms.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConvertModule } from './convert/convert.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.RDS_HOSTNAME,
      port: parseInt(process.env.RDS_PORT),
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
      entities: [RoyalChapter, User, Ten, Message, Quote, RpnToday, Convert],
      synchronize: true,
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    UserModule,
    RoyalChapterModule,
    TenModule,
    MessageModule,
    RpnTodayModule,
    QuoteModule,
    AuthModule,
    ConvertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[
    UserModule
  ]
})
export class AppModule { }
