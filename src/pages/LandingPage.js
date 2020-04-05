import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React, { useContext } from "react";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { PhotoGrid } from "src/pages/PhotoGrid";
import { ErrorPage } from "src/template/Errors";
import { LoadingPage } from "src/template/Loading";
import { UrlQueryAuto } from "../template/UrlQueryAuto";
import usePagination from "firestore-pagination-hook";

const LandingPage = () => {
  const { firestore } = useContext(FirebaseContext);
  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = usePagination(firestore.collection("plants"), { limit: 20 });

  if (loading) return <LoadingPage />;
  if (loadingError) return <ErrorPage />;

  const plants = items.map((doc) => doc.data());

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
        <Button
          disabled={!hasMore}
          onClick={loadMore}
          style={{ margin: "auto" }}
        >
          More
        </Button>
      </Container>
    </>
  );
};

export { LandingPage };
