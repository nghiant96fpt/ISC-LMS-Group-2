import React, { useContext, useEffect, useState } from 'react';
import './main.css';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import logo2 from '../../../assets/images/logo2.png';
import { Navigate, useNavigate } from 'react-router';
import { ChevronLeftIcon, ShieldExclamationIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import createAxiosInstance from '../../../utils/axiosInstance';
import { useCookies } from 'react-cookie';
import Loading from '../../../components/Loading';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

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
    setError,
    clearErrors
  } = useForm();

  const axiosInstance = createAxiosInstance(false);

  const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken']);

  const [isLoading, setLoading] = useState(false);

  const [info, setInfo] = useState<{ user: any }>({ user: '' });

  const { setRole } = useContext(AuthContext);

  const handleLogin = async () => {
    clearErrors('loginFailed');
    setLoading(true);
    const isValid = await trigger(['email', 'password']);
    if (!isValid) {
      setLoading(false);
      return;
    }
    const data = getValues();
    try {
      const response = await axiosInstance.post('api/auth/login', data);
      const info = response.data?.data; // lưu thông tin vào biến info
      setInfo(info);
      setCookies('accessToken', info?.accessToken, { maxAge: 60 * 15 });
      setCookies('refreshToken', info?.refreshToken, { maxAge: 60 * 60 * 10 });

      // Xử lý role ngay ở đây
      if (info?.user?.role === 'ADMIN') {
        setRole(1);
        navigator('/leadership');
      } else if (info?.user?.role === 'TEACHER') {
        setRole(2);
        navigator('/teacher');
      } else if (info?.user?.role === 'STUDENT') {
        setRole(3);
        navigator('/student');
      } else {
        navigator('/login');
      }
    } catch (error) {
      toast.error('Đăng nhập không thành công !');
      setError('loginFailed', {message: 'Tài khoản hoặc mật khẩu không đúng !'});
      console.log('Lỗi khi đăng nhập!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-login-container">
      <Loading isLoading={isLoading} />
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
          {errors && <p className="pb-0 w-5/6 text-red-500 text-sm mt-1 font-bold">{errors?.loginFailed?.message as string}</p>}
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
