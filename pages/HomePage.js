import React, { useState } from 'react';
import CategoryIcon from '../components/CategoryIcon';
import FoodCard from '../components/FoodCard';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';
import Link from 'next/link';

import { RiDrinks2Fill } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { MdFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { LuDessert } from "react-icons/lu";
import { LuSoup } from "react-icons/lu";
import { CiSquareMore } from "react-icons/ci";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { icon: <GiFruitBowl fontSize={32} />, name: 'Fruits', link: '/fruits' },
    { icon: <MdFreeBreakfast fontSize={32} />, name: 'Breakfast', link: '/breakfast' },
    { icon: <FaBowlFood fontSize={32} />, name: 'Lunch', link: '/lunch' },
    { icon: <LuSoup fontSize={32} />, name: 'Dinner', link: '/dinner' },
    { icon: <RiDrinks2Fill fontSize={32} />, name: 'Drinks', link: '/drinks' },
    { icon: <LuDessert fontSize={32} />, name: 'Dessert', link: '/dessert' },
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

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <Navbar />
      <div
        className="categories"
        style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            overflowX: 'auto',
            padding: 10,
            whiteSpace: 'nowrap',
            gap: 30,
          }}
        >
        {categories.map((category, idx) => (
          category.link ? (
            <Link href={category.link} key={idx} passHref>
              <div
                onClick={() => handleCategoryClick(category.name)}
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: selectedCategory === category.name ? '#ffcc00' : '#f0f0f0',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: selectedCategory === category.name ? '#000' : '#666',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffeb99')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selectedCategory === category.name ? '#ffcc00' : '#f0f0f0')}
              >
                {category.icon}
                <span style={{ marginTop: '8px' }}>{category.name}</span>
              </div>
            </Link>
          ) : (
        <div
          key={idx}
          onClick={() => handleCategoryClick(category.name)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: selectedCategory === category.name ? '#ffcc00' : '#f0f0f0',
            transition: 'background-color 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: selectedCategory === category.name ? '#000' : '#666',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffeb99')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selectedCategory === category.name ? '#ffcc00' : '#f0f0f0')}
    >
      {category.icon}
      <span style={{ marginTop: '8px' }}>{category.name}</span>
    </div>
  )
))}
          
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '15%' }}>
          <CiSquareMore fontSize={42} />
        </div>
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
