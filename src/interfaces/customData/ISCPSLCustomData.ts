import {IAdminCustomDataModule} from "./modules/IAdminCustomDataModule";
import {IBaseData} from "./IBaseData";

export interface ISCPSLCustomData extends IBaseData, IAdminCustomDataModule{
    alive: number;
    warheadDetonated: boolean;
}