import React from 'react';
import styled from 'styled-components';
import { FaHome, FaListAlt, FaUserAlt } from 'react-icons/fa';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const BottomNav = () => (
  <Nav>
    <FaHome />
    <FaListAlt />
    <FaUserAlt />
  </Nav>
);

export default BottomNav;
