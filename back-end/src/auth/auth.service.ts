import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { ChangedPasswordBodyDto, RegisterBodyDto, Roles, ValidateOtpBodyDto } from './authdto';
import * as bcrypt from 'bcrypt';
import { ForgotPassword } from './forgot-password.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(ForgotPassword)
    private readonly forgotPassRepository: Repository<ForgotPassword>
  ) { }

  async login(email: string, password: string) {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { mail: user.email };
    return {
      token: this.jwtService.sign(payload),
      email: user.email,
      phoneNumber: user.phoneNumber,
      imagePath: user.imageRelativePath,
      imageName: user.imageLocalName,
      role: user.role
    };
  }


  async register(user: RegisterBodyDto, role?: Roles) {

    const existing = await this.authRepository.findOne({ where: { email: user.email } });

    if (existing)
      throw new BadRequestException("User Already Exist!")

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = this.authRepository.create(
      {
        ...user,
        role: role || 'buyer',
        isDeleted: 0
      }
    )

    return await this.authRepository.save(newUser);
  }


  async getDetails(email: string) {
    const user = await this.authRepository.findOne({ where: { email } });

    if (user) return user;

    return {} as Auth;
  }



  async getBusinessesList(page: number, limit) {

    const skip = page * limit;


    const businesses = await this.authRepository.find({
      where: { role: 'business' },
      skip: skip,
      take: limit,
    });

    const totalBusinesses = await this.authRepository.count({
      where: { role: 'business' },  // Ensure we count only businesses
    });

    const businessesWithoutSensitiveData = businesses.map(business => {
      const { password, isDeleted, ...businessWithoutSensitiveData } = business;
      return businessWithoutSensitiveData;
    });

    return {
      total: totalBusinesses,
      businesses: businessesWithoutSensitiveData,
    };

  }



  async deleteBusiness(id) {
    return await this.authRepository.delete(id);
  }


  async getProfile(email) {
    const user = await this.authRepository.findOne({ where: { email } });
    return {
      email: user.email,
      phoneNumber: user.phoneNumber,
      imagePath: user.imageRelativePath,
      imageName: user.imageLocalName,
      role: user.role
    };
  }



  async sendOtp(mail) {
    const { id } = await this.getDetails(mail);

    if (!id) throw new NotFoundException("User not found!");

    const salt = await bcrypt.genSalt(10);
    const otp = await bcrypt.hash('1234', salt);

    let newUser = await this.forgotPassRepository.findOne({
      where: { userId: id }
    });

    const otpExpiryTime = new Date();
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5); // Add 5 minutes

    if (!newUser) {
      newUser = this.forgotPassRepository.create({
        userId: id,
        otp: otp,
        otpExpires: otpExpiryTime.toUTCString()
      });
    } else {
      newUser.otp = otp;
      newUser.otpExpires = otpExpiryTime.toUTCString();
    }

    return await this.forgotPassRepository.save(newUser);
  }


  async validateOtp(body: ValidateOtpBodyDto) {
    const { id } = await this.getDetails(body.email);

    if (!id) throw new NotFoundException("Email not found!");

    const changeReq = await this.forgotPassRepository.findOne({ where: { userId: id } });

    if (!changeReq) throw new NotFoundException("Request not found!");


    const isOtpValid = await bcrypt.compare(body.otp, changeReq.otp);

    if (!isOtpValid) {
      throw new BadRequestException("Invalid OTP!");
    }

    const otpExpiryTime = new Date(changeReq.otpExpires);
    const currentTime = new Date();

    if (currentTime > otpExpiryTime) {
      throw new BadRequestException("OTP expired!");
    }

    const token = this.jwtService.sign({ email: body.email }, { expiresIn: '5m' })


    changeReq.token = token;


    await this.forgotPassRepository.save(changeReq);

    return token;
  }


  async changePassword(req: ChangedPasswordBodyDto) {

    const { token, password, confirmPassword } = req

    if (password != confirmPassword) {
      throw new BadRequestException("confirm password and password do not match!")
    }

    try {
      const { email } = this.jwtService.verify(token); // Verifies and decodes token
      const user = await this.getDetails(email);

      if (!user.id)
        throw new Error();


      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      return await this.authRepository.save(user);

    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token!");
    }
  }




}
