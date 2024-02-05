import React, { useState } from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TEInput } from "tw-elements-react";
import { WarehouseItemI } from "../../Interfaces/Warehouse/warehouse";

type WarehouseItemModalFormInputs = {
  name: string;
  amount: string;
};

export type WarehouseItemAddModalInputs = {
  name: string;
  amount: number;
};

interface props {
  onSubmit: (data: WarehouseItemAddModalInputs) => Promise<void>;
  open: boolean;
  close: () => void;
  title: string;
}

const WarehouseItemAddModal = (props: props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WarehouseItemModalFormInputs>();
  const onSubmit: SubmitHandler<WarehouseItemModalFormInputs> = async (
    data
  ) => {
    await props.onSubmit({ name: data.name, amount: parseInt(data.amount) });
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleSubmit(onSubmit)();
    setConfirmLoading(false);
    props.close();
  };

  const handleCancel = () => {
    props.close();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          title={props.title}
          open={props.open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{ type: "default" }}
        >
          <TEInput
            {...register("name", { required: true })}
            label="Name of the item"
            size="lg"
            className="mb-6"
          ></TEInput>
          <TEInput
            {...register("amount", { required: true })}
            type="number"
            label="Initial amount"
            size="lg"
            className="mb-6"
          ></TEInput>
        </Modal>
      </form>
    </>
  );
};

export default WarehouseItemAddModal;
