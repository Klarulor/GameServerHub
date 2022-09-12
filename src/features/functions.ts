import { SERVERS } from "..";
import { IServer } from "./interfaces/servers/IServer";

export function getServer(con: any): IServer | null{
    const array = Object.values(SERVERS).filter(x => x.con == con);
    return array.length == 0 ? null : array[0];
}