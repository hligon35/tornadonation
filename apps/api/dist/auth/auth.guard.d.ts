import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Role } from '@tornado-nation/shared';
export type RequestUser = {
    role: Role;
};
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
