import {KlaruClient, KlaruSocketServer} from "klarusocket";
import {Config, ServerPool} from "./index";
import {IInitMessage} from "./interfaces/IInitMessage";
import {IServer} from "./interfaces/IServer";
import {ILogMessage} from "./interfaces/ILogMessage";
import {writeLog} from "./discord";
import {shiftBits, unShiftBits} from "bit-wrapper";
import {IDataMessage} from "./interfaces/IDataMessage";

export let server: KlaruSocketServer;
export function setupSocket(): void{
    server = new KlaruSocketServer("server-hub");
    server.listen(parseInt(Config.socket.port ?? "8001"), Config.socket.host, () => {
        console.log("Started");
    })
    server.subscribe("init", req => {
        const struct = JSON.parse(req.data) as IInitMessage;
        const server: IServer = {
            online: {online: 0, players: []},
            data: null,
            alive: true,
            server: struct.server,
            state: "INIT",
            gamePort: struct.gamePort,
            game: struct.game,
            con: req.sender.con,
            socketClient: req.sender as KlaruClient

        };
        ServerPool[struct.gamePort] = server;
        console.log(`Connected to ${struct.gamePort} server!`);
        req.reply(1);
    });
    server.subscribe(`data`, req => {
        const struct = JSON.parse(req.data) as IDataMessage;
        const server = ServerPool.find((x: string) => ServerPool[x].con == req.sender.con) as IServer;
        server.online = struct.online;
        server.data = struct.custom;
        server.state = "OK";
        req.reply(1);
    })
    server.subscribe("log", req => {
        const struct = JSON.parse(req.data) as ILogMessage;
        const server = ServerPool.find((x: string) => ServerPool[x].con == req.sender.con) as IServer;
        const bits = unShiftBits(struct.destination, 2);
        if(bits[0]) writeLog(server.gamePort, struct.channel, struct.content);
        //if(bits[1]) writeInfluxLog(server.gamePort, struct.content);
        req.reply(1);
    })
    server.on(`close`, target => {
        const client = target as KlaruClient;
        const server = ServerPool.find((x: string) => ServerPool[x].con == client.con) as IServer;
        ServerPool[server.gamePort].alive = false;
    })
    setInterval(() => {
        for(const k in ServerPool){
            const server = ServerPool[k] as IServer;
            if(server.socketClient.status != "ALIVE")
            {
                server.alive = false;
                server.state = "LOST_CONNECTION"
            }
        }
    }, 1000);
}