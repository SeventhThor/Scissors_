// src/app/components/ContactUs.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaEnvelope, FaLinkedin } from 'react-icons/fa';

const ContactSection = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const ContactHeading = styled.h3`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const IconLink = styled.a`
  font-size: 24px;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #1d4ed8;
  }
`;

const ContactUs = () => {
  return (
    <ContactSection>
      <ContactHeading>Contact Us</ContactHeading>
      <SocialIcons>
        <IconLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </IconLink>
        <IconLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </IconLink>
        <IconLink href="mailto:example@example.com">
          <FaEnvelope />
        </IconLink>
        <IconLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </IconLink>
      </SocialIcons>
    </ContactSection>
  );
};

export default ContactUs;
