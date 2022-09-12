import {IServerCustomData} from "./IServerCustomData";

export interface ISCPCustomData extends IServerCustomData{
    admins: number;
    scps: number;
}