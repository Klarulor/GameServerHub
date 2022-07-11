import {KlaruSocketClient} from "klarusocket";
import {IInitMessage} from "../interfaces/IInitMessage";

const slave = new KlaruSocketClient("scpsl-7777");
slave.on(`auth`, () => {
    (async () => {
        const data: IInitMessage = {game: "SCP", gamePort: 7777, server: {maxPlayers: 20, whitelist: false}}
        const res = await slave.get("init", JSON.stringify(data));
    })()
});
slave.connect(8001, "127.0.0.1", "a");


