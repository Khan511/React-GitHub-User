import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";

import useGlobalContext from "./context/context";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthWrapper>
  );
}

export default App;
