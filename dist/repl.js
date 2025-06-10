import readline from "readline";
import { getCommands } from "./commands.js";
export function cleanInput(input) {
    return input.toLocaleLowerCase().trim().split(" ");
}
export function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (line) => {
        const cleanedInput = cleanInput(line);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = cleanedInput[0];
        const commands = getCommands();
        console.log(commands);
        const cmd = commands[commandName];
        console.log(cmd);
        if (!cmd) {
            console.log(`Unknown command: ${commandName}. Type 'help' for a list of commands.`);
            rl.prompt();
            return;
        }
        try {
            cmd.callback(commands);
        }
        catch (error) {
            console.log(error);
        }
        rl.prompt();
    });
}
