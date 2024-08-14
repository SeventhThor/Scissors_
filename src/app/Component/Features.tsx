'use client';

import React from 'react';
import styled from 'styled-components';
import { FaLink, FaQrcode } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { BiBarChartAlt } from 'react-icons/bi';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  /* background: linear-gradient(135deg, #7acaff,#2d614b);
  margin-top: 1rem; */
  padding: 0 2rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  max-width: 1200px;
`;

const Box = styled.div`
  flex: 1 1 45%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: translateY(-10px);
    background-color: #d0d1d6;
    color: #fff;
  }

  @media (min-width: 768px) {
    flex: 1 1 45%;
  }
/* 
  @media (min-width: 1024px) {
    flex: 1 1 45%;
  } */
`;

const BoxIcon = styled.div`
  font-size: 40px;
  font-weight: 400;
  color: #343e5a;
  margin: 10px 0;
`;

const BoxTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const BoxDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black; /* Maintain the text color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #1e6e1e; /* Optional: Add a hover effect */
  }
`; 

const FeatureBoxes = () => {
  return (
    <Container>
      <Title>Features</Title>
      <FeatureList>
        <Box>
          <Link href="/UrlShortener" legacyBehavior>
            <StyledLink>
              <BoxIcon><FaLink /></BoxIcon>
              <BoxTitle>Shorten Links</BoxTitle>
              <BoxDescription>Shorten your URLs to make them easy to share.</BoxDescription>
            </StyledLink>
          </Link>
        </Box>

        <Box>
          <Link href="/CustomUrl" legacyBehavior>
            <StyledLink>
              <BoxIcon><FaWandMagicSparkles /></BoxIcon>
              <BoxTitle>Custom URLs</BoxTitle>
              <BoxDescription>Create custom, branded URLs for your links.</BoxDescription>
            </StyledLink>
          </Link>
        </Box>

        <Box>
          <Link href="/QRcode" legacyBehavior>
            <StyledLink>
              <BoxIcon><FaQrcode /></BoxIcon>
              <BoxTitle>Generate QR Codes</BoxTitle>
              <BoxDescription>Create QR codes for your shortened links easily.</BoxDescription>
            </StyledLink>
          </Link>
        </Box>

        <Box>
          <Link href="/Analytics" legacyBehavior>
            <StyledLink>
              <BoxIcon><BiBarChartAlt /></BoxIcon>
              <BoxTitle>Track Analytics</BoxTitle>
              <BoxDescription>Monitor the performance of your links with <br /> detailed analytics.</BoxDescription>
            </StyledLink>
          </Link>
        </Box>
      </FeatureList>
    </Container>
  );
};

export default FeatureBoxes;
