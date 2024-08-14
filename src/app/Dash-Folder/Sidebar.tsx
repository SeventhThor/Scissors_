'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { 
  FaHome, FaLink, FaQrcode, FaChartBar, 
  FaEnvelope, FaSignOutAlt, FaCog, FaBars, FaTimes 
} from 'react-icons/fa';
import { auth } from '@/app/Firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  height: 100%;
  background: linear-gradient(to bottom, #d3b99f, #09464b);
  overflow-x: hidden;
  transition: 0.3s;
  color: #fff;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ isOpen }) => (isOpen ? '20px' : '100px')};
  gap: 1rem;
  padding: 1rem 0;
  flex-grow: 1;
`;

const ToggleButton = styled.div<{ isOpen: boolean }>`
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  position: absolute;
  top: 20px;
  right: ${({ isOpen }) => (isOpen ? '20px' : '10px')};
  transition: right 0.3s;
`;
const Tooltip = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s;
  z-index: -10;
  visibility: visible;
`;

const SidebarLink = styled(Link)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  width: 100%;
  justify-content: ${({ isOpen }) => (isOpen ? 'flex-start' : 'center')};
  padding: ${({ isOpen }) => (isOpen ? '10px 20px' : '10px 0')};
  position: relative;

  &:hover {
    color: #f1f1f1;
  }

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;
const ProfileContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top:1rem;
  margin-top: 20px;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-size: 20px;
  color: #fff;
  margin-bottom: -0.75rem;
`;

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: #fff;
`;

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/'); // Navigate to the landing page
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </ToggleButton>
        <ProfileContainer isOpen={isOpen}>
          {user && (
            <>
              <ProfileImage src={user.photoURL || '/default-profile.png'} alt="Profile" />
              <ProfileName>{user.displayName || user.email}</ProfileName>
            </>
          )}
        </ProfileContainer>
        <SidebarContent isOpen={isOpen}>
          <Divider />
          <SidebarLink href="/Dashboard" isOpen={isOpen}>
            <FaHome /> {isOpen ? 'Home' : <Tooltip> Home </Tooltip>}
          </SidebarLink>

          <SidebarLink href="/UrlShortener" isOpen={isOpen}>
            <FaLink /> {isOpen ? 'Url Shortener' : <Tooltip> Custom URLs </Tooltip>}
          </SidebarLink>

          <SidebarLink href="/Analytics" isOpen={isOpen}>
            <FaChartBar /> {isOpen ? 'Analytics' : <Tooltip>Analytics</Tooltip>}
          </SidebarLink>

          <SidebarLink href="/ContactUs" isOpen={isOpen}>
            <FaEnvelope /> {isOpen ? 'Contact us' : <Tooltip> Contact us </Tooltip> }
          </SidebarLink>

          <SidebarLink href="#" onClick={handleSignOut} isOpen={isOpen}>
            <FaSignOutAlt /> {isOpen ? 'Sign Out' : <Tooltip> Sign Out </Tooltip>}
          </SidebarLink>
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default DashboardSidebar;
