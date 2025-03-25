import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  mediaUrl: { type: String },
  messageType: { type: String, enum: ['text', 'image', 'document'], default: 'text' },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

const Message= mongoose.model('Message', MessageSchema);
export default Message;