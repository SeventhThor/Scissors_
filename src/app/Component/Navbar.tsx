'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import SnipLinkLogo from '../assets/SnipLink.png';

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: linear-gradient(135deg, #ffffff,#e8e8e8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #333;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  animation: ${bounce} 2s infinite;
`;

const Span = styled.span`
  color: #2d614b;
  font-weight: bold;
`;

const NavLinks = styled.div<{ isMobileMenuOpen: boolean }>`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${props => (props.isMobileMenuOpen ? 'flex' : 'none')};
    position: absolute;
    top: 80px;
    right: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    width: 250px;
    padding: 20px;
  }
`;

const NavLink = styled(Link)`
  font-size: 18px;
  border: transparent;
  padding: 8px;
  border-radius: 10px;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #fcfdfd;
    border: 2px solid #333;
    background-color: #333;
  }

  @media (max-width: 768px) {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    outline: none;
    text-align: center;
  }
`;

const ButtonLink = styled(Link)`
  background-color: #2d614b;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
`;

const HamburgerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 5px;
  }
`;

const Bar = styled.div<{ open: boolean; index: number }>`
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease;
  transform: ${({ open, index }) =>
    open
      ? index === 0
        ? 'rotate(45deg) translate(5px, 5px)'
        : index === 1
        ? 'translateX(100%)'
        : 'rotate(-45deg) translate(5px, -5px)'
      : 'none'};
  opacity: ${({ open, index }) => (open && index === 1 ? '0' : '1')};
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <NavbarContainer>
      <LogoContainer>
        <Logo>
          <Image src={SnipLinkLogo} alt="Sniplink Logo" width={50} height={50} />
          Snip<Span>Link</Span>
        </Logo>
      </LogoContainer>
      <HamburgerMenu onClick={toggleMobileMenu}>
        {[0, 1, 2].map(index => (
          <Bar key={index} open={isMobileMenuOpen} index={index} />
        ))}
      </HamburgerMenu>
      <NavLinks isMobileMenuOpen={isMobileMenuOpen}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/">About</NavLink>
        <NavLink href="/">Features</NavLink>
        <NavLink href="/">FAQs</NavLink>
        <NavLink href="/Login">Login</NavLink>
        <ButtonLink href="/SignUp">Signup</ButtonLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
