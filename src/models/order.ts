import {
  createSchema,
  ExtractDoc,
  Type,
  typedModel,
  ExtractProps
} from "ts-mongoose";
import { orderItemSchema } from "./item";
import { OrderStatus } from "../utils/enums";

// Schema for a single Order created by a customer
const orderSchema = createSchema({
  id: Type.string({ unique: true, index: true }),
  email: Type.string(),
  status: Type.string({ default: OrderStatus.SHOPPING }),
  items: Type.array({ default: [], index: false }).of(orderItemSchema),
  total: Type.number({ default: 0 }),
  lastUpdated: Type.string(),
  orderDatePlaced: Type.string()
});

const Order = typedModel("Order", orderSchema, "treez.orders");

// TypeGuard for body in create/update reqs
interface OrderDetails {
  id: string;
  email: string;
  items: any[];
  status: string;
  total: number;
  lastUpdated: string;
  orderDatePlaced?: string;
}

type OrderDoc = ExtractDoc<typeof orderSchema>;
type OrderProps = ExtractProps<typeof orderSchema>;

export { Order, OrderDetails, OrderDoc, OrderProps, orderSchema };
