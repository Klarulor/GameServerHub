import { CONFIG } from "..";
import { HardwareMessageType } from "./Enums";
import { GameServer } from "./GameServer";
import { IStateCheckHardwareMesasge } from "./interfaces/HardwareMessages/IStateCheckHardwareMesasge";
import { IReplyMessage } from "./interfaces/MessageStructures/IReplyMessage";

export const SERVERS: {[tag: string]: GameServer} = {};

export function setupServerController(){
    setInterval(serverCommunicate, CONFIG.serverController.updateTimeMS);
}

async function serverCommunicate(){
    for(const k in SERVERS){
        const s = SERVERS[k];
       s.updateDataForce();
    }
}

function updateServers(server: GameServer){
    
}