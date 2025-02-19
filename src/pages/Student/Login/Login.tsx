import React from 'react';
import './main.css';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import logo2 from '../../../assets/images/logo2.png';
import { useNavigate } from 'react-router';
import { ShieldKey, UserCircle } from './Icons';

interface studentLoginProps {
  isLogin: boolean; // true là đăng nhập, false là cấp lại mật khẩu
}

const Login: React.FC<studentLoginProps> = ({ isLogin }) => {
  const navigator = useNavigate();

  return (
    <div className="student-login-container">
      <img src={logo2} alt="logo" />
      <div className="w-full h-full flex justify-end items-center">
        <div className="login-box px-5">
          <p className="text-4xl font-bold">{isLogin ? 'Đăng Nhập' : 'Cấp lại mật khẩu'}</p>
          <div className="mt-10 w-5/6 text-start">
            <p className="mb-1">Tên đăng nhập</p>
            <Input icon={<UserCircle/>}/>
          </div>
          <div className="mt-5 w-5/6 text-start">
            {isLogin ? (
              <div>
                <p className="mb-1">Mật khẩu</p>
                <Input type="password" icon={<ShieldKey/>}/>
              </div>
            ) : (
              <div>
                <p className="mb-1">Mã xác nhận</p>
                <Input />
              </div>
            )}
          </div>
          <p className="mt-5 text-end w-5/6 text-orange-text mb-5">
            {isLogin ? (
              <span
                onClick={() => {
                  navigator('/student/reset');
                }}
              >
                Quên mật khẩu
              </span>
            ) : (
              <span
                className="flex items-center justify-end"
                onClick={() => {
                  navigator('/student');
                }}
              >
                Quay lại trang chủ
              </span>
            )}
          </p>
          <Button className="primary" style={{ fontWeight: 'bold' }} children={isLogin ? 'Đăng nhập' : 'Cấp lại mật khẩu'} />
        </div>
      </div>
    </div>
  );
};

export default Login;
