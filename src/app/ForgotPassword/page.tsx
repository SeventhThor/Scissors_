'use client';

import React, { useState, FormEvent } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/Firebase/firebase'; // Update this path as needed
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #7acaff, #032128); 
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background: linear-gradient(135deg, #032128, #7acaff); 
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #000000;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 17px;
  color: #000000;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const ButtonPrimary = styled.button`
  background-color:#2d614b;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover{
    background-color: #193f2f;
  }
`;

const Message = styled.p`
  color: green;
  font-size: 16px;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  margin-top: 20px;
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        router.push('/Login'); // Redirect to login page after 5 seconds
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Reset Password</Title>
        <Form onSubmit={handleResetPassword}>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>
          {message && <Message>{message}</Message>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonPrimary type="submit">Send Reset Email</ButtonPrimary>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ForgotPasswordPage;
