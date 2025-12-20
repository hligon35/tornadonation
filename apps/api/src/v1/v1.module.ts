import { Module } from '@nestjs/common';

import { AuditController } from '../audit/audit.controller';
import { AuditService } from '../audit/audit.service';
import { ModerationController } from '../moderation/moderation.controller';
import { V1DataService } from './v1.data.service';
import { AthletesController } from './controllers/athletes.controller';
import { EventsController } from './controllers/events.controller';
import { OrdersDonationsController } from './controllers/orders-donations.controller';
import { ProductsController } from './controllers/products.controller';
import { SeasonsController } from './controllers/seasons.controller';
import { SponsorsController } from './controllers/sponsors.controller';
import { SportsController } from './controllers/sports.controller';
import { TeamsController } from './controllers/teams.controller';
import {
  AthletesResolver,
  EventsResolver,
  OrdersDonationsResolver,
  ProductsResolver,
  SeasonsResolver,
  SponsorsResolver,
  SportsResolver,
  TeamsResolver,
} from './graphql/v1.resolvers';

@Module({
  controllers: [
    SportsController,
    SeasonsController,
    TeamsController,
    AthletesController,
    EventsController,
    SponsorsController,
    ProductsController,
    OrdersDonationsController,
    AuditController,
    ModerationController,
  ],
  providers: [
    V1DataService,
    AuditService,
    SportsResolver,
    SeasonsResolver,
    TeamsResolver,
    AthletesResolver,
    EventsResolver,
    SponsorsResolver,
    ProductsResolver,
    OrdersDonationsResolver,
  ],
})
export class V1Module {}
