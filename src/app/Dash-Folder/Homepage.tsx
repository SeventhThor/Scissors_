'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Features from '@/app/Dash-Folder/Features';
import Image from 'next/image';
import logo from '../assets/SniplinkLogo.png';

// Keyframe animation
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #fff;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #333;
  animation: ${bounce} 2s infinite;
`;

const Span = styled.span`
  color: #2d614b;
  font-weight: bold;
`;

const WelcomeMessage = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 1rem;
`;
const DescriptionText = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s ease-out;
  color: #2c3e50; // adjust to your preferred color

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Homepage = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo>
          <Image src={logo} alt="Sniplink Logo" width={50} height={50} />
          Snip<Span>Link</Span>
        </Logo>
      </LogoContainer>
      <WelcomeMessage>Welcome to Sniplink Dashboard</WelcomeMessage>
      <DescriptionText>
      Our URL shortener allows you to effortlessly condense long web addresses into short, easy-to-share links. Customize your shortened URLs with an alias for better branding or memorability. Generate QR codes for instant access to your shortened links. Keep track of your URLs in one convenient place, and share them confidently across platforms with just a few clicks.
    </DescriptionText>
      <Features />
    </Container>
  );
};

export default Homepage;
