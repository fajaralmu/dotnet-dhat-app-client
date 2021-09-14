import User from "./user";

export default interface WebResponse
{
    success:number,
    date:Date,
    message:string,
    result:any,
    user:User | undefined
}