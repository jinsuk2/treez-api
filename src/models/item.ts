import { createSchema, Type } from "ts-mongoose";

// Schema for a single ItemType in an Order
export const orderItemSchema = createSchema({
  name: Type.string({ unique: true, index: true, sparse: true }),
  count: Type.number({ default: 0 })
});
