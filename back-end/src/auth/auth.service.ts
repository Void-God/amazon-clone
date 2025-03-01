import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { RegisterBodyDto, Roles } from './authdto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>
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
      imageName: user.imageLocalName
    };
  }


  async register(user: RegisterBodyDto, role?: Roles) {
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


  async getRole(email: string) {
    const user = await this.authRepository.findOne({ where: { email } });

    if (user) return user.role;

    return;
  }

}
