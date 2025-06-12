import { createInterface, type Interface }  from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./PokeAPI.js";

export type State = {
    id: number;
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationUrl: string;
    prevLocationsURL: string;
}
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export function initState(): State {
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