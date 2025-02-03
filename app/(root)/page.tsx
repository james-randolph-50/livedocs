import Header from '@/components/Header'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  const documents = [];
  return (
    <main className='home-container'>
      <Header className='sticky left-0 top-0'>

        <div className='flex items-center gap-2 lg:gap-4'>
          Notifications
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

{documents.length > 0 ? (
  <div>

  </div>
): (
  <div>
    </div>
)}
  
    </main>
  )
}

export default Home