import {Schema, model, Document, Types} from 'mongoose'

export interface IResponse extends Document{
    _id: Types.ObjectId
    msgId: Types.ObjectId
    OpenAI: string | null
    Gemini: string | null
    Cohere: string | null
    DeepSeek: string | null
    Claude: string | null
}   

const responseScheme = new Schema<IResponse>({
    msgId:{type: Schema.Types.ObjectId, required: true},
    OpenAI:{type: String, default: null},
    Gemini:{type: String, default: null},
    Cohere:{type: String, default: null},
    DeepSeek:{type: String, default: null},
    Claude:{type: String,  default: null}
})
const Response =  model<IResponse>('Response', responseScheme)

export default Response