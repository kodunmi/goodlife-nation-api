import { UpdatePasswordDto } from './dto/update-password.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/sms/sms.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { ResendOtpDto } from './dto/resendOtp.dto';
import { ResetPasswordDto } from './dto/rest-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly smsService: SmsService,
    ) { }
    async register(userDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.usersService.create(userDto);

            let resp = await this.smsService.sendSMS(user.phone, 'Your verification code is: ' + await this.usersService.getOtp(user.id));

            this.usersService.update(user.id, { expireAt: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)) });

            return user

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ user: User, token: string }> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);

        const token = this._createToken(user);

        return {
            user: user,
            token: token,
        };
    }

    async validateUserByToken(token: string): Promise<User> {
        const user: User = await this.jwtService.verify(token);
        return user;
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmail(email, password);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private _createToken({ email, password }: User): any {

        const accessToken = this.jwtService.sign(
            {
                email,
                password,
            },
            {
                secret: 'secret',
                privateKey: 'lekan',
                expiresIn: 2000,
            }
        );
        return accessToken;
    }

    async verifyPhone({phone , otp}:VerifyPhoneDto): Promise<User> {
        const user = await this.usersService.findOneByPhoneNumber(phone);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if(user.verified){
            throw new HttpException('User is already verified', HttpStatus.BAD_REQUEST)
        }

        if (user.otp != otp) {
            throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
        }

        if (user.expireAt < new Date()) {
            throw new HttpException('OTP expired', HttpStatus.UNAUTHORIZED);
        }

        try {
            await this.usersService.update(user.id, { otp: null, expireAt: new Date(), verified: true });

            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    async resendOtp({phone}:ResendOtpDto): Promise<User> {
        const user = await this.usersService.findOneByPhoneNumber(phone);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if(user.verified){
            throw new HttpException('User is already verified', HttpStatus.BAD_REQUEST)
        }

        try {
            await this.usersService.update(user.id, { expireAt: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)), otp: Math.floor(100000 + Math.random() * 900000) });
            let resp = await this.smsService.sendSMS(user.phone, 'Your verification code is: ' + await this.usersService.getOtp(user.id));

            console.log(new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));

        }
        catch (err) {
            throw new HttpException('Error sending OTP', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async requestPasswordReset({phone}:ResendOtpDto): Promise<User> {
        const user = await this.usersService.findOneByPhoneNumber(phone);
        if (!user) {

            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

        }

        try {
            await this.usersService.update(user.id, { forgetPasswordExpireAt: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)), forgetPasswordOtp: Math.floor(100000 + Math.random() * 900000) });
            let resp = await this.smsService.sendSMS(user.phone, 'Your password reset code is: ' + await this.usersService.getPasswordResetCode(user.id));
        }
        catch (err) {
            throw new HttpException('Error sending OTP', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async resetPassword({otp, password, confirmPassword, phone}:ResetPasswordDto): Promise<User> {
        const user = await this.usersService.findOneByPhoneNumber(phone);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if (user.forgetPasswordOtp != otp) {
            throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
        }

        if (user.forgetPasswordExpireAt < new Date()) {
            throw new HttpException('OTP expired', HttpStatus.UNAUTHORIZED);
        }

        if (password != confirmPassword) {
            throw new HttpException('Passwords do not match', HttpStatus.UNAUTHORIZED);
        }

        this.usersService.update(user.id, { password: await bcrypt.hash(password, 10), forgetPasswordExpireAt: null, forgetPasswordOtp: null });

        return user;
    }

    async changePassword({oldPassword, newPassword}:UpdatePasswordDto, user:User): Promise<User> {
        const userObj = await this.usersService.findOneByPhoneNumber(user.phone);

        console.log(userObj);
        

        if (!userObj) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if (!await bcrypt.compare(oldPassword, user.password)) {
            throw new HttpException('Old password is incorrect', HttpStatus.UNAUTHORIZED);
        }

        this.usersService.update(user.id, { password: await bcrypt.hash(newPassword, 10)  });

        return userObj;
    }
}
