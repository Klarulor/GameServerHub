import {MessageEmbed} from "discord.js";
import {ServerPool} from "../index";
import {IServer} from "../interfaces/IServer";
import {ISCPSLCustomData} from "../interfaces/customData/ISCPSLCustomData";

export function splitText(source: string, MAX: number): string[]{
    let strings: string[];
    for (var a = 0, c = source.length; a < c && !(a >= c / 2 && " " == source[a]); a++);
    strings[0] = source.substring(0, a);
    getStrings();
    function getStrings() {
        for (let i = 0; i <= MAX - 1; i++) {
            if (source.substring(a + i) != undefined) {
                strings[strings.length] = source.substring(a + i);
            }
        }
    }
    return strings;
}

const TR="```";
const emoji = (condition: boolean) => condition ? "✅" : "🟥";
export function getEmbed(port: string, title: string, avatarUrl: string): MessageEmbed{
    const embed = new MessageEmbed();
    const server = ServerPool[port] as IServer;
    embed.setTitle(title);
    embed.setAuthor("Celena", avatarUrl);
    embed.addField("Online", server.online.online.toString())
    embed.setColor(server.online.online > 0 ? "#22D35D" : "#9DD322");
    if(server.data?.data?.uptime)
        embed.addField("Uptime", `<t:${server.data.data.uptime}>`);
    switch (server.game){
        case "SCP": {
            const data = server.data.data as ISCPSLCustomData;
            embed.addField("Admins", `${TR}${data.admins}${TR}`);
            embed.addField("Alive", `${TR}${data.alive}${TR}`);
            embed.addField("Admins", emoji(data.warheadDetonated));
        }
        case "MC": {

        }
    }
    return embed;
}