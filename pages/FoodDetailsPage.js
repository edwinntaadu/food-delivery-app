import React from 'react';
import FoodDetails from '../components/FoodDetails';

const FoodDetailPage = ({ match }) => {
  const foodName = match.params.name;
  // Replace this with actual data fetching
  const food = {
    name: foodName,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$28.00',
    image: 'image_path',
  };

  return <FoodDetails {...food} />;
};

export default FoodDetailPage;
