import mongoose, {Schema, model, Document, Types, models} from 'mongoose'
import Message from './messageModel'
import User from './userModel'

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

chatScheme.pre('findOneAndDelete', async function(next){
    try{
        const chat = await this.model.findOne(this.getFilter())
        if(chat){
            await Message.deleteMany({chatId: chat._id})
            await User.findOneAndUpdate({_id: chat.userId}, {$pull: {chats: chat._id}})
        }
        next()
    }catch(error){
        next(error)
    }
})

const Chat = (models.Chat as mongoose.Model<IChat>) || model<IChat>("Chat", chatScheme);
export default Chat