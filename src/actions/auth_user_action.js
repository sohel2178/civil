import axios from "axios";
import { AUTH_USER } from "../utils/types";
import { USERS_URL } from "../utils/url";

const authUserAction = (data) => {
  return { type: AUTH_USER, payload: data };
};

export const getAuthUser = (user, firebase) => {
  return (dispatch) => {
    if (user) {
      const { uid, email, emailVerified } = user;
      const bbb = {
        uid: uid,
        emailVerified: emailVerified,
        email: email,
      };

      firebase.idToken().then((idToken) => {
        axios
          .get(USERS_URL + user.email, {
            headers: { Authorization: "Bearer " + idToken },
          })
          .then((response) => {
            let dbUser = response.data;
            bbb["name"] = dbUser.name;
            bbb["is_admin"] = dbUser.is_admin;
            bbb["contact"] = dbUser.contact;
            bbb["image"] = dbUser.image;
            bbb["webuid"] = dbUser._id;
            bbb["organization_name"] = dbUser.organization_name;
            bbb["address"] = dbUser.address;
            bbb["token"] = dbUser.token;

            localStorage.setItem("authUser", JSON.stringify(bbb));
            dispatch(authUserAction(bbb));
          })
          .catch((err) => {
            throw err;
          });
      });
    } else {
      dispatch(authUserAction(null));
    }
  };
};
