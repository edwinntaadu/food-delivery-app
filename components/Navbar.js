import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { BsBasket } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Nav = () => (
  <NavbarContainer>

    <div style={{width: 50, height: 50, borderRadius:10, backgroundColor:"#fff", display:"flex",
      justifyContent:"center", alignItems:"center"
    }}>
      <GiHamburgerMenu color='#000' fontSize={32}/>
    </div>
 

    <div style={{width: 50, height: 50, borderRadius:10, backgroundColor:"#000", display:"flex",
      justifyContent:"center", alignItems:"center"
    }}>
      <BsBasket color='#fff' fontSize={24}/>
    </div>
  </NavbarContainer>
);

export default Nav;
