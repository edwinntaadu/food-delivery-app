import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  text-align: center;
`;

const FoodImage = styled.img`
  width: 100%;
  height: auto;
`;

const FoodCard = ({ id, image, name, description, price }) => (
  <Link href={`/food/${id}`}>
    <Card>
      <FoodImage src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <h4>{price}</h4>
    </Card>
  </Link>
);

export default FoodCard;
