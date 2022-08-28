export interface IProjectModel<ObjectId>
{
    apiKey: string;
    name: string;
    owner: ObjectId;
    _id: ObjectId;
}