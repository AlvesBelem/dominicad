import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "DominiCad",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      churchName: { type: "string", required: false },
      teacherName: { type: "string", required: false },
      superintendent: { type: "string", required: false },
      plan: { type: "string", required: false, defaultValue: "free" },
    },
  },
  plugins: [nextCookies()],
});
