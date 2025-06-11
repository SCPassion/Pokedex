import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLocaleLowerCase().trim().split(" ");
}

export function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  rl.prompt();

  rl.on("line", (line) => {
    const cleanedInput = cleanInput(line);
    if( cleanedInput.length === 0 ) {
      rl.prompt();
      return;
    }
    const commandName = cleanedInput[0];
    
    const cmd = commands[commandName];
    
    if(!cmd) {
      console.log(`Unknown command: ${commandName}. Type 'help' for a list of commands.`);
      rl.prompt();
      return;
    }

    try {
      cmd.callback(state);
    } catch(error) {
      console.log(error);
    }

    rl.prompt();
});
}
