import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { parse } from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";
import { QueryComp } from "src/pages/QueryComp";
import { UrlQueryAuto } from "../template/UrlQueryAuto";
import { autoComplete } from "../template/autoComplete";

const LandingPage = () => {
  const location = useLocation();

  const originalQuery = parse(location.search, { arrayFormat: "comma" });

  const filters = Array.isArray(originalQuery.filter)
    ? originalQuery.filter
    : originalQuery.filter
    ? [originalQuery.filter]
    : [];

  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box mt="1em" />
        <UrlQueryAuto autoOptions={() => autoComplete(filters)} />
        <Box mt="1em" />
        <QueryComp collection="plants" key={location.search} />
      </Container>
    </>
  );
};

export { LandingPage };
