import { PageLayout } from '@/widgets';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { Chat, Explore, ForgotPassword, ResetPassword, Schedule, SignIn, SignUp } from '@/pages';
import { Toaster } from '@/shared/ui';
import { JobRequestInfo } from '@/pages/job-request-info';
import WalkerForm from '@/features/create-walker/ui/CreateWalkerForm.tsx';
import DogOwnerForm from '@/features/create-dog-owner/ui/CreateDogOwnerForm.tsx';
import { UserProfile } from '@/pages/user-profile';
import { Mock } from '@/app/Mock.tsx';

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
          <Route path="/create-walker" element={<WalkerForm />} />
          <Route path="/create-dog-owner" element={<DogOwnerForm />} />
          <Route path="/job-request-info/:id" element={<JobRequestInfo />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Explore />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/mock" element={<Mock />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
