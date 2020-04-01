import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useLocation, useHistory } from "react-router-dom";
import { parse, stringify } from "query-string";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const UrlQueryAuto = ({ autoOptions = [], label = "", placeholder = "" }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const originalQuery = parse(location.search, { arrayFormat: "comma" });
  const searchQuery = Array.isArray(originalQuery.search)
    ? originalQuery.search
    : originalQuery.search
    ? [originalQuery.search]
    : [];

  const pushNewQuery = (autoValues) => {
    const newQuery = Object.assign(originalQuery, { search: autoValues });
    const newQueryStringify =
      "?" + stringify(newQuery, { arrayFormat: "comma" });
    history.push(newQueryStringify);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={autoOptions}
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
