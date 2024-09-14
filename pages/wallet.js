import React from 'react'
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function wallet() {
  return (
    <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <h1>Wallet Page</h1>
            <p>This is the Wallet page.</p>
        </div>
        <BottomNav />
    </>
  )
}
