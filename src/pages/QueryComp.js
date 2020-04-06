import Button from "@material-ui/core/Button";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import usePagination from "firestore-pagination-hook";
import React, { useContext } from "react";
import { PhotoGrid } from "src/pages/PhotoGrid";
import { ErrorPage } from "src/template/Errors";
import { LoadingPage } from "src/template/Loading";

const QueryComp = ({ plantetype, gruppe }) => {
  const { firestore } = useContext(FirebaseContext);
  let query = firestore.collection("plants");

  if (plantetype) {
    query = query.where("type", "==", plantetype);
  }
  if (gruppe) {
    query = query.where("gruppe", "==", gruppe);
  }

  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = usePagination(query, { limit: 20 });

  if (loading) return <LoadingPage />;
  if (loadingError) return <ErrorPage />;

  const plants = items.map((doc) => doc.data());

  return (
    <>
      <PhotoGrid plants={plants} />
      <Button disabled={!hasMore} onClick={loadMore} style={{ margin: "auto" }}>
        More
      </Button>
    </>
  );
};

export { QueryComp };
