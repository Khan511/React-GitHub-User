import React, { Children } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";
function AuthWrapper({ children }) {
  const { error, isLoading } = useAuth0();
  const lod = true;

  if (isLoading) {
    return <Wrapper>{loadingGif}</Wrapper>;
  }
  if (error) {
    return <Wrapper>{error.message}</Wrapper>;
  }
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.section`
  min-height: 80vh;
  display: grid;
  place-items: center;
  img {
    width: 250px;
  }
`;

export default AuthWrapper;
