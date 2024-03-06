import { auth } from "@/app/auth";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Signout } from "./signout";

export const Auth = async () => {
	const session = await auth();

	return (
		<>
			{session?.user ? (
				<div className='flex gap-2.5'>
					{session.user.name && session.user.image && (
						<div className='flex gap-2.5 items-center'>
							<Avatar
								color='primary'
								isBordered
								radius='sm'
								src={session.user.image}
								alt='User Avatar'
								size='md'
							/>
							<p className='text-balance'>
								{`Salam `} <span className='font-bold'>{session.user.name.split(" ")[0]}</span>
							</p>
						</div>
					)}
					<Signout />
				</div>
			) : (
				<Button as={Link} color='danger' href='/api/auth/signIn'>
					Sign In
				</Button>
			)}
		</>
	);
};
