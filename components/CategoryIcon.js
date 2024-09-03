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
  <IconWrapper>
    <IconImage src={icon.src} alt={name} />
    <CategoryName>{name}</CategoryName>
  </IconWrapper>
);

export default CategoryIcon;
