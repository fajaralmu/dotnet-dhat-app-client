import BaseModel from "./base-model";
import User from "./user";

export default class ChatMessage extends BaseModel
{
    body:string = "";
    fromUserId:number = 0;
    toUserId:number | undefined;
    roomId:number | undefined;
    
    fromUser:User = new User();
    toUser:User | undefined;
    room:any;
}