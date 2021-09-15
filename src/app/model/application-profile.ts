import BaseModel from "./base-model";

export default class ApplicationProfile extends BaseModel
{
    assetsPath:string = "";
    requestID:string = "randomReqId";
    name: string = "name";
}