import { KlaruClient } from "klarusocket";
import { HardwareMessageType } from "./Enums";
import { IStateCheckHardwareMesasge } from "./interfaces/HardwareMessages/IStateCheckHardwareMesasge";
import { ICommuniateForceMessage } from "./interfaces/MessageStructures/Communication/ICommunicateForceMessage";
import { ICommunicateRequestMessage } from "./interfaces/MessageStructures/Communication/ICommunicateRequestMessage";
import { ICommunicateResponseMessage } from "./interfaces/MessageStructures/Communication/ICommunicateResponseMessage";
import { IReplyMessage } from "./interfaces/MessageStructures/IReplyMessage";
import { IServer } from "./interfaces/servers/IServer";
import { IServerData } from "./interfaces/servers/IServerData";
import { SERVERS } from "./serverController";
import { StateType } from "./Types";

export class GameServer implements IServer{
    public readonly _tag: string;
    private readonly _client: KlaruClient;
    private readonly _con: any;
    private _state: StateType;
    private _data: IServerData;

    public constructor(tag: string, client: KlaruClient){
        this._tag = tag;
        this._client = client;
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
    public get client(){
        return this._client;
    }
    public get state(){
        return this._state;
    }
    public get data(){
        return this._data;
    }
    public get con(){
        return this._con;
    }

    public static get list(){
        return SERVERS;
    }

    public drop(): void{
        delete SERVERS[this._tag];
    }
    public updateDataForceAsync = () => this.updateDataForce();
    public updateDataForce(): Promise<void>{
        return new Promise(async res => {
            const packet: IStateCheckHardwareMesasge = {
                type: HardwareMessageType.STATUS_CHECK
            };
            const data = await this.client.get("hardware_message", JSON.stringify(packet), 1000);
            if(data.data){
                const reply = data.data as IReplyMessage;
                this._state = reply.success ? "ALIVE" : "BAD";
            }else this._state = "NO_RESPONDING";
            res();
        });
    }
    public sendMessage(message: ICommuniateForceMessage): void{

    }
    public sendMessageAsync(message: ICommunicateRequestMessage): Promise<ICommunicateResponseMessage>{
        return new Promise(async res => {

        });
    }
}