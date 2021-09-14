import BaseModel from "./base-model";

export default class ApplicationProfile extends BaseModel
{
    assetsPath:string = "";
    requestId:string = "randomReqId";
    name: string = "name";
}