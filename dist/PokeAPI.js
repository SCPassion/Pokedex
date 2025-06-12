// https://pokeapi.co/api/v2/location-area?limit=20&offset=0
export class PokeAPI {
    static baseUrl = "https://pokeapi.co/api/v2";
    constructor() {
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseUrl}/location-area`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        const data = await response.json();
        return { name: data.results.map((location) => location.name) };
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseUrl}/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        return response.json();
    }
}
