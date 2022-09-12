import { CommunicationRequestType } from "../../../Enums";

export interface ICommuniateForceMessage{
    type: CommunicationRequestType;
    key: string;
    content: any;
}