import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ModuleAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.modules) {
      throw new UnauthorizedException('Invalid user or missing modules in token');
    }

    const requiredModules = this.reflector.get<string[]>('allowedModules', context.getHandler());

    if (!requiredModules) {
      return true; // No module restriction, allow access
    }

    const hasAccess = requiredModules.some(module => user.modules.includes(module));

    if (!hasAccess) {
      throw new UnauthorizedException('Access denied: User module not allowed');
    }

    return true;
  }
}
