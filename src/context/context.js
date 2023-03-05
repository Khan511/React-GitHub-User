import React, { useState, useEffect, useContext, useCallback } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [request, setRequest] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const checkRates = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequest(remaining);

        if (remaining === 0) {
          toggleError(true, "Sorry, You have ran out of hourly API request.");
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchUsers = async (user) => {
    toggleError();
    setLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);

      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          console.log(repos);

          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));

      // //Repos
      // // [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
      // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
      //   setRepos(response.data);
      // });

      // //Followers
      // // [Followers](https://api.github.com/users/john-smilga/followers)
      // axios(`${followers_url}?per_page=100`).then((response) =>
      //   setFollowers(response.data)
      // );
    } else {
      toggleError(true, "Couldn't find the user with given name");
    }

    checkRates();
    setLoading(false);
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    checkRates();
    setLoading(false);
  }, []);

  return (
    <GithubContext.Provider
      value={{
        repos,
        error,
        request,
        loading,
        followers,
        githubUser,
        setError,
        fetchUsers,
        toggleError,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GithubContext);
};

export default useGlobalContext;
export { GithubProvider };
