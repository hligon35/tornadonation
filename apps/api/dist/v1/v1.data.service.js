"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1DataService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_repo_1 = require("./repo/in-memory-repo");
let V1DataService = class V1DataService {
    sports = new in_memory_repo_1.InMemoryRepo([
        { id: 'football', name: 'Football', slug: 'football' },
        { id: 'basketball', name: 'Basketball', slug: 'basketball' },
        { id: 'baseball', name: 'Baseball', slug: 'baseball' },
    ]);
    seasons = new in_memory_repo_1.InMemoryRepo([
        { id: 'football-2025', sportId: 'football', year: 2025, label: '2025' },
        { id: 'basketball-2025', sportId: 'basketball', year: 2025, label: '2025' },
    ]);
    teams = new in_memory_repo_1.InMemoryRepo([
        {
            id: 'football-2025-varsity',
            sportId: 'football',
            seasonId: 'football-2025',
            level: 'Varsity',
            name: 'Tornado Nation Varsity Football',
        },
    ]);
    athletes = new in_memory_repo_1.InMemoryRepo([
        {
            id: 'athlete-1',
            firstName: 'Jordan',
            lastName: 'Taylor',
            displayName: 'Jordan Taylor',
            sportIds: ['football'],
            seasonIds: ['football-2025'],
            guardianApproved: false,
        },
    ]);
    events = new in_memory_repo_1.InMemoryRepo([
        {
            id: 'event-1',
            title: 'Tornado Nation Game',
            sportId: 'football',
            seasonId: 'football-2025',
            level: 'Varsity',
            startTimeIso: new Date().toISOString(),
            locationName: 'Home Field',
            status: 'Scheduled',
        },
    ]);
    sponsors = new in_memory_repo_1.InMemoryRepo([
        {
            id: 'sponsor-1',
            name: 'Sponsor (Placeholder)',
            tier: 'Ribbon',
            promoCode: 'TORNADO10',
        },
    ]);
    products = new in_memory_repo_1.InMemoryRepo([
        {
            id: 'tee',
            title: 'Tornado Tee',
            description: 'Official apparel (placeholder)',
            priceCents: 2500,
            currency: 'USD',
            sku: 'TEE-001',
            inStock: true,
        },
    ]);
    ordersDonations = new in_memory_repo_1.InMemoryRepo([
        {
            id: 'od-1',
            kind: 'Donation',
            createdAtIso: new Date().toISOString(),
            amountCents: 1000,
            currency: 'USD',
            status: 'Paid',
        },
    ]);
};
exports.V1DataService = V1DataService;
exports.V1DataService = V1DataService = __decorate([
    (0, common_1.Injectable)()
], V1DataService);
//# sourceMappingURL=v1.data.service.js.map