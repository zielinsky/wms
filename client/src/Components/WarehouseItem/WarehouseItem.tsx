import React, { useState } from "react";

import { List, Card, Button } from "antd";
import {
  WarehouseI,
  WarehouseItemI,
} from "../../Interfaces/Warehouse/warehouse";
import WarehouseItemChangeModal, {
  WarehouseItemChangeModalInputs,
} from "./WarehouseItemChangeModal";
import { useAppDispatch } from "../../Store/App/hooks";
import {
  deleteWarehouseItem,
  updateWarehouseItemAmount,
} from "../../Store/asyncThunks";
import WarehouseItemDeleteModal from "./WarehouseItemDeleteModal";
import { useAuth } from "../../Hooks/useAuth";

interface props {
  warehouse: WarehouseI;
  warehouseItem: WarehouseItemI;
}

const WarehouseItem = (props: props) => {
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [showPutModal, setShowPutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useAppDispatch();
  const { auth } = useAuth();

  const onSubmitTake = async (data: WarehouseItemChangeModalInputs) => {
    if (props.warehouseItem.amount - data.amount >= 0) {
      dispatch(
        updateWarehouseItemAmount({
          warehouseId: props.warehouse.id,
          itemId: props.warehouseItem.id,
          delta: -data.amount,
          currAmount: props.warehouseItem.amount,
          userId: auth.currentUser!.uid,
        })
      );
    }
  };

  const onSubmitPut = async (data: WarehouseItemChangeModalInputs) => {
    dispatch(
      updateWarehouseItemAmount({
        warehouseId: props.warehouse.id,
        itemId: props.warehouseItem.id,
        delta: data.amount,
        currAmount: props.warehouseItem.amount,
        userId: auth.currentUser!.uid,
      })
    );
  };

  const onSubmitDelete = async () => {
    dispatch(
      deleteWarehouseItem({
        warehouseId: props.warehouse.id,
        itemId: props.warehouseItem.id,
        userId: auth.currentUser!.uid,
      })
    );
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={props.warehouseItem.name}
        description={props.warehouseItem.amount}
      />
      <Button onClick={() => setShowTakeModal(true)}>Take</Button>
      <Button onClick={() => setShowPutModal(true)}>Put</Button>
      <Button onClick={() => setShowDeleteModal(true)}>Delete</Button>
      <WarehouseItemChangeModal
        open={showTakeModal}
        onSubmit={onSubmitTake}
        close={() => setShowTakeModal(false)}
        title={`Amount of ${props.warehouseItem.name} to take out`}
        label="Amount to take"
      />
      <WarehouseItemChangeModal
        open={showPutModal}
        onSubmit={onSubmitPut}
        close={() => setShowPutModal(false)}
        title={`Amount of ${props.warehouseItem.name} to put in`}
        label="Amount to put"
      />
      <WarehouseItemDeleteModal
        open={showDeleteModal}
        onSubmit={onSubmitDelete}
        close={() => setShowDeleteModal(false)}
        title={`Are you sure you want to remove ${props.warehouseItem.name} from ${props.warehouse.name}?`}
      />
    </List.Item>
  );
};

export default WarehouseItem;
