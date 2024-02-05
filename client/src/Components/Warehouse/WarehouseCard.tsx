import { List, Card, Button } from "antd";
import React, { useState } from "react";
import WarehouseItem from "../../Components/WarehouseItem/WarehouseItem";
import WarehouseItemAddModal, {
  WarehouseItemAddModalInputs,
} from "../../Components/WarehouseItem/WarehouseItemAddModal";
import { WarehouseI } from "../../Interfaces/Warehouse/warehouse";
import { addWarehouseItem } from "../../Store/asyncThunks";
import { useAppDispatch } from "../../Store/App/hooks";
import { useAuth } from "../../Hooks/useAuth";

interface props {
  warehouse: WarehouseI;
}

const WarehouseCard = (props: props) => {
  const dispatch = useAppDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const { auth } = useAuth();
  const onSubmitAdd = async (data: WarehouseItemAddModalInputs) => {
    dispatch(
      addWarehouseItem({
        warehouseId: props.warehouse.id,
        name: data.name,
        amount: data.amount,
        userId: auth.currentUser!.uid,
      })
    );
  };
  return (
    <Card
      title={props.warehouse.name}
      actions={[
        <Button onClick={() => setShowAddModal(true)}>Add item</Button>,
      ]}
    >
      <List
        itemLayout="horizontal"
        dataSource={props.warehouse.items}
        renderItem={(warehouseItem, index) => (
          <WarehouseItem
            warehouseItem={warehouseItem}
            warehouse={props.warehouse}
          />
        )}
      />
      <WarehouseItemAddModal
        open={showAddModal}
        onSubmit={onSubmitAdd}
        close={() => setShowAddModal(false)}
        title={`Add new item with initial amount`}
      />
    </Card>
  );
};

export default WarehouseCard;
