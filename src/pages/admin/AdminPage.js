import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { useContext } from "react";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { ImportPlants } from "src/pages/admin/ImportPlants";

const AdminPage = () => {
  const { storage, firestore } = useContext(FirebaseContext);

  const importPlant = async (key, plant) => {
    // 1 If plant has photos with out an url - annotate this
    if (plant.photos && plant.photos.length > 0) {
      const promises = [];
      plant.photos.forEach((photo) => {
        if (!plant.url) {
          const promise = storage
            .ref(`photos/${photo.link}`)
            .getDownloadURL()
            .then((url) => {
              console.log("Got download Url: ", url);
              photo.url = url;
              return Promise.resolve();
            })
            .catch((error) => {
              console.log("Unable to get Download URL for ", key);
              return Promise.resolve();
            });
          promises.push(promise);
        }
      });
      await Promise.all(promises);
    }

    console.log("Done urls");
    firestore
      .collection("plants")
      .doc(key)
      .set(plant)
      .then(function () {
        console.log(`Plant ${key} imported`);
      })
      .catch(function (error) {
        console.error(`Error writing plant ${key}: `, error);
      });
  };

  return (
    <>
      <Box mt="10em" />
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <ImportPlants importPlant={importPlant} />
      </Container>
    </>
  );
};

export { AdminPage };
