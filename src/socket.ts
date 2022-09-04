import {KlaruSocketServer} from "klarusocket";
import {CONFIG} from "./index";
import {log} from "./features/logger";

let server: KlaruSocketServer;

export function openSocketWindow(): void{
    server = new KlaruSocketServer("klaru-serverhub", CONFIG.socket.connectionKey);

    // Subscribe for listening
    server.listen(CONFIG.socket.bindPort, CONFIG.socket.bindIp, () => {
       log(`Socket has successfully started at ${CONFIG.socket.bindIp}:${CONFIG.socket.bindPort}`);
    });

    // Subscribe for messages
    server.subscribe("init", message => {
        
    });
}