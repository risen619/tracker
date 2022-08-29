export interface IApiKeyModel<ObjectId>
{
    issuer: ObjectId;
    key: string;
    name: string;
    project: ObjectId;
    _id: ObjectId;
}