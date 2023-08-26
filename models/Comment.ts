import {Schema, model, models } from 'mongoose'

const CommentSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'card',
    required: true,
  },
  comment:{
    type: String,
    required: true,
  }
});

CommentSchema.set('timestamps', true)
const Comment = models.Comment || model('Comment', CommentSchema)
export default Comment