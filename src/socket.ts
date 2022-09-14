import {KlaruClient, KlaruSocketServer, MyRequestMessage} from "klarusocket";
import {CONFIG} from "./index";
import {log} from "./features/logger";
import { IInitMessage } from "./features/interfaces/MessageStructures/IInitMessage";
import { getServer } from "./features/functions";
import { IServerDataMessage } from "./features/interfaces/MessageStructures/IServerDataMessage";
import { GameServer } from "./features/GameServer";
import { IReplyMessage } from "./features/interfaces/MessageStructures/IReplyMessage";
import { SERVERS } from "./features/serverController";

let server: KlaruSocketServer;

export function openSocketWindow(): void{
    server = new KlaruSocketServer("klaru-serverhub", CONFIG.socket.connectionKey);

    // Subscribe for listening
    server.listen(CONFIG.socket.bindPort, CONFIG.socket.bindIp, () => {
       log(`Socket has successfully started at ${CONFIG.socket.bindIp}:${CONFIG.socket.bindPort}`);
    });

    // Subscribe for messages
    server.subscribe("init", onInitMessage);
    //server.subscribe("data_update", onDataUpdateMessage);


    server.on(`close`, con => {
        const server = getServer(con);
        if(server)
        {
            server.state = "DEAD";
        }
    })
}


function onInitMessage(message: MyRequestMessage){

    const struct = message.data as IInitMessage;
    if(!struct.tag || !SERVERS[struct.tag]) return message.reply({success: false, message: "bad init"} as IReplyMessage)
    SERVERS[struct.tag] = new GameServer(struct.tag, message.sender as KlaruClient);
    log(`${struct.tag} server got on init state`);
    message.reply({success: true} as IReplyMessage)
}

// function onDataUpdateMessage(message: MyRequestMessage){
//     const struct = message.data as IServerDataMessage;
//     const server = getServer(message.sender.con);
//     server.data = struct;
//     message.reply({success: true} as IReplyMessage)
// }