import {IInitMessage} from "./IInitMessage";
import {IOnlineMessage} from "./IOnlineMessage";
import {ICustomData} from "./ICustomData";
import {ServerState} from "../features/Types";
import {KlaruClient, KlaruSocketClient} from "klarusocket";

export interface IServer extends IInitMessage{
    online: IOnlineMessage;
    data: ICustomData;
    alive: boolean;
    state: ServerState;
    con: any;
    socketClient: KlaruClient;
}