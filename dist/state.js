import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./PokeAPI.js";
export function initState() {
    // Initialize the readline interface
    let id = 0;
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commands = getCommands();
    const pokeapi = new PokeAPI();
    return {
        id,
        rl,
        commands,
        pokeapi,
        nextLocationUrl: `https://pokeapi.co/api/v2/location-area?limit=20&offset=${id * 20}`,
        prevLocationsURL: `https://pokeapi.co/api/v2/location-area?limit=20&offset=${(id - 1) * 20}`,
    };
}
