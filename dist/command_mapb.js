export async function commandMapBack(state) {
    const pokeapi = state.pokeapi;
    const region = await pokeapi.fetchLocations(state.prevLocationsURL);
    region.name.forEach(location => console.log(location));
    state.rl.prompt();
}
