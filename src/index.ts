import {openSocketWindow} from "./socket";
import {IConfig} from "./features/interfaces/IConfig";
import { parse, stringify } from 'yaml';
import {readFileSync} from 'fs';
import {IServer} from "./features/interfaces/servers/IServer";

export const CONFIG = parse(readFileSync('../config.yml', 'utf8')) as IConfig;
export const SERVERS: {[tag: string]: IServer} = {};

openSocketWindow();