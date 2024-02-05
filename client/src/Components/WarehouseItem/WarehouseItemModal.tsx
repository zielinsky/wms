import React, { useState } from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TEInput } from "tw-elements-react";

type Inputs = {
  amount: number;
};

interface props {
  onSubmit: (data: any) => Promise<void>;
  open: boolean;
  close: () => void;
  title: string;
  label: string;
}

const WarehouseItemModal = (props: props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await props.onSubmit(data);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleSubmit(onSubmit)();
    setConfirmLoading(false);
    props.close();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
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

export default WarehouseItemModal;
