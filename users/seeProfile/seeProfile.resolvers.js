import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) =>
      client.user.findUnique({ where: { username } }),
  },
};
