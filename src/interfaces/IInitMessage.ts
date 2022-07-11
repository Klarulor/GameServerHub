import {IServerSettings} from "./IServerSettings";
import {GameType} from "../features/Types";

export interface IInitMessage{
    gamePort: number;
    server: IServerSettings;
    game: GameType;
}