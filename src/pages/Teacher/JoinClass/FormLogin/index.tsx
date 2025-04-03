import React, { useState } from 'react';
import styles from './Login.module.scss';
import Button from '../../../../components/Button';
import IconImages from '../../../../components/IconImages';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('user', JSON.stringify({ username }));
      onLogin();
    } else {
      alert('Sai thông tin đăng nhập!');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>Tham gia lớp học</h2>
        <input type="text" placeholder="Mã tham gia" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <img src={IconImages.OrangeEyeOutline} alt="Hiện/Ẩn mật khẩu" className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)} />
        </div>
        <div className={styles.buttonGroup}>
          <Button
            children="Hủy"
            className="secondary"
            size="mini"
            width="100px"
            height="38px"
            style={{ color: 'white', fontWeight: '600' }}
            onClick={handleCancel}
          />
          <Button
            children="Tham gia"
            className="primary"
            size="mini"
            width="100px"
            height="38px"
            style={{ color: 'white', fontWeight: '600' }}
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
