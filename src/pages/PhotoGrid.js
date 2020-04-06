import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import React, { useContext } from "react";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import unorm from "unorm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
  },
  gridList: {
    width: "80vw",
    height: "80vh",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const selectPhoto = (plant) => {
  const photos = plant.photos || [];
  const photoWithUrl = photos.filter((photo) => photo.url);
  if (photoWithUrl.length > 0) {
    return photoWithUrl[0];
  }
  return photos[0] || {};
};

const reconnectPromise = (items, photo) => {
  return new Promise((resolve, reject) => {
    console.log("Finding match for ", photo.link);
    const match = items.filter((item) => {
      return unorm.nfc(item.name) === unorm.nfc(photo.link);
    });

    if (match.length === 1) {
      console.log("Found ", match[0]);
      match[0]
        .getDownloadURL()
        .then((url) => {
          photo.url = url;
        })
        .finally(() => resolve());
    } else {
      console.log("Could not find for ", photo.link);
      console.log("MAtches ", match.length);
      resolve();
    }
  });
};

const reconnectPhoto = (plant, storage, firestore) => {
  if (!plant.photos) {
    console.log("No photos to reconnect");
  }

  storage
    .ref("photos")
    .listAll()
    .then((result) => {
      const { items } = result;
      const promises = [];
      plant.photos.forEach((photo) => {
        promises.push(reconnectPromise(items, photo));
      });
      console.log("Got ", promises.length);
      Promise.all(promises).then(() => {
        console.log("All resoved ");
        firestore
          .collection("plants")
          .doc(`${plant.plante}`)
          .update({
            photos: plant.photos,
          })
          .then(() => console.log("FIrestore udpated"));
      });
    });
};

const PhotoGrid = ({ plants }) => {
  const { storage, firestore } = useContext(FirebaseContext);
  const classes = useStyles();

  const noPhotos = plants.filter((plant) => plant.photos.length === 0);
  const hasPhotos = plants.filter((plant) => plant.photos.length > 0);
  const missingUrls = hasPhotos.filter(
    (plant) =>
      plant.photos.filter((photo) => photo.url === undefined).length > 0
  );

  console.log("Nof plants: ", plants.length);
  console.log("Nof with photos: ", hasPhotos.length);
  console.log("Nof without photos: ", noPhotos.length);
  console.log("Nof missing urls: ", missingUrls.length);

  const plantArray = hasPhotos.map((plant) => {
    const photo = selectPhoto(plant);
    return {
      plant: plant,
      photo: photo,
      key: plant.plante,
      img: photo.url,
      header: plant.navn,
      subheader: photo.comment,
    };
  });

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={200}
        spacing={1}
        cols={3}
        className={classes.gridList}
      >
        {plantArray.map((plant) => (
          <GridListTile
            key={plant.key}
            cols={plant.featured ? 3 : 1}
            rows={plant.featured ? 3 : 1}
          >
            <img src={plant.img} alt={plant.header} />
            <GridListTileBar
              title={plant.header}
              subtitle={<span>{plant.subheader}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${plant.header}`}
                  className={classes.icon}
                  onClick={() =>
                    missingUrls.forEach((pl) => {
                      reconnectPhoto(pl, storage, firestore);
                    })
                  }
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export { PhotoGrid };
