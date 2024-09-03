import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Nav = () => (
  <NavbarContainer>
    <Link href="/dishes">Dishes</Link>
    <Link href="/orders">My Orders</Link>
    <Link href="/account">Account</Link>
    <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
      My Cart
    </button>
  </NavbarContainer>
);

export default Nav;
