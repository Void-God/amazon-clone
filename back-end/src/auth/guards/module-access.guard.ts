import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class ModuleAccessGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;


    if (!user || !user.mail) {
      throw new UnauthorizedException('Invalid user or missing details in token');
    }

    const {role, id} = await this.authService.getDetails(user.mail)
    request.user.id = id;

  
    const requiredModules = this.reflector.get<string[]>('allowedModules', context.getHandler());

    if (!requiredModules) {
      return true; // No module restriction, allow access
    }

    const hasAccess = requiredModules.includes(role);

    if (!hasAccess) {
      throw new UnauthorizedException('Access denied: User module not allowed');
    }

    return true;
  }
}
