import React, { useEffect } from "react";
import { List, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/App/hooks";
import {
  fetchWarehouses,
  fetchWarehousesWithItems,
} from "../../Store/asyncThunks";
import { selectStatus, selectUsers } from "../../Store/Users/userSlice";
import { selectWarehouses } from "../../Store/Warehouses/warehouseSlice";

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
            <Card title={warehouse.name}>
              <List
                itemLayout="horizontal"
                dataSource={warehouse.items}
                renderItem={(warehouseItem, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={warehouseItem.name}
                      description={warehouseItem.amount}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WarehousesPage;
