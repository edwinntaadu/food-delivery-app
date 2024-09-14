import React from 'react'
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function account() {
  return (
    <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <h1>Account Page</h1>
            <p>This is the Account page.</p>
        </div>
        <BottomNav />
    </>
  )
}
