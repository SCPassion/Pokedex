// https://pokeapi.co/api/v2/location-area?limit=20&offset=0
import { Cache } from "./pokecache.js";
export class PokeAPI {
    private static readonly baseUrl = "https://pokeapi.co/api/v2";
    cache: Cache;
    constructor() {
        this.cache = new Cache(60000); // Cache entries expire after 60 seconds
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations>{
        const url = pageURL ?? `${PokeAPI.baseUrl}/location-area`;

        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {
            return cached;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        const data = await response.json();
        const result = {name: data.results.map((location: { name: string }) => location.name)};

        this.cache.add(url, result);
        return result;
;
    }

    async fetchLocation(locationName: string) {
        const url = `${PokeAPI.baseUrl}/location-area/${locationName}`;
        const cached = this.cache.get<Location>(url);
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
export type ShallowLocations = {
    name: string[];
}

export type Location = { 
    name: string;
}