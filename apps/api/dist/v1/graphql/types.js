"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDonationInput = exports.OrderDonationGql = exports.ProductInput = exports.ProductGql = exports.SponsorInput = exports.SponsorGql = exports.GameEventInput = exports.GameEventGql = exports.AthleteInput = exports.AthleteGql = exports.TeamInput = exports.TeamGql = exports.SeasonInput = exports.SeasonGql = exports.SportInput = exports.SportGql = exports.OrderDonationStatus = exports.OrderDonationKind = exports.SponsorTier = exports.EventStatus = exports.TeamLevel = void 0;
const graphql_1 = require("@nestjs/graphql");
var TeamLevel;
(function (TeamLevel) {
    TeamLevel["Varsity"] = "Varsity";
    TeamLevel["JV"] = "JV";
})(TeamLevel || (exports.TeamLevel = TeamLevel = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus["Scheduled"] = "Scheduled";
    EventStatus["Live"] = "Live";
    EventStatus["Final"] = "Final";
    EventStatus["Canceled"] = "Canceled";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var SponsorTier;
(function (SponsorTier) {
    SponsorTier["Hero"] = "Hero";
    SponsorTier["Ribbon"] = "Ribbon";
    SponsorTier["Takeover"] = "Takeover";
    SponsorTier["Bumper"] = "Bumper";
})(SponsorTier || (exports.SponsorTier = SponsorTier = {}));
var OrderDonationKind;
(function (OrderDonationKind) {
    OrderDonationKind["Order"] = "Order";
    OrderDonationKind["Donation"] = "Donation";
})(OrderDonationKind || (exports.OrderDonationKind = OrderDonationKind = {}));
var OrderDonationStatus;
(function (OrderDonationStatus) {
    OrderDonationStatus["Pending"] = "Pending";
    OrderDonationStatus["Paid"] = "Paid";
    OrderDonationStatus["Refunded"] = "Refunded";
    OrderDonationStatus["Canceled"] = "Canceled";
})(OrderDonationStatus || (exports.OrderDonationStatus = OrderDonationStatus = {}));
(0, graphql_1.registerEnumType)(TeamLevel, { name: 'TeamLevel' });
(0, graphql_1.registerEnumType)(EventStatus, { name: 'EventStatus' });
(0, graphql_1.registerEnumType)(SponsorTier, { name: 'SponsorTier' });
(0, graphql_1.registerEnumType)(OrderDonationKind, { name: 'OrderDonationKind' });
(0, graphql_1.registerEnumType)(OrderDonationStatus, { name: 'OrderDonationStatus' });
let SportGql = class SportGql {
    id;
    name;
    slug;
};
exports.SportGql = SportGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SportGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SportGql.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SportGql.prototype, "slug", void 0);
exports.SportGql = SportGql = __decorate([
    (0, graphql_1.ObjectType)()
], SportGql);
let SportInput = class SportInput {
    name;
    slug;
};
exports.SportInput = SportInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SportInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SportInput.prototype, "slug", void 0);
exports.SportInput = SportInput = __decorate([
    (0, graphql_1.InputType)()
], SportInput);
let SeasonGql = class SeasonGql {
    id;
    sportId;
    year;
    label;
};
exports.SeasonGql = SeasonGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SeasonGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SeasonGql.prototype, "sportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], SeasonGql.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SeasonGql.prototype, "label", void 0);
exports.SeasonGql = SeasonGql = __decorate([
    (0, graphql_1.ObjectType)()
], SeasonGql);
let SeasonInput = class SeasonInput {
    sportId;
    year;
    label;
};
exports.SeasonInput = SeasonInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SeasonInput.prototype, "sportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], SeasonInput.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SeasonInput.prototype, "label", void 0);
exports.SeasonInput = SeasonInput = __decorate([
    (0, graphql_1.InputType)()
], SeasonInput);
let TeamGql = class TeamGql {
    id;
    sportId;
    seasonId;
    level;
    name;
};
exports.TeamGql = TeamGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TeamGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TeamGql.prototype, "sportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TeamGql.prototype, "seasonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => TeamLevel),
    __metadata("design:type", String)
], TeamGql.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TeamGql.prototype, "name", void 0);
exports.TeamGql = TeamGql = __decorate([
    (0, graphql_1.ObjectType)()
], TeamGql);
let TeamInput = class TeamInput {
    sportId;
    seasonId;
    level;
    name;
};
exports.TeamInput = TeamInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TeamInput.prototype, "sportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TeamInput.prototype, "seasonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => TeamLevel),
    __metadata("design:type", String)
], TeamInput.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TeamInput.prototype, "name", void 0);
exports.TeamInput = TeamInput = __decorate([
    (0, graphql_1.InputType)()
], TeamInput);
let AthleteGql = class AthleteGql {
    id;
    firstName;
    lastName;
    displayName;
    sportIds;
    seasonIds;
    jerseyNumber;
    position;
    gradYear;
    guardianApproved;
};
exports.AthleteGql = AthleteGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], AthleteGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AthleteGql.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AthleteGql.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AthleteGql.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.ID]),
    __metadata("design:type", Array)
], AthleteGql.prototype, "sportIds", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.ID]),
    __metadata("design:type", Array)
], AthleteGql.prototype, "seasonIds", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AthleteGql.prototype, "jerseyNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AthleteGql.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AthleteGql.prototype, "gradYear", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AthleteGql.prototype, "guardianApproved", void 0);
exports.AthleteGql = AthleteGql = __decorate([
    (0, graphql_1.ObjectType)()
], AthleteGql);
let AthleteInput = class AthleteInput {
    firstName;
    lastName;
    displayName;
    sportIds;
    seasonIds;
    jerseyNumber;
    position;
    gradYear;
    guardianApproved;
};
exports.AthleteInput = AthleteInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AthleteInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AthleteInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AthleteInput.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.ID]),
    __metadata("design:type", Array)
], AthleteInput.prototype, "sportIds", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.ID]),
    __metadata("design:type", Array)
], AthleteInput.prototype, "seasonIds", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AthleteInput.prototype, "jerseyNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AthleteInput.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AthleteInput.prototype, "gradYear", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], AthleteInput.prototype, "guardianApproved", void 0);
exports.AthleteInput = AthleteInput = __decorate([
    (0, graphql_1.InputType)()
], AthleteInput);
let GameEventGql = class GameEventGql {
    id;
    title;
    sportId;
    seasonId;
    level;
    startTimeIso;
    locationName;
    address;
    homeTeamName;
    awayTeamName;
    status;
};
exports.GameEventGql = GameEventGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], GameEventGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GameEventGql.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], GameEventGql.prototype, "sportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], GameEventGql.prototype, "seasonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => TeamLevel, { nullable: true }),
    __metadata("design:type", String)
], GameEventGql.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GameEventGql.prototype, "startTimeIso", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventGql.prototype, "locationName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventGql.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventGql.prototype, "homeTeamName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventGql.prototype, "awayTeamName", void 0);
__decorate([
    (0, graphql_1.Field)(() => EventStatus),
    __metadata("design:type", String)
], GameEventGql.prototype, "status", void 0);
exports.GameEventGql = GameEventGql = __decorate([
    (0, graphql_1.ObjectType)()
], GameEventGql);
let GameEventInput = class GameEventInput {
    title;
    sportId;
    seasonId;
    level;
    startTimeIso;
    locationName;
    address;
    homeTeamName;
    awayTeamName;
};
exports.GameEventInput = GameEventInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GameEventInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], GameEventInput.prototype, "sportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], GameEventInput.prototype, "seasonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => TeamLevel, { nullable: true }),
    __metadata("design:type", String)
], GameEventInput.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GameEventInput.prototype, "startTimeIso", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventInput.prototype, "locationName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventInput.prototype, "homeTeamName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GameEventInput.prototype, "awayTeamName", void 0);
exports.GameEventInput = GameEventInput = __decorate([
    (0, graphql_1.InputType)()
], GameEventInput);
let SponsorGql = class SponsorGql {
    id;
    name;
    tier;
    websiteUrl;
    promoCode;
};
exports.SponsorGql = SponsorGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SponsorGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SponsorGql.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => SponsorTier, { nullable: true }),
    __metadata("design:type", String)
], SponsorGql.prototype, "tier", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SponsorGql.prototype, "websiteUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SponsorGql.prototype, "promoCode", void 0);
exports.SponsorGql = SponsorGql = __decorate([
    (0, graphql_1.ObjectType)()
], SponsorGql);
let SponsorInput = class SponsorInput {
    name;
    tier;
    websiteUrl;
    promoCode;
};
exports.SponsorInput = SponsorInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SponsorInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => SponsorTier, { nullable: true }),
    __metadata("design:type", String)
], SponsorInput.prototype, "tier", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SponsorInput.prototype, "websiteUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SponsorInput.prototype, "promoCode", void 0);
exports.SponsorInput = SponsorInput = __decorate([
    (0, graphql_1.InputType)()
], SponsorInput);
let ProductGql = class ProductGql {
    id;
    title;
    description;
    priceCents;
    currency;
    sku;
    inStock;
};
exports.ProductGql = ProductGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], ProductGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductGql.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductGql.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductGql.prototype, "priceCents", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductGql.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductGql.prototype, "sku", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ProductGql.prototype, "inStock", void 0);
exports.ProductGql = ProductGql = __decorate([
    (0, graphql_1.ObjectType)()
], ProductGql);
let ProductInput = class ProductInput {
    title;
    description;
    priceCents;
    currency;
    sku;
    inStock;
};
exports.ProductInput = ProductInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductInput.prototype, "priceCents", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductInput.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductInput.prototype, "sku", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ProductInput.prototype, "inStock", void 0);
exports.ProductInput = ProductInput = __decorate([
    (0, graphql_1.InputType)()
], ProductInput);
let OrderDonationGql = class OrderDonationGql {
    id;
    kind;
    createdAtIso;
    amountCents;
    currency;
    status;
};
exports.OrderDonationGql = OrderDonationGql;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], OrderDonationGql.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => OrderDonationKind),
    __metadata("design:type", String)
], OrderDonationGql.prototype, "kind", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OrderDonationGql.prototype, "createdAtIso", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], OrderDonationGql.prototype, "amountCents", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OrderDonationGql.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => OrderDonationStatus),
    __metadata("design:type", String)
], OrderDonationGql.prototype, "status", void 0);
exports.OrderDonationGql = OrderDonationGql = __decorate([
    (0, graphql_1.ObjectType)()
], OrderDonationGql);
let OrderDonationInput = class OrderDonationInput {
    kind;
    amountCents;
    currency;
};
exports.OrderDonationInput = OrderDonationInput;
__decorate([
    (0, graphql_1.Field)(() => OrderDonationKind),
    __metadata("design:type", String)
], OrderDonationInput.prototype, "kind", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], OrderDonationInput.prototype, "amountCents", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OrderDonationInput.prototype, "currency", void 0);
exports.OrderDonationInput = OrderDonationInput = __decorate([
    (0, graphql_1.InputType)()
], OrderDonationInput);
//# sourceMappingURL=types.js.map