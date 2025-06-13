type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, value: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: value
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry) {
            return entry.val as T;
        } else return undefined;
    }

    #reap() {
        const now = Date.now();

        if (this.#cache.size === 0) return;

        for(const [key, entry] of this.#cache.entries()) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    public stopReapLoop() {
        if(this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}