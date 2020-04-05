import { Formik } from "formik";
import React from "react";
import { object, mixed } from "yup";

const ImportPlants = ({ importPlant }) => {
  return (
    <div className="container">
      <Formik
        initialValues={{ file: null }}
        onSubmit={(values) => {
          console.log("Doing stuff with 2");
          const fileRead = new FileReader();
          fileRead.onload = function (e) {
            const plants = JSON.parse(e.target.result); // Array of Objects.
            console.log("Doing stuff with");
            Object.entries(plants)
              .sort((a, b) => a[0] - b[0])
              .forEach((plant) => {
                importPlant(plant[0], plant[1]);
              });
          };
          fileRead.readAsText(values.file);
        }}
        validationSchema={object().shape({
          file: mixed().required(),
        })}
        render={({ values, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                submit
              </button>
            </form>
          );
        }}
      />
    </div>
  );
};

export { ImportPlants };
