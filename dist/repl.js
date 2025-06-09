import readline from "readline";
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
        if (!line) {
            return rl.prompt();
        }
        else {
            console.log(`Your command was: ${cleanedInput[0]}`);
            rl.prompt();
        }
    });
}
