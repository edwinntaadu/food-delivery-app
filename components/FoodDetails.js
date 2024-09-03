import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const FoodImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const FoodDetails = ({ image, name, description, price }) => (
  <Container>
    <FoodImage src={image} alt={name} />
    <h2>{name}</h2>
    <p>{description}</p>
    <h3>{price}</h3>
    <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
      Add to Cart
    </button>
  </Container>
);

export default FoodDetails;
