import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { parse } from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";
import { QueryComp } from "src/pages/QueryComp";
import { UrlQueryAuto } from "../template/UrlQueryAuto";

const LandingPage = () => {
  const location = useLocation();

  const originalQuery = parse(location.search, { arrayFormat: "comma" });
  const searchQuery = Array.isArray(originalQuery.search)
    ? originalQuery.search
    : originalQuery.search
    ? [originalQuery.search]
    : [];

  const plantetype = searchQuery[0];

  console.log(plantetype);

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
        <UrlQueryAuto autoOptions={["Hard rock", "Jazz"]} />
        <Box mt="1em" />
        <QueryComp
          plantetype={plantetype}
          key={`query${plantetype || "notype"}nogruppe`}
        />
      </Container>
    </>
  );
};

export { LandingPage };
