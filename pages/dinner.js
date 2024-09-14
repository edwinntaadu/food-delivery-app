import React from 'react'
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function fruits() {
  return (
    <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <h1>Dinner Page</h1>
            <p>This is the Dinner category page.</p>
        </div>
        <BottomNav />
    </>
  )
}
