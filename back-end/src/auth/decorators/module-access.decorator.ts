import { SetMetadata } from '@nestjs/common';

export const MODULE_ACCESS_KEY = 'allowedModules';
export const ModuleAccess = (...modules: string[]) => SetMetadata(MODULE_ACCESS_KEY, modules);
