import { Schema, model, models } from 'mongoose';

const CardSchema = new Schema({
  userId: { 
    type: String,
    required: [true, 'User ID is required'] 
  },
  boardId: {
    type: String,
    unique: [true, 'Board ID already exists'],
    required: [true, 'Board id is required'],
  },
  columnId: { 
    type: String,
    required: [true, 'Column ID is required'] ,
    unique: [true, 'Board ID already exists']
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
  order:{
    type: Number,
  }
});

const Card = models.Card || model('Card', CardSchema);

export default Card;
