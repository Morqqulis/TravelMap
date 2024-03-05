import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, GithubIcon, DiscordIcon } from "@/components/icons";
import { auth, signOut } from "@/app/auth";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

export const Navbar = async () => {
	const session = await auth();
	return (
		<NextUINavbar className='py-[17.5px] z-50' maxWidth='xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				{session?.user?.image ? (
					<NavbarItem className='flex items-center gap-5'>
						<form
							action={async () => {
								"use server";
								await signOut({ redirect: true });
							}}>
							<Button color='warning' type='submit'>
								Sign Out
							</Button>
						</form>
						<Avatar color='secondary' isBordered radius='lg' src={session.user.image} alt='User Avatar' />
					</NavbarItem>
				) : (
					<NavbarItem>
						<Button as={Link} color='primary' href='/api/auth/signin'>
							Sign In
						</Button>
					</NavbarItem>
				)}
			</NavbarContent>
			<NavbarContent className='hidden sm:block' justify='center'>
				{session?.user?.name && (
					<NavbarItem className=''>
						<h1 className='grid gap-1 text-lg font-bold text-center'>
							Salam <span className='text-secondary'>{session.user.name}</span>
						</h1>
					</NavbarItem>
				)}
				<NavbarItem></NavbarItem>
			</NavbarContent>

			<NavbarContent className='gap-2 sm:flex basis-1/5 sm:basis-full' justify='end'>
				<NavbarItem className='flex gap-2'>
					<Link isExternal href={siteConfig.links.twitter} aria-label='Twitter'>
						<TwitterIcon className='text-default-500' />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label='Discord'>
						<DiscordIcon className='text-default-500' />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label='Github'>
						<GithubIcon className='text-default-500' />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
