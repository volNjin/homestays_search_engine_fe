import privateHttp from "./http/privateHttp.config";
import publicHttp from "./http/publicHttp.config";
const USER = {
  me: () =>
    privateHttp({
      method: "GET",
      url: "/user/me",
    }),
  register: async ({ email, password, name }) => {
    let result = await publicHttp({
      method: "POST",
      url: "/auth/signup",
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
    return result;
  },
  login: async ({ email, password }) => {
    let result = await publicHttp({
      method: "POST",
      url: "/auth/signin",
      data: {
        email: email,
        password: password,
      },
    });
    if (result.message === "LOGIN_SUCCESS") {
      localStorage.setItem("token", result.accessToken);
    }
    return result;
  },
  getFavhomes: async (id) => {
    return privateHttp({
      method: "GET",
      url: `/user/favhomes/`,
    });
  },
  addFavhome: async ({ user_id, homename, homephoto }) => {
    return privateHttp({
      method: "POST",
      url: "/user/favhome",
      data: {
        user_id,
        homename,
        homephoto,
      },
    });
  },
  removeFavhome: async ({ user_id, homename }) => {
    return privateHttp({
      method: "DELETE",
      url: "/user/favhome",
      data: {
        user_id,
        homename,
      },
    });
  },
};

export default USER;
