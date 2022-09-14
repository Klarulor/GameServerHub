import {GameType, Ip} from "../Types";

export interface IConfig{
    socket: ISocketConfig;
    discord: IDiscordConfig;
    serverController: IServerControllerConfig;
    servers: {
        [tag: string]: IServer;
    };
}

interface ISocketConfig{
    bindIp: string;
    bindPort: number;
    connectionKey?: string;
}

interface IDiscordConfig{
    main: IDiscordMainConfig;
    masterBot: IDiscordBotConfig;
    servers: {
        [tag: string]: IDiscordServerConfig
    }
}

interface IDiscordMainConfig{
    embedChannels: IDiscordMainGuildConfig[]
}

interface IDiscordMainGuildConfig{
    guildId: string;
    channelId: string;
    messageId: string;
    updateTimeMS: number;
}

interface IDiscordBotConfig{
    token: string;
}

interface IDiscordServerConfig{
    bot: IDiscordBotConfig;
    channels: string[]
}

interface IServerControllerConfig{
    updateTimeMS: number;
}

interface IServer{
    publicAddress: Ip;
    publicPort: number;
    game: GameType;
    enabled: boolean;
}