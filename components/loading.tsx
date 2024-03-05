import { Spinner } from "@nextui-org/spinner";
export const Loading: React.FC = (): JSX.Element => {
	return (
		<div className='flex items-center justify-center gap-5 px-20 py-5 rounded-lg'>
			<Spinner color='success' label='Loading' labelColor='success' />
		</div>
	);
};
