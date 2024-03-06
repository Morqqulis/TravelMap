import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async signIn(credentials) {
			const isAllowedToSignIn = true;
			if (isAllowedToSignIn) {
				return true;
			} else {
				// Return false to display a default error message
				return false;
				// Or you can return a URL to redirect to:
				// return '/unauthorized'
			}
		},
		async session({ session, token }) {
			return session;
		},
	},
});

export { GET, POST, auth, signIn, signOut };
