import { SERVERS } from "..";
import { ICommuniateForceMessage } from "./interfaces/MessageStructures/Communication/ICommunicateForceMessage";
import { ICommunicateRequestMessage } from "./interfaces/MessageStructures/Communication/ICommunicateRequestMessage";
import { ICommunicateResponseMessage } from "./interfaces/MessageStructures/Communication/ICommunicateResponseMessage";
import { IServer } from "./interfaces/servers/IServer";
import { IServerData } from "./interfaces/servers/IServerData";
import { StateType } from "./Types";

export class GameServer implements IServer{
    public readonly _tag: string;
    private readonly _con: any;
    private _state: StateType;
    private _data: IServerData;

    public constructor(tag: string, con: any){
        this._tag = tag;
        this._con = con;
        this._state = "INIT";
        this._data = {
            basicData: {
                online: 0,
                startTime: 0
            },
            customData: {}
        }
    }


    public get tag(){
        return this._tag;
    }
    public get con(){
        return this._con;
    }
    public get state(){
        return this._state;
    }
    public get data(){
        return this._data;
    }

    public drop(): void{
        delete SERVERS[this._tag];
    }
    public updateDataForceAsync = () => this.updateDataForcec();
    public updateDataForcec(): Promise<void>{
        return new Promise(async res => {

        });
    }
    public sendMessage(message: ICommuniateForceMessage): void{

    }
    public sendMessageAsync(message: ICommunicateRequestMessage): Promise<ICommunicateResponseMessage>{
        return new Promise(async res => {

        });
    }
}