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
exports.AthletesController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const auth_guard_1 = require("../../auth/auth.guard");
const roles_1 = require("../../auth/roles");
const roles_guard_1 = require("../../auth/roles.guard");
const audit_service_1 = require("../../audit/audit.service");
const v1_data_service_1 = require("../v1.data.service");
class CreateAthleteDto {
    firstName;
    lastName;
    displayName;
    sportIds;
    seasonIds;
    guardianApproved;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAthleteDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAthleteDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAthleteDto.prototype, "displayName", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAthleteDto.prototype, "sportIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAthleteDto.prototype, "seasonIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAthleteDto.prototype, "guardianApproved", void 0);
class UpdateAthleteDto {
    displayName;
    guardianApproved;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAthleteDto.prototype, "displayName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAthleteDto.prototype, "guardianApproved", void 0);
let AthletesController = class AthletesController {
    data;
    audit;
    constructor(data, audit) {
        this.data = data;
        this.audit = audit;
    }
    list() {
        return this.data.athletes.list();
    }
    get(id) {
        return this.data.athletes.get(id);
    }
    create(dto) {
        const created = this.data.athletes.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            displayName: dto.displayName,
            sportIds: dto.sportIds,
            seasonIds: dto.seasonIds,
            guardianApproved: dto.guardianApproved ?? false,
        });
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'create',
            entity: 'Athlete',
            entityId: created.id,
        });
        return created;
    }
    update(id, dto) {
        const updated = this.data.athletes.update(id, dto);
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'update',
            entity: 'Athlete',
            entityId: id,
        });
        return updated;
    }
    delete(id) {
        const ok = this.data.athletes.delete(id);
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'delete',
            entity: 'Athlete',
            entityId: id,
        });
        return { ok };
    }
};
exports.AthletesController = AthletesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AthletesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AthletesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAthleteDto]),
    __metadata("design:returntype", void 0)
], AthletesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateAthleteDto]),
    __metadata("design:returntype", void 0)
], AthletesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AthletesController.prototype, "delete", null);
exports.AthletesController = AthletesController = __decorate([
    (0, common_1.Controller)('/v1/athletes'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService,
        audit_service_1.AuditService])
], AthletesController);
//# sourceMappingURL=athletes.controller.js.map