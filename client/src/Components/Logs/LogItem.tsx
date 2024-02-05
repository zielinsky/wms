import { List } from "antd";
import { LogI } from "../../Interfaces/Logs/log";

interface props {
  log: LogI;
}

const LogItem = ({ log }: props) => {
  return (
    <List.Item>
      <List.Item.Meta
        title={`${log.itemName}`}
        description={`${log.type} ${log.prevAmount} -> ${log.currAmount}`}
      />
    </List.Item>
  );
};

export default LogItem;
