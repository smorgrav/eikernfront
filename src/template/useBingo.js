import { indexOf } from "lodash";
import { useState } from "react";

const useBingo = (timeout) => {
  const [bingo, setBingo] = useState(false);
  const [, setTileList] = useState([]);

  const checkTile = (tile) => {
    if (bingo) return;

    setTileList((oldList) => {
      const newList = oldList.filter((item) => item !== tile);
      if (newList.length === 0 && !bingo) {
        setBingo(true);
      }

      return newList;
    });
  };

  const addTile = (tile) => {
    console.log("Add tile ", tile);
    if (tile) {
      if (indexOf(bingo, tile) === -1) {
        setTileList((oldList) => {
          oldList.push(tile);
          return oldList;
        });
      }
      if (timeout !== 0) {
        window.setTimeout(() => {
          checkTile(tile);
        }, timeout);
      }
    }
  };

  const addTiles = (tiles) => {
    if (Array.isArray(tiles)) {
      tiles.forEach((tile) => addTile(tile));
    } else {
      addTile(tiles);
    }
  };

  return [
    bingo,
    {
      checkTile,
      addTiles,
    },
  ];
};

export { useBingo };
