export function cleanInput(input) {
    return input.toLocaleLowerCase().trim().split(" ");
}
export function startREPL(state) {
    const rl = state.rl;
    const commands = state.commands;
    rl.prompt();
    rl.on("line", (line) => {
        const cleanedInput = cleanInput(line);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = cleanedInput[0];
        const cmd = commands[commandName];
        if (!cmd) {
            rl.prompt();
            return;
        }
        try {
            cmd.callback(state);
        }
        catch (error) {
            console.log(error);
        }
    });
}
