import User from "../model/user";

export default interface WebResponse
{
    success:number,
    date:Date,
    message:string,
    result:any,
    user:User | undefined
}