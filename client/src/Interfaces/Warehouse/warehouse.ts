export interface WarehouseI {
  id: string;
  name: string;
  items?: Array<WarehouseItemI>;
}

export interface WarehouseItemI {
  id: string;
  name: string;
  amount: number;
}
