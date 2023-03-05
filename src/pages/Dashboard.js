import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import useGlobalContext from "../context/context";
import loadingImage from "../images/preloader.gif";
const Dashboard = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="Loading" />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
