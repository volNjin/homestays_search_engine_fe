import publicHttp from "./http/publicHttp.config";
const HOME = {
  getHomeByName: async ({ homename }) => {
    let result = await publicHttp({
      method: "GET",
      url: `/hotels/findByName/${homename}`,
    });
    return result;
  },
};
export default HOME;
