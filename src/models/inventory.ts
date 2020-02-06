import {
  createSchema,
  ExtractDoc,
  Type,
  typedModel,
  ExtractProps
} from "ts-mongoose";

// Schema for a single Inventory Item
const inventorySchema = createSchema({
  id: Type.string({ unique: true, index: true }),
  name: Type.string({ unique: true, index: true }),
  quantity: Type.number({ default: 0 }),
  unitPrice: Type.number({ default: 0 }),
  description: Type.string(),
  itemIds: Type.array({ default: [], index: false }).of(Type.string()),
  lastUpdated: Type.string(),
  active: Type.boolean({ default: true })
});

const Inventory = typedModel("Inventory", inventorySchema, "treez.inventory");

// TypeGuard for body in create/update reqs
interface InventoryDetails {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  description: string;
  lastUpdated: string;
  active: boolean;
  itemIds?: string[];
}

type InventoryDoc = ExtractDoc<typeof inventorySchema>;
type InventoryProps = ExtractProps<typeof inventorySchema>;

export { Inventory, InventoryDetails, InventoryDoc, InventoryProps };
