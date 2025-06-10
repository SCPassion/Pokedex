import { getCommands } from "./commands.js"

export function commandHelp() {
    console.log("Welcome to the Pokedex!\n\nUsage:\n\n")

    const commands = getCommands();

    for (const commandName in commands) {
        const command = commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
}