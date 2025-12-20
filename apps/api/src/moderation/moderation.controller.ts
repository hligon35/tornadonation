import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles';
import { RolesGuard } from '../auth/roles.guard';

@Controller('/v1/moderation')
@UseGuards(AuthGuard, RolesGuard)
export class ModerationController {
  @Get('queue')
  @Roles('Moderator', 'Admin')
  queue() {
    return [];
  }
}
