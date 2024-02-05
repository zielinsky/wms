import React, { useEffect, useState } from "react";
import { List, Card, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/App/hooks";
import { fetchWarehousesWithItems } from "../../Store/asyncThunks";
import { selectStatus } from "../../Store/Users/userSlice";
import { selectWarehouses } from "../../Store/Warehouses/warehouseSlice";
import WarehouseItem from "../../Components/WarehouseItem/WarehouseItem";

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
                  <WarehouseItem warehouseItem={warehouseItem} />
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
