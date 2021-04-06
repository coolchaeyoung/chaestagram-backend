import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password, token }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      let uglyPassword = null;
      if (password) {
        uglyPassword = await bcrypt.hash(password, 10);
      }
      const updatedUser = await client.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updatedUser.id) {
        return { ok: true };
      }
      return { ok: false, error: "Could not update Profile" };
    },
  },
};
