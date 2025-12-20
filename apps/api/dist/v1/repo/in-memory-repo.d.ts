export declare class InMemoryRepo<T extends {
    id: string;
}> {
    private items;
    constructor(seed: T[]);
    list(): T[];
    get(id: string): T | undefined;
    create(item: Omit<T, 'id'> & {
        id?: string;
    }): T;
    update(id: string, patch: Partial<Omit<T, 'id'>>): T | undefined;
    delete(id: string): boolean;
}
