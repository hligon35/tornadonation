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
exports.SeasonsController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const auth_guard_1 = require("../../auth/auth.guard");
const roles_1 = require("../../auth/roles");
const roles_guard_1 = require("../../auth/roles.guard");
const audit_service_1 = require("../../audit/audit.service");
const v1_data_service_1 = require("../v1.data.service");
class CreateSeasonDto {
    sportId;
    year;
    label;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSeasonDto.prototype, "sportId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], CreateSeasonDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSeasonDto.prototype, "label", void 0);
class UpdateSeasonDto {
    year;
    label;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], UpdateSeasonDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSeasonDto.prototype, "label", void 0);
let SeasonsController = class SeasonsController {
    data;
    audit;
    constructor(data, audit) {
        this.data = data;
        this.audit = audit;
    }
    list() {
        return this.data.seasons.list();
    }
    get(id) {
        return this.data.seasons.get(id);
    }
    create(dto) {
        const created = this.data.seasons.create({
            sportId: dto.sportId,
            year: dto.year,
            label: dto.label ?? String(dto.year),
        });
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'create',
            entity: 'Season',
            entityId: created.id,
        });
        return created;
    }
    update(id, dto) {
        const updated = this.data.seasons.update(id, dto);
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'update',
            entity: 'Season',
            entityId: id,
        });
        return updated;
    }
    delete(id) {
        const ok = this.data.seasons.delete(id);
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'delete',
            entity: 'Season',
            entityId: id,
        });
        return { ok };
    }
};
exports.SeasonsController = SeasonsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeasonsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SeasonsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSeasonDto]),
    __metadata("design:returntype", void 0)
], SeasonsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSeasonDto]),
    __metadata("design:returntype", void 0)
], SeasonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SeasonsController.prototype, "delete", null);
exports.SeasonsController = SeasonsController = __decorate([
    (0, common_1.Controller)('/v1/seasons'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService,
        audit_service_1.AuditService])
], SeasonsController);
//# sourceMappingURL=seasons.controller.js.map