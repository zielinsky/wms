import React, { useEffect } from "react";
import { List } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/App/hooks";
import { fetchUsers } from "../../Store/Users/asynThunks";
import { selectStatus, selectUsers } from "../../Store/Users/userSlice";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectStatus);
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.email} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UsersPage;
