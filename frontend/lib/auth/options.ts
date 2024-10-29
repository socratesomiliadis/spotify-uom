import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import CredentialAuth from "@/lib/auth/credential";
import BackendService from "@/lib/services/backend";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider(CredentialAuth.signinConfig),
    CredentialsProvider(CredentialAuth.signupConfig),
  ],

  callbacks: {
    async signIn(ctx: any) {
      const { account } = ctx;

      if (CredentialAuth.canProvide(account.provider)) {
        return CredentialAuth.handle(ctx);
      }

      return "/auth/error";
    },
    async redirect(ctx: any) {
      const { url, baseUrl } = ctx;
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },

    async jwt(ctx: any) {
      const { account, token } = ctx;

      if (account) {
        if (CredentialAuth.canProvide(account.provider)) {
          const profile = await CredentialAuth.getProfile(ctx);
          return profile;
        }
        throw new Error("no authentication provider found");
      }

      // client side access token validate from server side each time
      // skip if client side has stable auth session time
      // return the `token` object only
      const profile = await BackendService.getProfile(token.accessToken);
      return {
        ...profile,
        accessToken: token.accessToken,
      };
    },

    async session(ctx: any) {
      const { session, token } = ctx;
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.isEmailVerified = token.isEmailVerified;
      session.user.isArtist = token.isArtist;

      return session;
    },
  },

  // Define custom pages for
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

export const getSession = () => getServerSession(authOptions);
