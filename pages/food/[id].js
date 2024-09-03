import React from 'react';
import { useRouter } from 'next/router';
import FoodDetails from '../../components/FoodDetails';

// Example data
const foodData = [
    { 
        id: 1, 
        name: 'Jollof Rice', 
        description: 'African Fried Fish and Jollof Rice', 
        price: '€25.00', 
        image: '/images/fried-fish-and-jollof-rice.jpg',
      },
  
      { 
        id: 2, 
        name: 'Pilaf', 
        description: 'A plate of rice with meat and vegetables', 
        price: '€28.00', 
        image: '/images/a-plate-of-rice-with-meat-and-vegetables.jpg', 
      },
      { 
        id: 3, 
        name: 'Fufu', 
        description: 'Fufu', 
        price: '€30.00', 
        image: '/images/fufu.jpeg', 
      },
  // Add more food items here
];

const FoodDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Find the food item by ID
  const foodItem = foodData.find((item) => item.id === parseInt(id));

  if (!foodItem) return <p>Food item not found!</p>;

  return <FoodDetails {...foodItem} />;
};

export default FoodDetailPage;
