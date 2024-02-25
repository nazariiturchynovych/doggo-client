import { PageLayout } from '@/widgets';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import {
  DogOwnerProfile,
  Explore,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  UserProfile,
  WalkerProfile,
} from '@/pages';

function App() {

  return (
    <>
      <div className='flex h-screen'>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:id' element={<ResetPassword />} />

            <Route path='/explore' element={<Explore />} />
            <Route path='/user-profile/id' element={<UserProfile />} />
            <Route path='/walker-profile/id' element={<WalkerProfile />} />
            <Route path='/dog-owner-profile/id' element={<DogOwnerProfile />} />
            <Route path='/' element={<Explore />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/explore' element={<Explore />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
