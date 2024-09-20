import React from 'react';
import CategoryIcon from '../components/CategoryIcon';
import FoodCard from '../components/FoodCard';
import BottomNav from '../components/BottomNav';
import SaladIcon from '../public/icons/SaladIcon.jpg'
import ice from '../public/icons/ice.jpg'
import pizza from '../public/icons/pizza.jpg'
import Navbar from '../components/Navbar';

import { RiDrinks2Fill } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { MdFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { LuDessert } from "react-icons/lu";
import { LuSoup } from "react-icons/lu";
import { CiSquareMore } from "react-icons/ci";
import Link from 'next/link';



const HomePage = () => {
  const categories = [
    {icon: <GiFruitBowl fontSize={32} color='#000'/>, name: 'Fruits', link: '/fruits'},
    {icon: <MdFreeBreakfast fontSize={32} color='#000' />, name: 'Breakfast', link: '/breakfast'},
    {icon: <FaBowlFood fontSize={32} color='#000'/>, name: 'Lunch', link: '/lunch'},
    {icon: <LuSoup fontSize={32} color='#000'/>, name: 'Dinner', link: '/dinner'},
    {icon: <RiDrinks2Fill fontSize={32} color='#000'/>, name: 'drinks', link: '/drinks'},
    {icon: <LuDessert fontSize={32} color='#000'/>, name: 'dessert', link: '/dessert'},

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
      <div className="categories" style={{ display: 'flex', justifyContent:"space-between", margin: '20px 0' }}>
        
        <div style={{display:'flex', justifyContent:"center", alignItems:"center", width:"80%",
          overflowX:'auto',
          padding:10,
          whiteSpace:'nowrap',
          gap:30
         }}>
          {categories.map((category, idx) => (
            <Link href={category.link || '#'} key={idx} passHref>
             <div>
            <CategoryIcon key={idx} icon={category.icon} name={category.name} />
             </div>
            </Link>
          ))}
        </div>

        <div style={{display:'flex', justifyContent:"center", alignItems:"center", width:"15%", }}>
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