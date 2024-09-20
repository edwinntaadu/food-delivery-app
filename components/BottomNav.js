import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiHome2Line } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import Link from 'next/link';
import { useRouter } from 'next/router';

// Styled component for the floating navigation bar
const Nav = styled.nav`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background-color: ${({ transparent }) => (transparent ? 'rgba(0, 0, 0, 0.5)' : '#000')}; 
  transition: background-color 0.3s ease; 
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3); 
  z-index: 1000;

  @media (max-width: 768px) {
    width: 95%;
    padding: 8px 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    bottom: 0;
    border-radius: 0;
  }
`;

const IconHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #606060;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Prevent underline */
`;

const Text = styled.p`
  color: #e6e6e6;
  font-size: 16px;
  margin-inline: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-inline: 8px;
  }

  @media (max-width: 480px) {
    display: none; /* Hide text on very small screens */
  }
`;

const BottomNav = () => {
  const [isTransparent, setIsTransparent] = useState(false);
  const router = useRouter();

  // Automatically select the correct icon based on the current route
  const getSelectedIcon = () => {
    if (router.pathname === '/home') return 'home';
    if (router.pathname === '/wallet') return 'wallet';
    if (router.pathname === '/messages') return 'messages';
    if (router.pathname === '/account') return 'account';
    return 'home';  // Default
  };

  const [selectedIcon, setSelectedIcon] = useState(getSelectedIcon());

  useEffect(() => {
    setSelectedIcon(getSelectedIcon());
  }, [router.pathname]);

  // Handle scroll to make the nav transparent
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav transparent={isTransparent}>
      {/* Home Icon */}
      <StyledLink href="/home" passHref>
        {selectedIcon === 'home' ? (
          <IconHolder onClick={() => setSelectedIcon('home')}>
            <RiHome2Line color='#e6e6e6' size={24} />
            <Text>Home</Text>
          </IconHolder>
        ) : (
          <FlexContainer onClick={() => setSelectedIcon('home')}>
            <RiHome2Line color='#e6e6e6' size={24} />
            <Text>Home</Text>
          </FlexContainer>
        )}
      </StyledLink>

      {/* Wallet Icon */}
      <StyledLink href="/wallet" passHref>
        {selectedIcon === 'wallet' ? (
          <IconHolder onClick={() => setSelectedIcon('wallet')}>
            <CiWallet color='#e6e6e6' size={18} />
            <Text>Wallet</Text>
          </IconHolder>
        ) : (
          <FlexContainer onClick={() => setSelectedIcon('wallet')}>
            <CiWallet color='#e6e6e6' size={18} />
            <Text>Wallet</Text>
          </FlexContainer>
        )}
      </StyledLink>

      {/* Message Icon */}
      <StyledLink href="/messages" passHref>
        {selectedIcon === 'messages' ? (
          <IconHolder onClick={() => setSelectedIcon('messages')}>
            <FiMessageSquare color='#e6e6e6' size={18} />
            <Text>Messages</Text>
          </IconHolder>
        ) : (
          <FlexContainer onClick={() => setSelectedIcon('messages')}>
            <FiMessageSquare color='#e6e6e6' size={18} />
            <Text>Messages</Text>
          </FlexContainer>
        )}
      </StyledLink>

      {/* Account Icon */}
      <StyledLink href="/account" passHref>
        {selectedIcon === 'account' ? (
          <IconHolder onClick={() => setSelectedIcon('account')}>
            <VscAccount color='#e6e6e6' size={18} />
            <Text>Account</Text>
          </IconHolder>
        ) : (
          <FlexContainer onClick={() => setSelectedIcon('account')}>
            <VscAccount color='#e6e6e6' size={18} />
            <Text>Account</Text>
          </FlexContainer>
        )}
      </StyledLink>
    </Nav>
  );
};

export default BottomNav;
