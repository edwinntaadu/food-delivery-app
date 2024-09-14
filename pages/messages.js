import React from 'react'
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export default function messages() {
  return (
    <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <h1>messages Page</h1>
            <p>This is the messages page.</p>
        </div>
        <BottomNav />
    </>
  )
}
