import { SortedItemRepository, IItem } from "item-store-redis";
import Redis from "ioredis";

const redis = new Redis({ host: "localhost", port: 6379, maxRetriesPerRequest: 3 });
redis.on('connect', () => console.log('Redis Client Connected'));
redis.on('error', (err) => console.error(`Redis Client Error: ${err.message}`));

export class RecordCollector<T>{
    private _repository: SortedItemRepository<T>;

    constructor(name: string) {
        this._repository = new SortedItemRepository(name, redis);
    }

    async write(key: string, record: T) {
        const item: IItem<T> = { id: key, data: record };
        await this._repository.set(item);
    }

    async getPaginatedData(page: number, pageSize: number) {
        const items = await this._repository.getPaginated(page, pageSize);
        return items.items.map(it => it.data);
    }

    async getAllData() {
        const items = await this._repository.getAll();
        return items.map(it => it.data);
    }
    async getByKey(id: string) {
        const item = await this._repository.getById(id);
        return item?.data;
    }

    async getLength() {
        const count = await this._repository.count();
        return count;
    }

    async clear() {
        await this._repository.deleteAll();
    }

    end() {
        console.log('Redis Client Disconnected');
        this._repository.redis.disconnect();
    }
}