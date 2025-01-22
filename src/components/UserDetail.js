import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Avatar, message } from "antd";
import Lottie from "react-lottie";
import * as happyAnimation from "../assets/happy.json";  // 恭喜动画
import * as sadAnimation from "../assets/sad.json";      // 伤心动画

// 假设的用户数据
const users = [
  { id: 1, name: "张三", score: 5, avatar: "/path/to/avatar1.jpg" },
  { id: 2, name: "李四", score: 3, avatar: "/path/to/avatar2.jpg" },
  // 可以继续添加用户
];

const UserDetail = () => {
  const { userId } = useParams();  // 获取传递过来的用户ID
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // 根据用户ID加载用户信息
    const fetchedUser = users.find((user) => user.id === parseInt(userId));
    if (fetchedUser) {
      setUser(fetchedUser);
      setScore(fetchedUser.score);
    }
  }, [userId]);

  const handleAddScore = () => {
    setScore((prevScore) => prevScore + 1);
    message.success("恭喜你，积分增加！");

    // 播放恭喜的动画
  };

  const handleReduceScore = () => {
    setScore((prevScore) => prevScore - 1);
    message.error("哎呀，积分减少了...");

    // 播放伤心的动画
  };

  if (!user) return null;  // 如果没有用户数据，则不显示

  return (
    <div style={{ textAlign: "center" }}>
      <Avatar size={100} src={user.avatar} />
      <h2>{user.name}</h2>
      <p>积分: {score}</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleReduceScore}
          style={{ marginRight: "10px" }}
        >
          减积分
        </Button>
        <Button onClick={handleAddScore}>加积分</Button>
      </div>

      {/* 播放Lottie动画 */}
      <div style={{ marginTop: "20px" }}>
        <Lottie
          options={{
            animationData: score > 0 ? happyAnimation : sadAnimation,
            loop: true,
            autoplay: true,
          }}
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};

export default UserDetail;
