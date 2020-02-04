import {
  createSchema,
  ExtractDoc,
  Type,
  typedModel,
  ExtractProps
} from "ts-mongoose";

const orderSchema = createSchema({
  id: Type.string({ unique: true, index: true }),
  email: Type.string(),
  orderDate: Type.string(),
  status: Type.string()
});

const Order = typedModel("Order", orderSchema, "treez.orders");

interface OrderDetails {
  id: string;
  email: string;
  orderDate: string;
  status: string;
}

type OrderDoc = ExtractDoc<typeof orderSchema>;
type OrderProps = ExtractProps<typeof orderSchema>;

export { Order, OrderDetails, OrderDoc, OrderProps, orderSchema };
