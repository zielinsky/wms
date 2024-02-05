import React, { useState } from "react";

import { List, Card, Button } from "antd";
import { WarehouseItemI } from "../../Interfaces/Warehouse/warehouse";
import WarehouseItemModal from "./WarehouseItemModal";

interface props {
  warehouseItem: WarehouseItemI;
}

const WarehouseItem = (props: props) => {
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [showPutModal, setShowPutModal] = useState(false);

  return (
    <List.Item>
      <List.Item.Meta
        title={props.warehouseItem.name}
        description={props.warehouseItem.amount}
      />
      <Button onClick={() => setShowTakeModal(true)}>Take</Button>
      <Button onClick={() => setShowPutModal(true)}>Put</Button>
      <WarehouseItemModal
        open={showTakeModal}
        onSubmit={async (data: any) => console.log(data)}
        close={() => setShowTakeModal(false)}
        title={`Amount of ${props.warehouseItem.name} to take out`}
        label="Amount to take"
      />
      <WarehouseItemModal
        open={showPutModal}
        onSubmit={async (data: any) => console.log(data)}
        close={() => setShowPutModal(false)}
        title={`Amount of ${props.warehouseItem.name} to put in`}
        label="Amount to put"
      />
    </List.Item>
  );
};

export default WarehouseItem;
