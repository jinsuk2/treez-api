import {
  createSchema,
  ExtractDoc,
  Type,
  typedModel,
  ExtractProps
} from "ts-mongoose";

const inventorySchema = createSchema({
  id: Type.string({ unique: true, index: true }),
  name: Type.string(),
  description: Type.string(),
  price: Type.number(),
  quantity: Type.number()
});

const Inventory = typedModel("Inventory", inventorySchema, "treez.inventories");

interface InventoryDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

type InventoryDoc = ExtractDoc<typeof inventorySchema>;
type InventoryProps = ExtractProps<typeof inventorySchema>;

export { Inventory, InventoryDetails, InventoryDoc, InventoryProps };
