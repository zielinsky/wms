import React, { useState } from "react";
import { Modal } from "antd";

interface props {
  onSubmit: () => Promise<void>;
  open: boolean;
  close: () => void;
  title: string;
}

const WarehouseItemDeleteModal = (props: props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await props.onSubmit();
    setConfirmLoading(false);
    props.close();
  };

  const handleCancel = () => {
    props.close();
  };

  return (
    <>
      <Modal
        title={props.title}
        open={props.open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ type: "default" }}
      ></Modal>
    </>
  );
};

export default WarehouseItemDeleteModal;
