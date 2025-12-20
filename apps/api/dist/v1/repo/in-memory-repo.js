"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepo = void 0;
class InMemoryRepo {
    items;
    constructor(seed) {
        this.items = [...seed];
    }
    list() {
        return this.items;
    }
    get(id) {
        return this.items.find((x) => x.id === id);
    }
    create(item) {
        const created = {
            ...item,
            id: item.id ?? crypto.randomUUID(),
        };
        this.items.push(created);
        return created;
    }
    update(id, patch) {
        const idx = this.items.findIndex((x) => x.id === id);
        if (idx < 0)
            return undefined;
        const updated = {
            ...this.items[idx],
            ...patch,
            id,
        };
        this.items[idx] = updated;
        return updated;
    }
    delete(id) {
        const before = this.items.length;
        this.items = this.items.filter((x) => x.id !== id);
        return this.items.length !== before;
    }
}
exports.InMemoryRepo = InMemoryRepo;
//# sourceMappingURL=in-memory-repo.js.map