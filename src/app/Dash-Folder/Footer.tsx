'use client';

import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #fff; /* Your primary color */
  color:#2d614b;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
`;

 const FooterText = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 16px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color:#2d614b;
    font-size: 18px;
    transition: color 0.3s ease;

    &:hover {
      color: #15e3f6; /* Accent color */
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Scissor. All rights reserved.</FooterText>
      <SocialIcons>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
