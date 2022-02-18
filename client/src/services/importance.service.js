import httpService from "./http.service";

const importanceEndPoint = "importance/";

const importanceService = {
  get: async () => {
    const { data } = await httpService.get(importanceEndPoint);
    return data;
  },
};

export default importanceService;
