import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { PhotoGrid } from "src/pages/PhotoGrid";
import { ErrorPage } from "src/template/Errors";
import { LoadingPage } from "src/template/Loading";
import { UrlQueryAuto } from "../template/UrlQueryAuto";
import Pagination from "@material-ui/lab/Pagination";

const LandingPage = () => {
  const { firestore } = useContext(FirebaseContext);
  const [value, loading, error] = useCollection(
    firestore.collection("plants").limit(9)
  );

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  const plants = value.docs.map((doc) => doc.data());

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
        <UrlQueryAuto
          autoOptions={["Hard rock", "Jazz"]}
          placeholder={"E.g navn:blåveis"}
        />
        <Box mt="1em" />
        <PhotoGrid plants={plants} />
        <Pagination count={10} variant="outlined" style={{ margin: "auto" }} />
      </Container>
    </>
  );
};

export { LandingPage };
