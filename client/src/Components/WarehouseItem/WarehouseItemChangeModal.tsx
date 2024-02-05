import React, { useState } from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TEInput } from "tw-elements-react";
import { WarehouseItemI } from "../../Interfaces/Warehouse/warehouse";

type WarehouseItemModalFormInputs = {
  amount: string;
};

export type WarehouseItemChangeModalInputs = {
  amount: number;
};

interface props {
  onSubmit: (data: WarehouseItemChangeModalInputs) => Promise<void>;
  open: boolean;
  close: () => void;
  title: string;
  label: string;
}

const WarehouseItemChangeModal = (props: props) => {
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
    await props.onSubmit({ amount: parseInt(data.amount) });
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
            {...register("amount", { required: true })}
            type="number"
            label={props.label}
            size="lg"
            className="mb-6"
          ></TEInput>
        </Modal>
      </form>
    </>
  );
};

export default WarehouseItemChangeModal;
