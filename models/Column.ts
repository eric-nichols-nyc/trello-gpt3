import { Schema, model, models } from 'mongoose';

const ColumnSchema = new Schema({
  userId: { type: String, required: [true, 'User ID is required'] },
  boardId: {
    type: String,
    unique: [true, 'Board ID already exists'],
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
    type: Number,
  },
});

const Column = models.Column || model('Column', ColumnSchema);

export default Column;
