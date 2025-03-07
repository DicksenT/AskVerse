import {Schema, model, Document, Types} from 'mongoose'
export interface IUser extends Document{
    email: string
    password?: string
    image?: string
    chats: Types.ObjectId[]
}
const userScheme = new Schema<IUser>({
    email:{type: String, required: true},
    password:{type:String},
    image:{types:String},
    chats:[{type: Schema.Types.ObjectId, ref: 'Chat'}]
})

const User = model<IUser>('User', userScheme)
export default User