import { PageLayout } from '@/widgets';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import {
  DogOwnerProfile,
  Explore,
  ForgotPassword,
  ResetPassword,
  Schedule,
  SignIn,
  SignUp,
  WalkerProfile,
} from '@/pages';
import { Toaster } from '@/shared/ui';
import { JobRequestInfo } from '@/pages/job-request-info';
import WalkerForm from '@/features/create-walker/ui/CreateWalkerForm.tsx';
import DogOwnerForm from '@/features/create-dog-owner/ui/CreateDogOwnerForm.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/user-profile" element={<WalkerProfile />} />
          <Route path="/user-profile/:id" element={<DogOwnerProfile />} />
          <Route path="/create-walker" element={<WalkerForm />} />
          <Route path="/walker-profile/:id" element={<WalkerProfile />} />
          <Route path="/create-dog-owner" element={<DogOwnerForm />} />
          <Route path="/dog-owner-profile/:id" element={<DogOwnerProfile />} />
          <Route path="/job-request-info/:id" element={<JobRequestInfo />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="*" element={<Explore />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
