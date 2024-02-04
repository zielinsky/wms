export interface Warehouse {
  id: string;
  name: string;
  items?: Array<WarehouseItem>;
}

export interface WarehouseItem {
  id: string;
  name: string;
  amount: number;
}
