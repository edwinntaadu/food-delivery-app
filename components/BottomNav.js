import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiHome2Line } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import Link from 'next/link';

// Styled component for the floating navigation bar
const Nav = styled.nav`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: ${({ transparent }) => (transparent ? 'rgba(0, 0, 0, 0.5)' : '#000')}; 
  transition: background-color 0.3s ease; /* Smooth transition for background */
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3); 
  z-index: 1000;
`;

const IconHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #404040;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const Text = styled.p`
  color: #e6e6e6;
  font-size: 16px;
  margin-inline: 10px;
`;

const BottomNav = () => {
  const [isTransparent, setIsTransparent] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Nav transparent={isTransparent}>
      {/* Home Icon */}
      <Link href="/home" passHref>
        <IconHolder>
          <RiHome2Line color='#e6e6e6' size={24} />
          <Text>Home</Text>
        </IconHolder>
      </Link>

      {/* Wallet Icon */}
      <Link href="/wallet" passHref>
        <CiWallet color='#e6e6e6' size={18} />
      </Link>

      {/* Message Icon */}
      <Link href="/messages" passHref>
        <FiMessageSquare color='#e6e6e6' size={18} />
      </Link>

      {/* Account Icon */}
      <Link href="/account" passHref>
        <VscAccount color='#e6e6e6' size={18} />
      </Link>
    </Nav>
  );
};

export default BottomNav;
