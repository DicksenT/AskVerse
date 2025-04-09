import mongoose from 'mongoose'
import {Schema, model, Document, Types, models} from 'mongoose'

export interface IMessage extends Document{
    _id: Types.ObjectId
    chatId: Types.ObjectId
    question: string
    response: Types.ObjectId
}

const messageScheme = new Schema<IMessage>({
    chatId: {type: Schema.Types.ObjectId, ref: 'Chat', required: true},
    question:{type:String, required:true},
    response:[{type: Schema.Types.ObjectId, ref:'Response'}]
})


const Message = models.Message as mongoose.Model<IMessage> ||  model<IMessage>('Message', messageScheme)

export default Message