export async function commandExit({ rl, pokeapi }) {
    console.log("Closing the Pokedex... Goodbye!");
    pokeapi.cache.stopReapLoop();
    rl.close();
    process.exit(0);
}
