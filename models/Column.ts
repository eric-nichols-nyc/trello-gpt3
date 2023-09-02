import { Schema, model, models } from 'mongoose';

const ColumnSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  boardId: {
    type: String,
    required: [true, 'User ID is required'],
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
  },
});
ColumnSchema.set('timestamps', true);
const Column = models.Column || model('Column', ColumnSchema);

export default Column;
