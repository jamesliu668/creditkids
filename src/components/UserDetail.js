import React, { useState, useEffect } from "react";
import { Button, Avatar, message, notification, Input, Row, Col, Card, Spin } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
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
  const [showHappyAnimation, setShowHappyAnimation] = useState(false); // 控制Happy动画显示
  const [showSadAnimation, setShowSadAnimation] = useState(false);     // 控制Sad动画显示
  const [inputValue, setInputValue] = useState('1'); // 输入框的值
  const [isActionInProgress, setIsActionInProgress] = useState(false); // 控制按钮和输入框的显示与隐藏


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
        setShowHappyAnimation(true);  // 显示Happy动画
        setIsActionInProgress(true);  // 隐藏按钮和输入框


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

  const handleRemoveScore = async () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
        const newScore = userData.score - number;
        setUserData((prevState) => ({ ...prevState, score: newScore }));
        message.error("哎呀，积分减少了...");

        // 播放伤心的动画
        setShowSadAnimation(true);    // 显示Sad动画
        setIsActionInProgress(true);  // 隐藏按钮和输入框

      // 调用API，发送积分信息
      try {
        const response = await axios.post('http://a.com/score', {
          userid: 1,   // 假设userid为1
          score: number, // 传递输入的积分
        });

        // 处理API成功响应
        notification.success({
          message: '积分更新成功',
          description: `扣分 +${number}, API响应: ${response.data.message}`,
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

  const handleHappyAnimationComplete = () => {
    // 动画播放完成后隐藏
    setShowHappyAnimation(false);
    setIsActionInProgress(false);  // 显示按钮和输入框
  };

  const handleSadAnimationComplete = () => {
    setShowSadAnimation(false);    // 隐藏Sad动画
    setIsActionInProgress(false);  // 显示按钮和输入框
  };

  // 限制输入框只能输入数字
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 只允许输入数字
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  // 如果没有获取到用户数据，显示加载状态
  if (!userData) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ background: '#f0f2f5', padding: '50px 20px', minHeight: '100vh' }}>
      <Row justify="center" gutter={24}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card
            hoverable
            style={{
              background: '#ffffff',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Avatar size={120} src={userData.avatar} style={{ marginBottom: '20px' }} />
            <h2>{userData.name}</h2>
            <p style={{ fontSize: '18px', color: '#1890ff' }}>积分: {userData.score}</p>

            {/* 显示Happy动画 */}
            {showHappyAnimation && <HappyAnimation onComplete={handleHappyAnimationComplete} />}

            {/* 显示Sad动画 */}
            {showSadAnimation && <SadAnimation onComplete={handleSadAnimationComplete} />}

              {/* 如果操作正在进行，则不显示输入框和按钮 */}
              {!isActionInProgress && (
            <div style={{ marginTop: '20px' }}>
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="请输入数字"
                style={{
                  width: '100px',
                  marginBottom: '20px',
                  fontSize: '16px',
                  textAlign: 'center',
                  borderRadius: '5px',
                  borderColor: '#1890ff',
                }}
              />
              <div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddScore}
                  style={{
                    marginRight: '10px',
                    width: '120px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    padding: '10px',
                  }}
                >
                  加积分
                </Button>
                <Button
                  type="default"
                  icon={<MinusOutlined />}
                  onClick={handleRemoveScore}
                  style={{
                    width: '120px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    padding: '10px',
                  }}
                >
                  减积分
                </Button>
              </div>
            </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
