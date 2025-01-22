import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import sadAnimation from '../assets/sad.json';  // 导入sad动画文件

const SadAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const options = {
    loop: false,
    autoplay: true, // 播放一次
    animationData: sadAnimation,  // 这里引入的是sad动画的 JSON 文件
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    // 在动画播放完成后，调用onComplete，并隐藏动画
    const timeout = setTimeout(() => {
      onComplete();
      setIsVisible(false);  // 隐藏动画
    }, 3000); // 假设动画持续时间为 3秒

    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!isVisible) return null; // 如果动画结束，返回 null，不渲染组件

  return <Lottie options={options} height={200} width={200} />;
};

export default SadAnimation;
