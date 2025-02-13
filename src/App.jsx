import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

import HootList from "./components/HootList/HootList";
import { UserContext } from "./contexts/UserContext";
import * as hootService from "./services/hootService";
import HootDetails from './components/HootDetails/HootDetails';

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <>
      <pre>{JSON.stringify(user)}</pre>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />            {/* Add this route! */}
            <Route 
              path='/hoots/:hootId'
              element={<HootDetails />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path="/*" element={<p>No such page</p>} />
      </Routes>
    </>
  );
};

export default App;
