import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { ScrollToTop } from './components/ScrollToTop';

// 22 Required Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { DogMap } from './pages/DogMap';
import { ReportDog } from './pages/ReportDog';
import { DogProfiles } from './pages/DogProfiles';
import { FeedingTasks } from './pages/FeedingTasks';
import { DonationPoints } from './pages/DonationPoints';
import { DonationPointDetails } from './pages/DonationPointDetails';
import { AddDonationPoint } from './pages/AddDonationPoint';
import { Campaigns } from './pages/Campaigns';
import { Volunteers } from './pages/Volunteers';
import { VolunteerDashboard } from './pages/VolunteerDashboard';
import { Emergency } from './pages/Emergency';
import { Notifications } from './pages/Notifications';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-cream font-sans text-charcoal selection:bg-primary/20">
          {/* Top Demo Banner */}
          <DemoBanner />

          {/* Main Top Navigation */}
          <Navbar />

          {/* Main Body Routes */}
          <main className="flex-1">
            <Routes>
              {/* 1. Home */}
              <Route path="/" element={<Home />} />

              {/* 2. About PawSathi */}
              <Route path="/about" element={<About />} />

              {/* 3. Interactive Dog Map */}
              <Route path="/dog-map" element={<DogMap />} />

              {/* 4. Report a Dog */}
              <Route path="/report-dog" element={<ReportDog />} />

              {/* 5. Dog Profiles */}
              <Route path="/dog-profiles" element={<DogProfiles />} />

              {/* 6. Feeding Tasks ("Help a Dog") */}
              <Route path="/feeding-tasks" element={<FeedingTasks />} />

              {/* 7. Street Dogs Donation Points */}
              <Route path="/donation-points" element={<DonationPoints />} />

              {/* 8. Donation Point Details */}
              <Route path="/donation-points/:id" element={<DonationPointDetails />} />

              {/* 9. Add Donation Point */}
              <Route path="/add-donation-point" element={<AddDonationPoint />} />

              {/* 10. Donation Campaigns & Contributions */}
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/donations" element={<Campaigns />} />

              {/* 11. Volunteer Registration */}
              <Route path="/volunteers" element={<Volunteers />} />

              {/* 12. Volunteer Dashboard */}
              <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />

              {/* 13. Emergency Assistance */}
              <Route path="/emergency" element={<Emergency />} />

              {/* 14. Notifications */}
              <Route path="/notifications" element={<Notifications />} />

              {/* 15. User Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* 16. Login */}
              <Route path="/login" element={<Login />} />

              {/* 17. Registration */}
              <Route path="/register" element={<Register />} />

              {/* 18. Profile and Settings */}
              <Route path="/profile" element={<Profile />} />

              {/* 19. Privacy Policy */}
              <Route path="/privacy" element={<Privacy />} />

              {/* 20. Terms of Use */}
              <Route path="/terms" element={<Terms />} />

              {/* 21. Administrator Dashboard */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* 22. Not Found / 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav />

          {/* Toast Notification Container */}
          <ToastContainer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
