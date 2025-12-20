"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Module = void 0;
const common_1 = require("@nestjs/common");
const audit_controller_1 = require("../audit/audit.controller");
const audit_service_1 = require("../audit/audit.service");
const moderation_controller_1 = require("../moderation/moderation.controller");
const v1_data_service_1 = require("./v1.data.service");
const athletes_controller_1 = require("./controllers/athletes.controller");
const events_controller_1 = require("./controllers/events.controller");
const orders_donations_controller_1 = require("./controllers/orders-donations.controller");
const products_controller_1 = require("./controllers/products.controller");
const seasons_controller_1 = require("./controllers/seasons.controller");
const sponsors_controller_1 = require("./controllers/sponsors.controller");
const sports_controller_1 = require("./controllers/sports.controller");
const teams_controller_1 = require("./controllers/teams.controller");
const v1_resolvers_1 = require("./graphql/v1.resolvers");
let V1Module = class V1Module {
};
exports.V1Module = V1Module;
exports.V1Module = V1Module = __decorate([
    (0, common_1.Module)({
        controllers: [
            sports_controller_1.SportsController,
            seasons_controller_1.SeasonsController,
            teams_controller_1.TeamsController,
            athletes_controller_1.AthletesController,
            events_controller_1.EventsController,
            sponsors_controller_1.SponsorsController,
            products_controller_1.ProductsController,
            orders_donations_controller_1.OrdersDonationsController,
            audit_controller_1.AuditController,
            moderation_controller_1.ModerationController,
        ],
        providers: [
            v1_data_service_1.V1DataService,
            audit_service_1.AuditService,
            v1_resolvers_1.SportsResolver,
            v1_resolvers_1.SeasonsResolver,
            v1_resolvers_1.TeamsResolver,
            v1_resolvers_1.AthletesResolver,
            v1_resolvers_1.EventsResolver,
            v1_resolvers_1.SponsorsResolver,
            v1_resolvers_1.ProductsResolver,
            v1_resolvers_1.OrdersDonationsResolver,
        ],
    })
], V1Module);
//# sourceMappingURL=v1.module.js.map