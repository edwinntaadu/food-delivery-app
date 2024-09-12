import React from 'react';
import styled from 'styled-components';
import { FaHome, FaListAlt, FaUserAlt } from 'react-icons/fa';
import { RiHome2Line } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";


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

const style = {
  navCont:{
    
  }
}

const BottomNav = () => (
  <div style={{
    backgroundColor:"#000",
    marginInline:10,
    height:70,
    //width: parent.width,
    marginBottom:10,
    borderRadius:20,
    display:'flex',
    justifyContent:"space-around",
    alignItems:"center",
    justifyItems:""
  }}>

    <div>
      <div id='nav_iconHolder' style={{
          //height:parent.height,
          paddingRight:10,
          paddingLeft:10,
          borderRadius:10,
          backgroundColor:"#404040",
          display:'flex',
          flexDirection:"row",
          justifyContent:'center',
          alignItems:'center'
      }}>
          <RiHome2Line  color='#e6e6e6' size={24}/>
          <p style={{color:'#e6e6e6', fontSize:16, marginInline:10}}>Home</p>
      </div>
      
      
    </div>
    
    <CiWallet color='#e6e6e6' size={18}/>
    <FiMessageSquare color='#e6e6e6' size={18}/>
    <VscAccount color='#e6e6e6' size={18}/>
  </div>
);

export default BottomNav;
