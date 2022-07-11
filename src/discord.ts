import {ActivityOptions, Client, Intents, MessageEmbed, TextChannel} from "discord.js";
import {Config, ServerPool} from "./index";
import {getEmbed, splitText} from "./features/functions";
import {ActivityTypes} from "discord.js/typings/enums";
import {IServer} from "./interfaces/IServer";
const fs = require(`fs`);
const MAX_SYMBOLS = 2000;
const clients: any = {};
let botClient: Client;

export function setupDiscord(){
    login();
    setInterval(update, Config.discord.statusUpdateTime);

}

function login(): void{
    botClient = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]});
    botClient.login(Config.discord.mainBotToken);
    botClient.on(`ready`, () => console.log(`Logged as main bot ${botClient.user.tag}`));
    for(const k in Config.servers){
        const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]});
        client.login(Config.servers[k].botToken);
        client.on(`ready`, ((cl: Client) => {
            clients[k] = cl;
            console.log(`Logged as ${clients[k].user.tag}`)
        }).bind(client));
    }
}
export function writeLog(gamePort: number, channel: number, content: string): void{
    if(!clients[gamePort] || !Config.servers[gamePort]?.logChannels[channel]) return;
    let messages: string[] = content.length > MAX_SYMBOLS ? splitText(content, MAX_SYMBOLS) : [content];
    const textChannel = clients[gamePort].guilds.resolve(Config.discord.guild).channels.resolve(Config.servers[gamePort].logChannels[channel]) as TextChannel;
    for(const i in messages){
        textChannel.send(messages[i]);
    }
}
function update(): void{
    updateEmbeds();
    for(const i in clients){
        updateStatus(i);
    }
}
const getServerOfflineEmbed = (client: Client, port: string) => new MessageEmbed().setColor("#1C0000").setTitle(client?.user?.username || port).setDescription("```Server is offline```");
const getServerInitEmbed = (client: Client, port: string) => new MessageEmbed().setColor("#003666").setTitle(client?.user?.username || port).setDescription("```Server is preparing```");
function updateEmbeds(): void{
    const channel = botClient.channels.resolve(Config.discord.embedChannel) as TextChannel;
    const embeds: MessageEmbed[] = [];
    channel.messages.fetch().then(async x => {
        const message = x.find(z => z.id === Config.discord.embedMessageId);
        for(let k in Config.servers){
            const serverConfig = Config.servers[k];
            const client = clients[k] as Client;
            if(ServerPool[k] && ServerPool[k].state === "OK"){
                embeds.push(getEmbed(k, client.user.username, client.user.avatarURL()));
            }else if(ServerPool[k] && ServerPool[k].state === "INIT") {
                embeds.push(getServerInitEmbed(client, k));
            } else{
                embeds.push(getServerOfflineEmbed(client, k));
            }
        }
        if(message){
            await message.edit({embeds});
        }else{
            const newMessage = await channel.send({embeds});
            Config.discord.embedMessageId = newMessage.id;
            fs.writeFileSync(__dirname+ "/../config.json", JSON.stringify(Config, null, "\t"));
        }
    })
}
function updateStatus(port: string): void{
    const client = clients[port] as Client;
    const server = ServerPool[port] as IServer;
    const activity: ActivityOptions = {};
    if(!server || !server.alive)
    {
        activity.type = "PLAYING";
        activity.name = !server ? "offline server" : !server.data?.data ? "Init" : "idle server";
        client.user.setStatus("dnd");
    }else if(ServerPool[port].state === "OK"){
        if(server.online.online === 0){
            activity.type = "PLAYING";
            activity.name = "0 players"
            client.user.setStatus("idle");
        }else{
            activity.type = "WATCHING";
            activity.name = `${server.online} players`
            client.user.setStatus("online");
        }
    }else if(ServerPool[port].state === "INIT"){
        activity.type = "LISTENING";
        activity.name = "prepare data";
        client.user.setStatus("dnd");
    }
    client.user.presence.set({activities: [activity]})
}