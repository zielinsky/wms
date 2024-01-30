import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <div className="flex justify-center align-middle">
      <div className="flex flex-col justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
      </div>
    </div>
  );
};

export default Spinner;
