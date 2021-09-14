import BaseModel from "./base-model";
import User from "./user";

export default class ChatMessage extends BaseModel {
    body: string = "";
    fromUserID: number | undefined;
    toUserID: number = 0;
    roomID: number | undefined;

    fromUser: User | undefined;
    toUser: User | undefined;
    room: any;
}