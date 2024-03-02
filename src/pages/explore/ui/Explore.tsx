import React from 'react'
import { useUserStore } from '@/entities/user';
import { UserCard } from '@/widgets';
import WalkerForm from '@/features/create-walker/ui/CreateWalkerForm.tsx';
import DogOwnerForm from '@/features/create-dog-owner/ui/CreateDogOwnerForm.tsx';

export const Explore: React.FC = () => {
  const user = useUserStore(state => state.user)

  return <div className='flex'>Explore
  <UserCard user={user}/>
    <WalkerForm/>
    <DogOwnerForm/>
  </div>
}
