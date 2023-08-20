import { Schema, model, models } from 'mongoose';

const BoardSchema = new Schema({
  creatorId: { type: String, required: [true, 'User ID is required'] },
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
BoardSchema.set('timestamps', true);
const Board = models.Board || model('Board', BoardSchema);

export default Board;
