import Button from "@material-ui/core/Button";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import usePagination from "firestore-pagination-hook";
import React, { useContext } from "react";
import { PhotoGrid } from "src/pages/PhotoGrid";
import { ErrorPage } from "src/template/Errors";
import { LoadingPage } from "src/template/Loading";

const queryConf = {
  type: ["karplante", "mose", "lav", "sopp", "diverse"],
  gruppe: [
    "blomst",
    "tre",
    "gras",
    "bregne",
    "blad",
    "busk",
    "skorpe",
    "alge",
    "lever",
    "svamp",
    "slim",
  ],
};

const urlToQuery = (query, filterParams, sortParams) => {
  let filteredQuery = query;

  const whereParams = {};
  filterParams.forEach((filter) => {
    const filterTerms = filter.split(":");
    if (!whereParams[filterTerms[0]]) {
      whereParams[filterTerms[0]] = [];
    }
    if (filterTerms.length > 1) {
      whereParams[filterTerms[0]].push(filterTerms[1]);
    }
  });

  console.log(whereParams, filterParams);

  Object.keys(whereParams).forEach((key) => {
    const values = whereParams[key];
    if (values.length > 1) {
      //Do a simple or
      //TODO strip tildes from values - no not support matches
      filteredQuery = filteredQuery.where(key, "in", values);
    }
    if (values.length === 1) {
      const value = values[0];
      // Handle tilde
      filteredQuery = filteredQuery.where(key, "==", value);
    } else {
      // Here the key is implicit and the key is the value - check if
      const matches = Object.keys(queryConf).filter((implicitKey) =>
        queryConf[implicitKey].includes(key)
      );
      console.log("Got ", matches, key);
      if (matches.length > 0) {
        filteredQuery = filteredQuery.where(matches[0], "==", key);
      }
    }
  });

  return filteredQuery;
};

const QueryComp = ({ collection }) => {
  const { firestore } = useContext(FirebaseContext);
  const location = useLocation();

  let query = firestore.collection(collection);

  const originalQuery = parse(location.search, { arrayFormat: "comma" });

  const filters = Array.isArray(originalQuery.filter)
    ? originalQuery.filter
    : originalQuery.filter
    ? [originalQuery.filter]
    : [];

  const sortFields = Array.isArray(originalQuery.sort)
    ? originalQuery.sort
    : originalQuery.sort
    ? [originalQuery.sort]
    : [];

  query = urlToQuery(query, filters, sortFields);

  const {
    loading,
    loadingError,
    hasMore,
    items,
    loadMore,
  } = usePagination(query, { limit: 20 });

  if (loading) return <LoadingPage />;
  if (loadingError) return <ErrorPage />;

  const documents = items.map((doc) => doc.data());

  return (
    <>
      <PhotoGrid plants={documents} />
      <Button disabled={!hasMore} onClick={loadMore} style={{ margin: "auto" }}>
        More
      </Button>
    </>
  );
};

export { QueryComp };
