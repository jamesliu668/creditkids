import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Avatar, Button, Skeleton, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 使用 useNavigate 来跳转

const HomePage = () => {
  const [userList, setUserList] = useState([]); // 用户列表数据
  const [loading, setLoading] = useState(true); // 加载状态
  const navigate = useNavigate(); // 使用 useNavigate 代替 useHistory

  // 获取用户列表数据
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get('http://a.com/score'); // 假设 API 返回用户列表数据
        setUserList(response.data); // 更新用户数据
        setLoading(false); // 加载完成，更新加载状态
      } catch (error) {
        notification.error({
          message: '获取用户数据失败',
          description: '无法从服务器加载用户数据，请稍后再试。',
          duration: 3,
        });
        setLoading(false);
        setUserList([
            { userid: 1, name: "User Name", avatar: "https://example.com/avatar.jpg", score: 10 },
            { userid: 2, name: "User Name", avatar: "https://example.com/avatar.jpg", score: 10 }
        ])
      }
    };

    fetchUserList();
  }, []);

  // 点击用户头像跳转到用户详情页面
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div style={{ padding: '50px 20px', background: '#f0f2f5' }}>
      <Row gutter={[16, 16]} justify="center">
        {loading ? (
          // 加载过程中显示骨架屏
          Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Skeleton active />
            </Col>
          ))
        ) : (
          // 渲染用户列表
          userList.map((user) => (
            <Col key={user.userid} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{
                    width: '100%',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', // 内容居中
                  }}
                onClick={() => handleUserClick(user.userid)}
              >


                <Avatar size={120} src={user.avatar} style={{ marginBottom: '20px' }} />
                <Card.Meta
                  title={user.name}
                  description={`积分: ${user.score}`}
                />
                <Button
                  type="primary"
                  block
                  style={{
                    marginTop: '10px',
                    borderRadius: '5px',
                    background: '#1890ff',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '100%', // 按钮宽度撑满
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // 防止点击按钮时跳转
                    handleUserClick(user.userid);
                  }}
                >
                  查看详情
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default HomePage;
