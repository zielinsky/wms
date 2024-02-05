import React, { useEffect } from "react";
import { List } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/App/hooks";
import { fetchWarehousesWithItems } from "../../Store/asyncThunks";
import { selectStatus } from "../../Store/Users/userSlice";
import { selectWarehouses } from "../../Store/Warehouses/warehouseSlice";
import WarehouseCard from "../../Components/Warehouse/WarehouseCard";

const WarehousesPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWarehousesWithItems());
  }, []);
  const warehouses = useAppSelector(selectWarehouses);
  const status = useAppSelector(selectStatus);
  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        itemLayout="horizontal"
        dataSource={warehouses}
        renderItem={(warehouse, index) => (
          <List.Item>
            <WarehouseCard warehouse={warehouse} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default WarehousesPage;
