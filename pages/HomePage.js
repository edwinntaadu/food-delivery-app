import React from 'react';
import CategoryIcon from '../components/CategoryIcon';
import FoodCard from '../components/FoodCard';
import BottomNav from '../components/BottomNav';
import SaladIcon from '../public/icons/SaladIcon.jpg'
import ice from '../public/icons/ice.jpg'
import pizza from '../public/icons/pizza.jpg'
import Navbar from '../components/Navbar';

const HomePage = () => {
  const categories = [
    {icon: SaladIcon, name: 'Breakfast'},
    {icon: ice, name: 'Lunch'},
    {icon: pizza, name: 'Dinner'},
  ];

  const foods = [
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

  return (
    <>
      <Navbar />
      <div className="categories" style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        {categories.map((category, idx) => (
          <CategoryIcon key={idx} icon={category.icon} name={category.name} />
        ))}
      </div>
      <div className="food-cards">
        {foods.map((food) => (
          <FoodCard key={food.id} {...food} />
        ))}
      </div>
      <BottomNav />
    </>
  );
};

export default HomePage;
