import { Schema, model, models } from 'mongoose';

const CardSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  boardId: {
    type: String,
    required: [true, 'Board id is required'],
    unique: false,
  },
  columnId: {
    type: String,
    required: [true, 'Column ID is required'],
    unique: false,
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
    type: Number,
    required: [true, 'Card order is required'],
    unique: [true, 'Card order already exists'],
  },
});
CardSchema.set('timestamps', true);
const Card = models.Card || model('Card', CardSchema);

export default Card;
