import { signOut } from "@/app/auth";
import { Button } from "@nextui-org/button";

export const Signout = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirect: true });
			}}>
			<Button color='secondary' type='submit'>
				Sign Out
			</Button>
		</form>
	);
};
