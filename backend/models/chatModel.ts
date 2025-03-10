import {Schema, model, Document, Types} from 'mongoose'

export interface IChat extends Document{
    _id: Types.ObjectId
    userId: Types.ObjectId
    name: string
    messages: Types.ObjectId[]
}
const chatScheme = new Schema<IChat>({
    userId: {type: Schema.Types.ObjectId, required: true},
    name:{type: String, required:true},
    messages: [{type: Schema.Types.ObjectId , ref: 'Message'}]
})

const Chat = model<IChat>('Chat', chatScheme)

export default Chat