import BaseModel from "./base-model";
import User from "./user";

export default class ChatRoom extends BaseModel
{
    code:string = "CHAT_ROOM";
    description:string = "";
    userId:number = 0;
    user:User = new User();
}