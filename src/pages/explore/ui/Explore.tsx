import React from 'react'
import { useUserStore } from '@/entities/user';
import { UserCard } from '@/widgets';

export const Explore: React.FC = () => {
  const user = useUserStore(state => state.user)

  return <div className=''>Explore
  <UserCard user={user}/>
  </div>
}
