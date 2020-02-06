import { createSchema, Type } from "ts-mongoose";

// Schema for a single ItemType in an Order
export const orderItemSchema = createSchema({
  itemId: Type.string({ unique: true, index: true, sparse: true }),
  itemName: Type.string({ unique: true, index: true, sparse: true }),
  count: Type.number({ default: 0 })
});
