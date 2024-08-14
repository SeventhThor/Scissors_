'use client';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Aboutlogo from '../assets/AboutLogo.png' ; // Adjust the path to your actual image file

// Slide-in keyframe animations
const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AboutContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  @media (max-width: 425px) {
    width: 100%;
    
  }
`;

const TextContainer = styled.div<{ animate: boolean }>`
  flex: 1;
  margin-right: 20px;
  opacity: 0;
  transform: translateX(-100px);
  animation: ${({ animate }) => (animate ? slideInLeft : 'none')} 1s ease forwards;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    transform: translateX(0);
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #2d614b;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
`;

const LogoContainer = styled.div<{ animate: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(100px);
  animation: ${({ animate }) => (animate ? slideInRight : 'none')} 1s ease forwards;

  @media (max-width: 768px) {
    transform: translateX(0);
  }
`;

const About = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }
    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (logoRef.current) observer.unobserve(logoRef.current);
    };
  }, []);

  return (
    <AboutContainer>
      <TextContainer ref={textRef} animate={animate}>
        <Heading>Why SnipLink</Heading>
        <Paragraph>
          SnipLink is an advanced URL shortening service that makes it easy to share concise links.
          With SnipLink, you can shorten long URLs, track link performance, and manage your links
          in a user-friendly dashboard. Our service is designed to help you maximize your online
          presence and make link sharing more efficient.
        </Paragraph>
      </TextContainer>
      <LogoContainer ref={logoRef} animate={animate}>
        <Image src={Aboutlogo} alt="About Logo" width={500} height={500} />
      </LogoContainer>
    </AboutContainer>
  );
};

export default About;
