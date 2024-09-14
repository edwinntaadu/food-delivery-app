import React from 'react'
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function fruits() {
  return (
    <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <h1>Drinks Page</h1>
            <p>This is the Drinks category page.</p>
        </div>
        <BottomNav />
    </>
  )
}
