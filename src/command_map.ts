import { State } from "./state";

export async function commandMap(state: State) {
    const pokeapi = state.pokeapi;
    state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area?limit=20&offset=${(state.id-1) * 20}`;
    const region = await pokeapi.fetchLocations(state.nextLocationUrl);
    state.id += 1;
    state.nextLocationUrl = `https://pokeapi.co/api/v2/location-area?limit=20&offset=${state.id * 20}`;

    region.name.forEach(location => console.log(location));
    state.rl.prompt();
}