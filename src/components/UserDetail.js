import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Avatar, message, Input } from "antd";
// import Lottie from "react-lottie";
// import * as happyAnimation from "../assets/happy.json";  // 恭喜动画
// import * as sadAnimation from "../assets/sad.json";      // 伤心动画
import HappyAnimation from './HappyAnimation';  // 导入动画组件
import SadAnimation from './SadAnimation';     // 导入Sad动画组件

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
  const [showAnimation, setShowAnimation] = useState(false); // 控制动画显示
  const [showSadAnimation, setShowSadAnimation] = useState(false);     // 控制Sad动画显示
  const [inputValue, setInputValue] = useState('1'); // 输入框的值

  useEffect(() => {
    // 根据用户ID加载用户信息
    const fetchedUser = users.find((user) => user.id === parseInt(userId));
    if (fetchedUser) {
      setUser(fetchedUser);
      setScore(fetchedUser.score);
    }
  }, [userId]);

  const handleAddScore = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
        setScore((prevScore) => prevScore + number);
        message.success("恭喜你，积分增加！");

        // 播放恭喜的动画
        setShowAnimation(true); // 显示动画
    } else {
        message.success("积分无效，请输入一个数字");
    }
  };

  const handleReduceScore = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
        setScore((prevScore) => prevScore - number);
        message.error("哎呀，积分减少了...");

        // 播放伤心的动画
        setShowSadAnimation(true);    // 显示Sad动画
    } else {
        message.success("积分无效，请输入一个数字");
    }
  };

  const handleAnimationComplete = () => {
    // 动画播放完成后隐藏
    setShowAnimation(false);
  };

  const handleSadAnimationComplete = () => {
    setShowSadAnimation(false);    // 隐藏Sad动画
  };

  // 限制输入框只能输入数字
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 只允许输入数字
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  if (!user) return null;  // 如果没有用户数据，则不显示

  return (
    <div style={{ textAlign: "center" }}>
      <Avatar size={100} src={user.avatar} />
      <h2>{user.name}</h2>
      <p>积分: {score}</p>

      {/* 显示Happy动画 */}
      {showAnimation && <HappyAnimation onComplete={handleAnimationComplete} />}
      {/* 显示Sad动画 */}
      {showSadAnimation && <SadAnimation onComplete={handleSadAnimationComplete} />}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* 输入框 */}
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入数字"
          style={{ width: 200, marginBottom: '20px' }}
        />
        <div>
          <Button type="primary" onClick={handleAddScore} style={{ marginRight: '10px' }}>
            + 积分
          </Button>
          <Button type="default" onClick={handleReduceScore}>
            - 积分
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
