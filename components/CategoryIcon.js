import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 50%;
  padding: 10px;
  margin: 10px;
  width: 70px;
  height: 70px;
`;

const IconImage = styled.img`
  width: 40px;
  height: 40px;
`;

const CategoryName = styled.p`
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
`;

const CategoryIcon = ({ icon, name }) => (
  
  <div style={{height:50, width:50, borderRadius:10, background:"#fff", display:"flex", marginBottom:10, marginTop:10,
    padding:5, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', justifyContent:"center", alignItems:"center"
  }}>
    {icon}
  </div>
);

export default CategoryIcon;
