import request from "@/utils/request";

export default {
  listBirthdayCount() {
    return request({
      url: "/user-info/birthday",
      method: "get",
    });
  },
  listGenderCount() {
    return request({
      url: "/user-info/gender",
      method: "get",
    });
  },
};
