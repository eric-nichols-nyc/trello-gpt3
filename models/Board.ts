import { Schema, model, models } from 'mongoose';

const BoardSchema = new Schema({
  userId: { type: String, required: [true, 'User ID is required'] },
  boardId: {
    type: String,
    unique: [true, 'Board ID already exists'],
    required: [true, 'Board id is required'],
  },
  backgroundImage: { type: String },
  backgroundColor: { type: String },
  name: {
    type: String,
    required: [true, 'board Name is required'],
  },
  image: {
    type: String,
  },
});

const Board = models.board || model('Board', BoardSchema);

export default Board;
