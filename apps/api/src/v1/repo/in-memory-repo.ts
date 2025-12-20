export class InMemoryRepo<T extends { id: string }> {
  private items: T[];

  constructor(seed: T[]) {
    this.items = [...seed];
  }

  list(): T[] {
    return this.items;
  }

  get(id: string): T | undefined {
    return this.items.find((x) => x.id === id);
  }

  create(item: Omit<T, 'id'> & { id?: string }): T {
    const created = {
      ...item,
      id: item.id ?? crypto.randomUUID(),
    } as T;
    this.items.push(created);
    return created;
  }

  update(id: string, patch: Partial<Omit<T, 'id'>>): T | undefined {
    const idx = this.items.findIndex((x) => x.id === id);
    if (idx < 0) return undefined;

    const updated = {
      ...this.items[idx],
      ...patch,
      id,
    } as T;

    this.items[idx] = updated;
    return updated;
  }

  delete(id: string): boolean {
    const before = this.items.length;
    this.items = this.items.filter((x) => x.id !== id);
    return this.items.length !== before;
  }
}
