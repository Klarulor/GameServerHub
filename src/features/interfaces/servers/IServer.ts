import { KlaruClient } from "klarusocket";
import {StateType} from "../../Types";
import {IServerData} from "./IServerData";

export interface IServer{
    tag: string;
    con: any;
    client: KlaruClient;
    state: StateType;
    data: IServerData;
}