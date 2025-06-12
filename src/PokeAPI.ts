// https://pokeapi.co/api/v2/location-area?limit=20&offset=0

export class PokeAPI {
    private static readonly baseUrl = "https://pokeapi.co/api/v2";
    constructor() {
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations>{
        const url = pageURL ?? `${PokeAPI.baseUrl}/location-area`;
        const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.statusText}`);
          }
        const data = await response.json();

        return {name: data.results.map((location: { name: string }) => location.name)};
    }

    async fetchLocation(locationName: string) {
        const url = `${PokeAPI.baseUrl}/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        return response.json();        
    }
}
export type ShallowLocations = {
    name: string[];
}

export type Location = { 
    name: string;
}