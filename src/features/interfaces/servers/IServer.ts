import {StateType} from "../../Types";
import {IServerData} from "./IServerData";

export interface IServer{
    tag: string;
    con: any;
    state: StateType;
    data: IServerData;
}