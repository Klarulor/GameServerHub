import {setupSocket} from "./socket";
import {IServer} from "./interfaces/IServer";
import {setupDiscord} from "./discord";
export const Config = require(__dirname + "/../config.json");
export let ServerPool: any = {}; // string port is key, value is IServer
setupSocket();
setupDiscord();