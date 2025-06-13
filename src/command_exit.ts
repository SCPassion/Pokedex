import { State } from "./state.js";

export async function commandExit({rl, pokeapi}: State) {
    console.log("Closing the Pokedex... Goodbye!");
    pokeapi.cache.stopReapLoop();
    rl.close();
    process.exit(0);
}


