import { State } from "./state.js";

export function commandHelp({commands}: State) {
    console.log("Welcome to the Pokedex!\n\nUsage:\n\n")

    for (const commandName in commands) {
        const command = commands[commandName];
        console.log(`${command.name}: ${command.description}`);
 
    }
}