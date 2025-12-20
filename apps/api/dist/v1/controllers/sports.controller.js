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
exports.SportsController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const auth_guard_1 = require("../../auth/auth.guard");
const roles_1 = require("../../auth/roles");
const roles_guard_1 = require("../../auth/roles.guard");
const audit_service_1 = require("../../audit/audit.service");
const v1_data_service_1 = require("../v1.data.service");
class CreateSportDto {
    name;
    slug;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSportDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSportDto.prototype, "slug", void 0);
class UpdateSportDto {
    name;
    slug;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSportDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSportDto.prototype, "slug", void 0);
let SportsController = class SportsController {
    data;
    audit;
    constructor(data, audit) {
        this.data = data;
        this.audit = audit;
    }
    list() {
        return this.data.sports.list();
    }
    get(id) {
        return this.data.sports.get(id);
    }
    create(dto) {
        const created = this.data.sports.create({
            id: dto.slug,
            name: dto.name,
            slug: dto.slug,
        });
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'create',
            entity: 'Sport',
            entityId: created.id,
        });
        return created;
    }
    update(id, dto) {
        const updated = this.data.sports.update(id, dto);
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'update',
            entity: 'Sport',
            entityId: id,
        });
        return updated;
    }
    delete(id) {
        const ok = this.data.sports.delete(id);
        this.audit.record({
            actorRole: 'AthleticStaff',
            action: 'delete',
            entity: 'Sport',
            entityId: id,
        });
        return { ok };
    }
};
exports.SportsController = SportsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SportsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SportsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSportDto]),
    __metadata("design:returntype", void 0)
], SportsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSportDto]),
    __metadata("design:returntype", void 0)
], SportsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_1.Roles)('AthleticStaff', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SportsController.prototype, "delete", null);
exports.SportsController = SportsController = __decorate([
    (0, common_1.Controller)('/v1/sports'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [v1_data_service_1.V1DataService,
        audit_service_1.AuditService])
], SportsController);
//# sourceMappingURL=sports.controller.js.map