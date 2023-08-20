import { Schema, model, models } from 'mongoose';

const ColumnSchema = new Schema({
  creatorId: { type: String, required: [true, 'User ID is required'] },
  boardId: {
    type: String,
    required: [true, 'Board id is required'],
  },
  columnName: {
    type: String,
    required: [true, 'Column Name is required'],
  },
  image: {
    type: String,
  },
  order: {
    type: String,
    required: [true, 'Column Order is required'],
    unique: [true, 'Column Order already exists'],
  },
});
ColumnSchema.set('timestamps', true);
const Column = models.Column || model('Column', ColumnSchema);

export default Column;
