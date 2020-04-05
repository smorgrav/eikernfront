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

function dec2hex(dec, padding) {
  return parseInt(dec, 10).toString(16).padStart(padding, "0");
}

function utf8StringToUtf16String(str) {
  var utf16 = [];
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    utf16.push(dec2hex(str.charCodeAt(i), 4));
  }
  return utf16.join();
}

function toUTF8Array(str) {
  let utf8 = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return utf8;
}

function strEncodeUTF16(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

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
      const { prefix, items } = result;
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

  console.log(plants);

  const plantArray = plants.map((plant) => {
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
                    reconnectPhoto(plant.plant, storage, firestore)
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
