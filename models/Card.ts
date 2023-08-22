import { Schema, model, models } from 'mongoose';

const CardSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'board',
    required: [true, 'Board id is required'],
  },
  columnId: {
    type: Schema.Types.ObjectId,
    ref: 'column',
    required: [true, 'Column ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Card Name is required'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  order: {
    type: String,
    required: [true, 'Card order is required'],
  },
});
CardSchema.set('timestamps', true);
const Card = models.Card || model('Card', CardSchema);

export default Card;
