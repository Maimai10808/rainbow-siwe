import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          console.log("=== authorize start ===");
          console.log("raw credentials.message:", credentials?.message);
          console.log("raw credentials.signature:", credentials?.signature);

          if (!credentials?.message || !credentials?.signature) {
            console.log("missing message or signature");
            return null;
          }

          const siwe = new SiweMessage(credentials.message);

          console.log("siwe.domain:", siwe.domain);
          console.log("siwe.address:", siwe.address);
          console.log("siwe.nonce:", siwe.nonce);
          console.log("siwe.chainId:", siwe.chainId);

          const nextAuthUrl = process.env.NEXTAUTH_URL!;
          const expectedDomain = new URL(nextAuthUrl).host;
          const csrfToken = await getCsrfToken({
            req: { headers: req.headers },
          });

          console.log("expectedDomain:", expectedDomain);
          console.log("csrfToken:", csrfToken);

          const result = await siwe.verify({
            signature: credentials.signature,
            domain: expectedDomain,
            nonce: csrfToken,
          });

          console.log("verify result:", result);

          if (!result.success) {
            console.log("verify failed");
            return null;
          }

          return {
            id: siwe.address,
          };
        } catch (error) {
          console.error("authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.name = token.sub;
      }
      return session;
    },
  },
};
