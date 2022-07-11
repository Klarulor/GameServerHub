export interface ILogMessage{
    content: string;
    channel: number; // not discord chanel, is like a radio channel 1,2,3 etc
    destination: number; // bit shifting [discord, influx]
}