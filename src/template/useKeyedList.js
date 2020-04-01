import { useState } from "react";
import { isEqual } from "underscore";

const useKeyedList = (initialList, sortfn) => {
  const [list, set] = useState([]);
  const [selected, setSelected] = useState(null);

  const current = () => {
    if (!selected) {
      return list.length > 0 ? list[0] : null;
    }

    return selected;
  };

  const next = () => {
    let curr = current();

    const currIndex = list.findIndex((item) => item.key === curr.key);
    const nextIndex = currIndex + 1;
    if (list.length > nextIndex) {
      setSelected(list[nextIndex]);
      return list[nextIndex];
    }
    return curr;
  };

  const prev = () => {
    let curr = current();

    const currIndex = list.findIndex((item) => item.key === curr.key);
    const prevIndex = currIndex - 1;

    if (prevIndex >= 0) {
      setSelected(list[prevIndex]);
      return list[prevIndex];
    }
    return curr;
  };

  return [
    list,
    selected,
    {
      set,
      clear: () => {
        set([]);
        setSelected(null);
      },
      update: (entry) => {
        set((currentList) => {
          const existingItem = currentList.filter((it) => it.key === entry.key);
          if (existingItem.length > 0) {
            // Assume one group and check if changes
            if (!isEqual(existingItem[0], entry)) {
              const entriesWithoutOld = currentList.filter(
                (it) => it.key !== entry.key
              );
              return entriesWithoutOld.concat(entry).sort(sortfn);
            } else {
              return currentList;
            }
          } else {
            return currentList.concat(entry).sort(sortfn);
          }
        });
      },
      current: current,
      next: next,
      prev: prev,
      select: (entry) => setSelected(entry),
      remove: (key) =>
        set((currentList) => currentList.filter((it) => it.key !== key)),
      filter: (fn) => set((currentList) => currentList.filter(fn)),
      sort: (fn) => set((currentList) => [...currentList].sort(fn)),
    },
  ];
};

export { useKeyedList };
