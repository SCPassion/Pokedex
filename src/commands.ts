import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import type { CLICommand } from "./state.js";



export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        }, 
        map: {
            name: "map",
            description: "Displays the map of the region",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays the map back of the region",
            callback: commandMapBack
        }
    }
}