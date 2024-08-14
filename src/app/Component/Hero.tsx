// src/app/components/Hero.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeroBackground from '../assets/HeroBg.jpg';
import Link from 'next/link';

const Container = styled.section`
  position: relative;  // Ensure container is positioned relatively
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #ffffff;
  text-align: center;
  overflow: hidden;
`;
const HeroBackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;  // Ensure this section is on top of the image
  position: relative;
`;

const HeroTitle = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  color: #2d614b;
  text-shadow: 1px 1px 2px black;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #fff;
  margin-bottom: 40px;
  text-shadow: 1px 1px 2px black;
`;

const GetStartedButton = styled.button`
  background-color: #2d614b;
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #05453d;
  }
`;

const Hero = () => {
  const router = useRouter();

  return (
        <Container>
   <HeroBackgroundImage src={HeroBackground} alt="Hero Background" fill priority />
      <HeroSection>
        <HeroTitle>Shorten Your URLs with SnipLink Instantly.</HeroTitle>
        <HeroSubtitle>Make your links more manageable and shareable</HeroSubtitle>
        <Link href='/Login'>
          <GetStartedButton>Get Started</GetStartedButton>
        </Link>
      </HeroSection>
    </Container>
  );
};

export default Hero;
