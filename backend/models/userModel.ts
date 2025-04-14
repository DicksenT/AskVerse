import mongoose, {Schema, model, Document, Types, models} from 'mongoose'
export interface IUser extends Document{
    email: string
    password?: string
    image?: string
    name?: string
    chats: Types.ObjectId[]
}
const userScheme = new Schema<IUser>({
    email:{type: String, required: true, unique:true},
    password:{type:String},
    image:{types:String},
    chats:[{type: Schema.Types.ObjectId, ref: 'Chat'}]
})

const User = models.User as mongoose.Model<IUser> || model<IUser>('User', userScheme)
export default User