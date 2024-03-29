import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_USER } from './gql';
import { ThemeProvider } from 'styled-components';
import { darkTheme, philadelphia, frieza } from './theme';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import CreateBattlePage from './components/CreateBattlePage/CreateBattlePage';
import BattlePage from './components/BattlePage/BattlePage';
import LeaguePage from './components/LeaguePage/LeaguePage';
import ListLeaguesPage from './components/ListLeaguesPage/ListLeaguesPage';
import ListBattlesPage from './components/ListBattlesPage/ListBattlesPage';
import ListBattlersPage from './components/ListBattlersPage/ListBattlersPage';
import UserSettingsPage from './components/UserSettingsPage/UserSettingsPage';
import LeagueSettingsPage from './components/LeagueSettingsPage/LeagueSettingsPage';
import BattlerPage from './components/BattlerPage/BattlerPage';
import Chat from './components/Chat/Chat';
import ListEventsPage from './components/ListEventsPage/ListEventsPage';
import ListSpacesPage from './components/ListSpacesPage/ListSpacesPage';
import UpdateEventPage from './components/LeagueSettingsPage/UpdateEventPage/UpdateEventPage';
import BookingPage from './components/BookingPage/BookingPage';
import EventPage from './components/EventPage/EventPage';
import GlobalStyle from './GlobalStyle';
import Loading from './components/SharedComponents/Loading/Loading';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const { user } = useSelector((state) => state.user.userState);
  const { loading, data, refetch } = useQuery(GET_USER, {
    skip: user?.id ? false : true,
    variables: { id: user?.id },
    onCompleted: (data) => setSelectedTheme(data?.user?.selectedTheme),
  });

  const getSelectedTheme = () => {
    switch (selectedTheme) {
      case 'darkTheme':
        return darkTheme;
      case 'frieza':
        return frieza;
      default:
        return philadelphia;
    }
  };

  if (loading) return <Loading />;

  return (
    <ThemeProvider theme={getSelectedTheme()}>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/admin-panel' element={<AdminPanel />} />
        <Route exact path='/create-battle' element={<CreateBattlePage />} />
        <Route exact path='/battle/:battleId' element={<BattlePage />} />
        <Route exact path='/league/:leagueId' element={<LeaguePage />} />
        <Route exact path='/leagues' element={<ListLeaguesPage />} />
        <Route exact path='/battles' element={<ListBattlesPage />} />
        <Route exact path='/battlers' element={<ListBattlersPage />} />
        <Route
          exact
          path='/settings'
          element={
            <UserSettingsPage
              loading={loading}
              user={data?.user ? data.user : null}
              refetchUser={refetch}
            />
          }
        />
        <Route exact path='/league-settings' element={<LeagueSettingsPage />} />
        <Route exact path='/battler/:battlerId' element={<BattlerPage />} />
        <Route exact path='/chat' element={<Chat />} />
        <Route exact path='/events' element={<ListEventsPage />} />
        <Route exact path='/spaces' element={<ListSpacesPage />} />
        <Route exact path='/update-event/' element={<UpdateEventPage />} />
        <Route exact path='/event/:eventId' element={<EventPage />} />
        <Route exact path='/create-booking' element={<BookingPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
