// https://pokeapi.co/api/v2/location-area?limit=20&offset=0
import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseUrl = "https://pokeapi.co/api/v2";
    cache;
    constructor() {
        this.cache = new Cache(60000); // Cache entries expire after 60 seconds
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseUrl}/location-area`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        const data = await response.json();
        const result = { name: data.results.map((location) => location.name) };
        this.cache.add(url, result);
        return result;
        ;
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseUrl}/location-area/${locationName}`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }
}
