import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Account } from '@/redux/authSaga';
import { authApi } from '@/api/auth.api';
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/utils/storage';
import { toast } from 'sonner';
import { Button, Form, Input, Typography } from 'antd';
import { FieldType } from '@/types/general.type';
const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (data: Account) => authApi.login(data),
  });

  const onSubmit = async (data: Account) => {
    setIsLoading(true);
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setAccessTokenToLS(data.access);
        setRefreshTokenToLS(data.refresh);
        navigate('/');
        toast.success('Login successfully!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='p-10 space-y-6 border rounded w-[30rem] shadow-md'
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete='off'
        onFinish={onSubmit}
      >
        <Text className='flex justify-center mx-auto text-3xl font-bold'>
          Login
        </Text>
        <Form.Item<FieldType>
          label='Email'
          name='email'
          className='mr-20'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input className='w-72' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          className='mr-20'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='w-72' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            loading={isLoading}
            type='primary'
            htmlType='submit'
            className='flex ml-auto'
          >
            Submit
          </Button>
        </Form.Item>

        <p className='font-medium'>
          Don’t have an account yet?{' '}
          <Link
            to='/register'
            className='text-blue-600 underline cursor-pointer'
          >
            Create account
          </Link>
        </p>
      </Form>
    </div>
  );
}
