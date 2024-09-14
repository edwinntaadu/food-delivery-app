import React from 'react'
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function fruits() {
  return (
    <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <h1>Fruits Page</h1>
            <p>This is the fruits category page.</p>
        </div>
        <BottomNav />
    </>
  )
}
