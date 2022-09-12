import {IServerCustomData} from "./CustomData/IServerCustomData";
import {IBasicServerData} from "./IBasicServerData";

export interface IServerData{
    customData: IServerCustomData;
    basicData: IBasicServerData;
}