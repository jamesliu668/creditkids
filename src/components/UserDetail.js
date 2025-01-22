import React, { useState, useEffect } from "react";
import { Button, Avatar, message, Input, notification } from "antd";
import axios from 'axios'; // 导入axios
import HappyAnimation from './HappyAnimation';  // 导入动画组件
import SadAnimation from './SadAnimation';     // 导入Sad动画组件

// // 假设的用户数据
// const users = [
//   { id: 1, name: "张三", score: 5, avatar: "/path/to/avatar1.jpg" },
//   { id: 2, name: "李四", score: 3, avatar: "/path/to/avatar2.jpg" },
//   // 可以继续添加用户
// ];

const UserDetail = () => {
  const [userData, setUserData] = useState(null); // 用来存储用户数据
  const [showAnimation, setShowAnimation] = useState(false); // 控制动画显示
  const [showSadAnimation, setShowSadAnimation] = useState(false);     // 控制Sad动画显示
  const [inputValue, setInputValue] = useState('1'); // 输入框的值

  // 获取用户数据
  useEffect(() => {
    // 发起 GET 请求，获取用户数据
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://a.com/score', {
          params: { userid: 1 }, // 假设userid为1
        });

        // 假设返回的数据结构是：
        // { userid: 1, name: "User Name", avatar: "https://example.com/avatar.jpg", score: 10 }
        setUserData(response.data); // 更新用户数据
      } catch (error) {
        notification.error({
          message: '获取用户数据失败',
          description: '无法从服务器加载用户数据，请稍后再试。',
          duration: 3,
        });

        setUserData({ userid: 1, name: "User Name", avatar: "https://example.com/avatar.jpg", score: 10 })
      }
    };

    fetchUserData(); // 组件加载时调用
  }, []);

  const handleAddScore = async () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
        // 更新本地积分
        const newScore = userData.score + number;
        setUserData((prevState) => ({ ...prevState, score: newScore }));
        // message.success("恭喜你，积分增加！");

        // 播放恭喜的动画
        setShowAnimation(true); // 显示动画


      // 调用API，发送积分信息
      try {
        const response = await axios.post('http://a.com/score', {
          userid: 1,   // 假设userid为1
          score: number, // 传递输入的积分
        });

        // 处理API成功响应
        notification.success({
          message: '积分更新成功',
          description: `得分 +${number}, API响应: ${response.data.message}`,
          duration: 3,
        });
      } catch (error) {
        // 处理API错误响应
        notification.error({
          message: 'API请求失败',
          description: '无法更新积分，请稍后再试。',
          duration: 3,
        });
      }



    } else {
        message.success("积分无效，请输入一个数字");
    }
  };

  const handleReduceScore = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
        const newScore = userData.score - number;
        setUserData((prevState) => ({ ...prevState, score: newScore }));
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

  if (!userData) return null;  // 如果没有用户数据，则不显示

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <Avatar size={100} src={userData.avatar} />
      <h2>{userData.name}</h2>
      <p>积分: {userData.score}</p>

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
