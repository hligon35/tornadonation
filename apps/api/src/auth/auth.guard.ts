import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Role } from '@tornado-nation/shared';

export type RequestUser = {
  role: Role;
};

// Placeholder auth: expects Authorization: Bearer role:<Role>
// Example: Bearer role:Admin
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header = String(req.headers?.authorization ?? '');

    let role: Role = 'Student';
    const match = header.match(/^Bearer\s+role:(.+)$/i);
    if (match?.[1]) {
      const candidate = match[1].trim() as Role;
      role = candidate;
    }

    req.user = { role } satisfies RequestUser;
    return true;
  }
}
