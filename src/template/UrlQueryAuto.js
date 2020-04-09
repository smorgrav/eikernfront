import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { parse, stringify } from "query-string";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const UrlQueryAuto = ({
  autoOptions = () => [],
  label = "",
  placeholder = "",
}) => {
  const location = useLocation();
  const history = useHistory();

  const originalQuery = parse(location.search, { arrayFormat: "comma" });
  const searchQuery = Array.isArray(originalQuery.filter)
    ? originalQuery.filter
    : originalQuery.filter
    ? [originalQuery.filter]
    : [];

  const pushNewQuery = (autoValues) => {
    const newQuery = Object.assign(originalQuery, { filter: autoValues });
    const newQueryStringify =
      "?" + stringify(newQuery, { arrayFormat: "comma" });
    history.push(newQueryStringify);
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={autoOptions()}
        value={searchQuery}
        onChange={(event, autoValues) => {
          pushNewQuery(autoValues);
        }}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={label}
            placeholder={placeholder}
            fullWidth
          />
        )}
      />
    </div>
  );
};

export { UrlQueryAuto };
