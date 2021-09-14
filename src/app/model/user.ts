import BaseModel from "./base-model";

export default class User extends BaseModel
{
    name:string = "";
    email:string = "";
    role:string = "";
}