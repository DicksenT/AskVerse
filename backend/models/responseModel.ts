import mongoose, {Schema, model, Document, Types, models} from 'mongoose'

export interface IResponse extends Document{
    _id: Types.ObjectId
    msgId: Types.ObjectId
    OpenAI: string | null
    Gemini: string | null
    Cohere: string | null
    DeepSeek: string | null
    Claude: string | null
    personality: string
}   

const responseScheme = new Schema<IResponse>({
    msgId:{type: Schema.Types.ObjectId, ref:'Message',required: true},
    OpenAI:{type: String, default: null},
    Gemini:{type: String, default: null},
    Cohere:{type: String, default: null},
    DeepSeek:{type: String, default: null},
    Claude:{type: String,  default: null},
    personality:{type: String, required: true}
})
const Response = models.Response as mongoose.Model<IResponse> || model<IResponse>('Response', responseScheme)

export default Response