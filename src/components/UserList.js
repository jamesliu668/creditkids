import React from "react";
import { useNavigate } from "react-router-dom";
import { List, Avatar } from "antd";

// 假设的用户数据
const users = [
  { id: 1, name: "张三", score: 5, avatar: "../assets/henry.json" },
  { id: 2, name: "李四", score: 3, avatar: "../assets/thomas.json" },
  // 可以继续添加用户
];

const UserList = () => {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/user/${userId}`);  // Use navigate instead of history.push
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item onClick={() => handleClick(user.id)}>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} />}
            title={user.name}
            description={`积分: ${user.score}`}
          />
        </List.Item>
      )}
    />
  );
};

export default UserList;
