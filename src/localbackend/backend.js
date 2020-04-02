import cam1 from "./database/cameras/cam1";
import image1 from "src/localbackend/database/images/cam1/image1";
import user1 from "./database/users/user1";
import private1 from "./database/private/user1";
import info1 from "./database/info/info1";
import group1 from "./database/groups/group1";
import model1 from "./database/models/model1";

const firestore = () => {};

const database = () => {
  const db = {
    cameras: {},
    images: {},
    users: {},
    private: {},
    groups: {},
    models: {},
    info: {},
  };

  db.cameras.cam1 = cam1;
  db.users.user1 = user1;
  db.private.user1 = private1;
  db.info.info1 = info1;
  db.groups.group1 = group1;
  db.models.model1 = model1;
  db.images.cam1 = { image1: image1 };

  return db;
};

const readFromFiles = () => {};

export { database };
