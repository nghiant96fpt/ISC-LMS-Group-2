import React, { useEffect, useState } from 'react';
import './main.css';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import logo2 from '../../../assets/images/logo2.png';
import { useNavigate } from 'react-router';
import { ChevronLeftIcon, ShieldExclamationIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import createAxiosInstance from '../../../utils/axiosInstance';
import { useCookies } from 'react-cookie';
import Loading from '../../../components/Loading';

interface studentLoginProps {
  isLogin: boolean;
}

const Login: React.FC<studentLoginProps> = ({ isLogin }) => {
  const navigator = useNavigate();

  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm();

  const axiosInstance = createAxiosInstance(false);

  const [cookies, setCookies] = useCookies(['accessToken']);

  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const isValid = await trigger(['email', 'password']);
    if (isValid) {
      const data = getValues();
      try {
        const response = await axiosInstance.post('api/auth/login', data);
        const info = response.data?.data;
        setCookies('accessToken', info?.accessToken, { maxAge: 60 * 60 * 24 * 3 });
      } catch (error) {
        console.log('Lỗi !');
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="student-login-container">
      <Loading isLoading={isLoading}/>
      <img src={logo2} alt="logo" />
      <div className="w-full h-full flex justify-end items-center">
        <div className="login-box px-5">
          <p className="text-4xl font-bold">{isLogin ? 'Đăng Nhập' : 'Cấp lại mật khẩu'}</p>
          <div className="mt-10 w-5/6 text-start">
            <p className="mb-1 pb-0">Email</p>
            <Input
              icon={
                <div className="w-full h-full flex justify-center">
                  <UserCircleIcon className="w-full h-full p-3" />
                </div>
              }
              placeholder="Nhập email"
              {...register('email', { required: 'Email không được bỏ trống !' })}
              error={errors.email?.message as string}
            />
          </div>
          <div className="mt-5 w-5/6 text-start">
            {isLogin ? (
              <div>
                <p className="mb-1 pb-0">Mật khẩu</p>
                <Input
                  type="password"
                  icon={
                    <div className="w-full h-full flex justify-center">
                      <ShieldExclamationIcon className="w-full h-full p-3" />
                    </div>
                  }
                  placeholder="Nhập mật khẩu"
                  {...register('password', { required: 'Mật khẩu không được bỏ trống !' })}
                  error={errors.password?.message as string}
                />
              </div>
            ) : (
              <div>
                <p className="mb-1 pb-0">Mã xác nhận</p>
                <Input placeholder="Nhập mã xác nhận" />
              </div>
            )}
          </div>
          <p className="mt-5 text-end w-5/6 text-orange-text mb-5">
            {isLogin ? (
              <span>
                <button
                  onClick={() => {
                    navigator('/reset');
                  }}
                >
                  Quên mật khẩu?
                </button>
              </span>
            ) : (
              <span className="flex items-center justify-end">
                <div className="w-[20px] h-[20px]">
                  <ChevronLeftIcon />
                </div>
                <button
                  onClick={() => {
                    navigator('/login');
                  }}
                >{`Quay lại đăng nhập`}</button>
              </span>
            )}
          </p>
          <Button
            className="primary"
            style={{ fontWeight: 'bold' }}
            children={isLogin ? 'Đăng nhập' : 'Cấp lại mật khẩu'}
            onClick={isLogin ? handleLogin : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
