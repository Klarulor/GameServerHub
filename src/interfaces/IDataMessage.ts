import {IOnlineMessage} from "./IOnlineMessage";
import {ICustomData} from "./ICustomData";

export interface IDataMessage{
    online: IOnlineMessage;
    custom: ICustomData;
}