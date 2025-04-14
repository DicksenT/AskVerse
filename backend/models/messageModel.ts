import mongoose, { Schema, model, Document, Types, models } from 'mongoose'
import Response from './responseModel'

export interface IMessage extends Document {
  _id: Types.ObjectId
  chatId: Types.ObjectId
  question: string
  response: Types.ObjectId[]
}

const messageScheme = new Schema<IMessage>({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  question: { type: String, required: true },
  response: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
})

// ✅ Delete related responses on message delete
messageScheme.pre('deleteMany', { document: false, query: true }, async function (next) {
  try {
    const messages = await this.model.find(this.getFilter())
    const msgIds = messages.map(msg => msg._id)
    if (msgIds.length > 0) {
      await Response.deleteMany({ msgId: { $in: msgIds } })
    }
    next()
  } catch (err) {
    next(err)
  }
})

// ✅ Allow reload in dev
if (mongoose.models.Message) {
  delete (mongoose.models as any).Message
}

const Message = model<IMessage>('Message', messageScheme)
export default Message
