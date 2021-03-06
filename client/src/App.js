import React from "react";
import { ThemeProvider } from "styled-components";
import { philadelphia } from "./theme";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/LoginPage/LoginPage";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import PasswordEdit from "./components/PasswordEdit/PasswordEdit";
import CreateLeaguePage from "./components/CreateLeaguePage/CreateLeaguePage";
import CreateBattlePage from "./components/CreateBattlePage/CreateBattlePage";
import BattlePage from "./components/BattlePage/BattlePage";
import LeaguePage from "./components/LeaguePage/LeaguePage";
import ListLeaguesPage from "./components/ListLeaguesPage/ListLeaguesPage";
import ListBattlesPage from "./components/ListBattlesPage/ListBattlesPage";
import ListBattlersPage from "./components/ListBattlersPage/ListBattlersPage";
import UserSettingsPage from "./components/UserSettingsPage/UserSettingsPage";
import LeagueSettingsPage from "./components/LeagueSettingsPage/LeagueSettingsPage";
import BattlerPage from "./components/BattlerPage/BattlerPage";

function App() {
  return (
    <ThemeProvider theme={philadelphia}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />
        <Route exact path="/password/reset/edit" element={<PasswordEdit />} />
        <Route exact path="/create-league" element={<CreateLeaguePage />} />
        <Route exact path="/create-battle" element={<CreateBattlePage />} />
        <Route exact path="/battle/:battleId" element={<BattlePage />} />
        <Route exact path="/league/:leagueId" element={<LeaguePage />} />
        <Route exact path="/leagues" element={<ListLeaguesPage />} />
        <Route exact path="/battles" element={<ListBattlesPage />} />
        <Route exact path="/battlers" element={<ListBattlersPage />} />
        <Route exact path="/settings" element={<UserSettingsPage />} />
        <Route exact path="/league-settings" element={<LeagueSettingsPage />} />
        <Route exact path="/battler/:battlerId" element={<BattlerPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
