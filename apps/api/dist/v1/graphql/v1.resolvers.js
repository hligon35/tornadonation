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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersDonationsResolver = exports.ProductsResolver = exports.SponsorsResolver = exports.EventsResolver = exports.AthletesResolver = exports.TeamsResolver = exports.SeasonsResolver = exports.SportsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const v1_data_service_1 = require("../v1.data.service");
const types_1 = require("./types");
let SportsResolver = class SportsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    sports() {
        return this.data.sports.list();
    }
    sport(id) {
        return this.data.sports.get(id);
    }
    createSport(input) {
        return this.data.sports.create({ id: input.slug, ...input });
    }
    updateSport(id, input) {
        return this.data.sports.update(id, input);
    }
    deleteSport(id) {
        return this.data.sports.delete(id);
    }
};
exports.SportsResolver = SportsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.SportGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SportsResolver.prototype, "sports", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.SportGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SportsResolver.prototype, "sport", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.SportGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.SportInput]),
    __metadata("design:returntype", void 0)
], SportsResolver.prototype, "createSport", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.SportGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.SportInput]),
    __metadata("design:returntype", void 0)
], SportsResolver.prototype, "updateSport", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SportsResolver.prototype, "deleteSport", null);
exports.SportsResolver = SportsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.SportGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], SportsResolver);
let SeasonsResolver = class SeasonsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    seasons() {
        return this.data.seasons.list();
    }
    season(id) {
        return this.data.seasons.get(id);
    }
    createSeason(input) {
        return this.data.seasons.create({
            sportId: input.sportId,
            year: input.year,
            label: input.label ?? String(input.year),
        });
    }
    updateSeason(id, label) {
        return this.data.seasons.update(id, label ? { label } : {});
    }
    deleteSeason(id) {
        return this.data.seasons.delete(id);
    }
};
exports.SeasonsResolver = SeasonsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.SeasonGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeasonsResolver.prototype, "seasons", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.SeasonGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SeasonsResolver.prototype, "season", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.SeasonGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.SeasonInput]),
    __metadata("design:returntype", void 0)
], SeasonsResolver.prototype, "createSeason", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.SeasonGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('label', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SeasonsResolver.prototype, "updateSeason", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SeasonsResolver.prototype, "deleteSeason", null);
exports.SeasonsResolver = SeasonsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.SeasonGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], SeasonsResolver);
let TeamsResolver = class TeamsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    teams() {
        return this.data.teams.list();
    }
    team(id) {
        return this.data.teams.get(id);
    }
    createTeam(input) {
        return this.data.teams.create(input);
    }
    updateTeam(id, name) {
        return this.data.teams.update(id, { name });
    }
    deleteTeam(id) {
        return this.data.teams.delete(id);
    }
};
exports.TeamsResolver = TeamsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.TeamGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeamsResolver.prototype, "teams", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.TeamGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamsResolver.prototype, "team", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.TeamGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.TeamInput]),
    __metadata("design:returntype", void 0)
], TeamsResolver.prototype, "createTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.TeamGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('name', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeamsResolver.prototype, "updateTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamsResolver.prototype, "deleteTeam", null);
exports.TeamsResolver = TeamsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.TeamGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], TeamsResolver);
let AthletesResolver = class AthletesResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    athletes() {
        return this.data.athletes.list();
    }
    athlete(id) {
        return this.data.athletes.get(id);
    }
    createAthlete(input) {
        return this.data.athletes.create({
            guardianApproved: false,
            ...input,
        });
    }
    updateAthlete(id, guardianApproved) {
        return this.data.athletes.update(id, typeof guardianApproved === 'boolean' ? { guardianApproved } : {});
    }
    deleteAthlete(id) {
        return this.data.athletes.delete(id);
    }
};
exports.AthletesResolver = AthletesResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.AthleteGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AthletesResolver.prototype, "athletes", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.AthleteGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AthletesResolver.prototype, "athlete", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.AthleteGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.AthleteInput]),
    __metadata("design:returntype", void 0)
], AthletesResolver.prototype, "createAthlete", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.AthleteGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('guardianApproved', { type: () => Boolean, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], AthletesResolver.prototype, "updateAthlete", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AthletesResolver.prototype, "deleteAthlete", null);
exports.AthletesResolver = AthletesResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.AthleteGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], AthletesResolver);
let EventsResolver = class EventsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    events() {
        return this.data.events.list();
    }
    event(id) {
        return this.data.events.get(id);
    }
    createEvent(input) {
        return this.data.events.create({
            ...input,
            status: 'Scheduled',
        });
    }
    updateEvent(id, title) {
        return this.data.events.update(id, title ? { title } : {});
    }
    deleteEvent(id) {
        return this.data.events.delete(id);
    }
};
exports.EventsResolver = EventsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.GameEventGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "events", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.GameEventGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "event", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.GameEventGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.GameEventInput]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.GameEventGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('title', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "updateEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "deleteEvent", null);
exports.EventsResolver = EventsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.GameEventGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], EventsResolver);
let SponsorsResolver = class SponsorsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    sponsors() {
        return this.data.sponsors.list();
    }
    sponsor(id) {
        return this.data.sponsors.get(id);
    }
    createSponsor(input) {
        return this.data.sponsors.create(input);
    }
    updateSponsor(id, input) {
        return this.data.sponsors.update(id, input);
    }
    deleteSponsor(id) {
        return this.data.sponsors.delete(id);
    }
};
exports.SponsorsResolver = SponsorsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.SponsorGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SponsorsResolver.prototype, "sponsors", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.SponsorGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SponsorsResolver.prototype, "sponsor", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.SponsorGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.SponsorInput]),
    __metadata("design:returntype", void 0)
], SponsorsResolver.prototype, "createSponsor", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.SponsorGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.SponsorInput]),
    __metadata("design:returntype", void 0)
], SponsorsResolver.prototype, "updateSponsor", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SponsorsResolver.prototype, "deleteSponsor", null);
exports.SponsorsResolver = SponsorsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.SponsorGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], SponsorsResolver);
let ProductsResolver = class ProductsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    products() {
        return this.data.products.list();
    }
    product(id) {
        return this.data.products.get(id);
    }
    createProduct(input) {
        return this.data.products.create({
            ...input,
            currency: input.currency ?? 'USD',
            inStock: input.inStock ?? true,
        });
    }
    updateProduct(id, input) {
        return this.data.products.update(id, input);
    }
    deleteProduct(id) {
        return this.data.products.delete(id);
    }
};
exports.ProductsResolver = ProductsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.ProductGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "products", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.ProductGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "product", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.ProductGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.ProductInput]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.ProductGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.ProductInput]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "deleteProduct", null);
exports.ProductsResolver = ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.ProductGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], ProductsResolver);
let OrdersDonationsResolver = class OrdersDonationsResolver {
    data;
    constructor(data) {
        this.data = data;
    }
    ordersDonations() {
        return this.data.ordersDonations.list();
    }
    orderDonation(id) {
        return this.data.ordersDonations.get(id);
    }
    createOrderDonation(input) {
        return this.data.ordersDonations.create({
            kind: input.kind,
            createdAtIso: new Date().toISOString(),
            amountCents: input.amountCents,
            currency: input.currency ?? 'USD',
            status: 'Pending',
        });
    }
    deleteOrderDonation(id) {
        return this.data.ordersDonations.delete(id);
    }
};
exports.OrdersDonationsResolver = OrdersDonationsResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.OrderDonationGql]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersDonationsResolver.prototype, "ordersDonations", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.OrderDonationGql, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersDonationsResolver.prototype, "orderDonation", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.OrderDonationGql),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.OrderDonationInput]),
    __metadata("design:returntype", void 0)
], OrdersDonationsResolver.prototype, "createOrderDonation", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersDonationsResolver.prototype, "deleteOrderDonation", null);
exports.OrdersDonationsResolver = OrdersDonationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => types_1.OrderDonationGql),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService])
], OrdersDonationsResolver);
//# sourceMappingURL=v1.resolvers.js.map