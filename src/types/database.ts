import mongoose, { isValidObjectId } from 'mongoose';

export type Relation<T> = mongoose.PopulatedDoc<mongoose.Document<mongoose.ObjectId> & T>;
export type RelationList<T> = Relation<T>[];

export const ObjectId = mongoose.Schema.Types.ObjectId;

export function validateId(id: string): boolean {
  return isValidObjectId(id);
}
