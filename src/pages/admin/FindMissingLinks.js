import Button from "@material-ui/core/Button";
import usePagination from "firestore-pagination-hook";
import React, { useContext } from "react";
import { FirebaseContext } from "src/firebase/FirebaseProvider";

const findLinks = (items) => {
  const plants = items.map((doc) => doc.data());
  plants.forEach((plant) => {
    const photos = plant.photos || [];
    photos
      .filter((photo) => photo.url === undefined)
      .forEach((photo) => {
        console.log(photo.link);
      });
  });
};

const FindMissingLinks = () => {
  const { firestore } = useContext(FirebaseContext);
  const { items } = usePagination(firestore.collection("plants"), {
    limit: 1000,
  });

  return <Button onClick={() => findLinks(items)}>Find Missing Urls</Button>;
};

export { FindMissingLinks };
