import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; //  Add id to session.user
      name?: string;
      email?: string;
      image?: string;
    };
  }

  interface User {
    id: string; //  Add id to user type
  }
}
