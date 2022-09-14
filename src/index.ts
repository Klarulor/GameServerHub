import {openSocketWindow} from "./socket";
import {IConfig} from "./features/interfaces/IConfig";
import { parse, stringify } from 'yaml';
import {readFileSync} from 'fs';
import {IServer} from "./features/interfaces/servers/IServer";
import { GameServer } from "./features/GameServer";
import { setupServerController } from "./features/serverController";

export const CONFIG = parse(readFileSync(`${__dirname}/../config.yml`, 'utf8')) as IConfig;

openSocketWindow();
setupServerController();