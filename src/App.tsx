/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Browse from './pages/Browse/Browse';
import Home from './pages/Home/Home';
// import BrowseDetail from "./pages/BrowseDetails/BrowseDetails";
import Playlist from './pages/Playlist/Playlist';

import ResetPassword from './pages/ResetPassword';
import UserDashBoard from './pages/UserDashboard/UserDashBoard';
import Verify from './pages/Verify/Verify';
import PlayerBar from './Components/Playerbar/Playerbar';
import ProfileDashboard from './pages/ProfileDashboard/ProfileDashboard';
import Newrelease from './pages/new-release/Newrelease';

import BrowseDetails from './pages/BrowseDetails/BrowseDetails';

// import Navbar from "./Components/Navbar/Navbar";

import Allmusic from './pages/AllMusic/AllMusic';
import RecentlyPlayed from './Components/recentlyPlayed/recentlyPlayed';
import Podcast from './pages/Podcast/Podcast';
import ProtectAuthRoute, {
  ProtectAdminRoute
} from './useContext/ProtectRoutes';
import SocilaOAuth from './Components/SocilaOAuth/SocilaOAuth';
import { DataProvider } from './useContext';

import Artists from './Components/BrowseDetails/ArtistContainer';
import SingleArtists from './pages/Artists/SingleArtist';
import AdminHome from './pages/AdminDashboard/AdminHome';
import AdminDashboard from './Components/AdminDashboard/AllSongAdminDashboard';
// import PodcastAdmin from "./Components/AdminDashboard/PodcastAdmin";

import GenreAdminDashboard from './Components/AdminDashboard/GenreAdminDashboard';
import { FlowProvider } from './useContext/flowContext';

import { PlayerProvider } from './useContext/PlayerBarContext';
import PaymentMethod from './pages/Payment/PaymentMethod';
import AllArtists from './pages/Artists/AllArtists';
import AdminAddArtists from './Components/AdminDashboard/AdminAddArtists';
import LoginNavbar from './Components/Navbar/LoginNavbar/LoginNavbar';

import PodcastCatpage from './pages/Podcast/PodcastCategoryPage/pCCategorypage';
import PodcastAdmin from './Components/AdminDashboard/PodcastAdmin';
import PodcastCategoryAdmin from './Components/AdminDashboard/PodcastCategoryAdmin';
import LibraryPage from './pages/Library/LibraryPage';
import About from './assets/About';

function App() {
  return (
    <React.Fragment>
      <Router>
        <FlowProvider>
          <DataProvider>
            <PlayerProvider>
              <>
                <ToastContainer />
                {/* ============================ AUTH ROUTES ====================== */}
                <Routes>
                  <Route element={<ProtectAuthRoute />}>
                    <Route element={<LoginNavbar />}>
                      <Route element={<PlayerBar />}>
                        <Route
                          path="/user-dashboard"
                          element={<UserDashBoard />}
                        />
                        <Route path="/about" element={<About />} />

                        <Route path="/new-release" element={<Newrelease />} />
                        <Route path="/genres-moods" element={<Browse />} />
                        <Route
                          path="/browse-details"
                          element={<BrowseDetails />}
                        />

                        {/* <Route path="/podcast" element={<Pdcategory />} /> */}
                        <Route
                          path="/pCCategory/:category"
                          element={<PodcastCatpage />}
                        />
                        <Route path="/playlist" element={<Playlist />} />
                        <Route
                          path="/pdcategoriesAdmin"
                          element={<PodcastCategoryAdmin />}
                        />

                        <Route
                          path="/profile-dashboard"
                          element={<ProfileDashboard />}
                        />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/artist" element={<Artists />} />
                        <Route path="/recent" element={<RecentlyPlayed />} />
                        <Route path="/podcast" element={<Podcast />} />
                        <Route path="/new-release" element={<Newrelease />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/artist" element={<AllArtists />} />
                        <Route
                          path="/artist/:artistId"
                          element={<SingleArtists />}
                        />
                        <Route path="/recent" element={<RecentlyPlayed />} />
                        {/* <Route path='/podcast' element={<Podcast />} /> */}
                        <Route path="/new-release" element={<Newrelease />} />
                        <Route
                          path="/admin-dashboard"
                          element={
                            <ProtectAdminRoute>
                              <AdminHome />
                            </ProtectAdminRoute>
                          }
                        />
                        <Route path="/allmusic*" element={<Allmusic />} />
                        <Route path="/genre-mood" element={<BrowseDetails />} />
                        <Route
                          path="/adminallsong"
                          element={
                            <ProtectAdminRoute>
                              <AdminDashboard />
                            </ProtectAdminRoute>
                          }
                        />
                        <Route
                          path="/genreadmin"
                          element={
                            <ProtectAdminRoute>
                              <GenreAdminDashboard />
                            </ProtectAdminRoute>
                          }
                        />
                        <Route
                          path="/artistadmin"
                          element={
                            <ProtectAdminRoute>
                              <AdminAddArtists />
                            </ProtectAdminRoute>
                          }
                        />
                        <Route
                          path="/profile-dashboard"
                          element={<ProfileDashboard />}
                        />
                        <Route
                          path="/podcastadmin"
                          element={<PodcastAdmin />}
                        />
                        <Route path="/allmusic*" element={<Allmusic />} />
                        <Route path="/browse/:id" element={<BrowseDetails />} />
                        <Route path="/library" element={<LibraryPage />} />
                      </Route>
                    </Route>
                  </Route>

                  {/* ================== NO AUTH ROUTES ===================== */}

                  <Route path="/auth/social/*" element={<SocilaOAuth />} />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/resetpassword/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/auth/social/*" element={<SocilaOAuth />} />
                  <Route
                    path="/Payment"
                    element={
                      // <ProtectAdminRoute>
                      <PaymentMethod />
                      // </ProtectAdminRoute>
                    }
                  />
                </Routes>
              </>
            </PlayerProvider>
          </DataProvider>
        </FlowProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
