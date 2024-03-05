import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { Code } from "@nextui-org/code";
import { Autocomplete } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

export const SearchAddress = ({ getDirectionsResponsData }: any): Promise<void> => {
	const [directionsDesponse, setDirectionsResponse] = useState<any>(null);
	const [distanse, setDistanse] = useState<string>("");
	const [duration, setDuration] = useState<string>("");
	const originRef = useRef<HTMLInputElement | any>(null);
	const destinationRef = useRef<HTMLInputElement | any>(null);
	const [price, setPrice] = useState<any>(0);

	const calcRoute = async (): Promise<void> => {
		if (originRef.current?.value === "" || destinationRef.current?.value === "") return;

		try {
			const directionsService = new google.maps.DirectionsService();
			const results: google.maps.DirectionsResult | any = await directionsService.route({
				origin: originRef.current?.value || "",
				destination: destinationRef.current?.value || "",
				travelMode: google.maps.TravelMode.DRIVING,
				region: "az",
				language: "az",
				waypoints: [{ location: "Baku" }],
				provideRouteAlternatives: true,
			});

			const distanceInKm = results.routes[0]?.legs[0]?.distance?.value / 1000;

			setDirectionsResponse(results);
			getDirectionsResponsData(results);
			setDistanse(results.routes[0]?.legs[0]?.distance?.text || "");
			setDuration(results.routes[0]?.legs[0]?.duration?.text || "");

			const calculatedPrice = calculatePrice(distanceInKm);
			setPrice(calculatedPrice);
		} catch (error) {
			console.log("Ошибка при получении маршрута", error);
		}
	};

	const clearRoutes = () => {
		setDirectionsResponse(null);
		setDistanse("");
		setDuration("");
		originRef.current.value = "";
		destinationRef.current.value = "";
	};

	const calculatePrice = (distanceInKm: number): number => {
		// Минимальная цена проезда до 3 км
		let price = 2.58;
		// Если расстояние больше 3 км, увеличиваем цену на 0.30 за каждый километр после 3-х
		if (distanceInKm > 3) {
			const extraKm = distanceInKm - 3;
			price += extraKm * 0.3;
		}
		return price;
	};

	useEffect(() => {
		if (directionsDesponse) {
			const distanceInKm = directionsDesponse.routes[0]?.legs[0]?.distance?.value / 1000;
			const calculatedPrice = calculatePrice(distanceInKm);
			setPrice(calculatedPrice);
		}
	}, [directionsDesponse]);

	const handleMenuOpen = () => document.documentElement?.classList.toggle("inputs-menu--active");

	/* @ts-ignore */
	return (
		<div className='absolute -top-[320px] z-10 -translate-x-1/2 left-1/2 transition-all inputs-menu group-[.inputs-menu--active]:top-0 container max-w-xl'>
			<div className='grid gap-2.5 p-2.5 bg-foreground-100 border-b-1 border-foreground-300 '>
				<div className='grid gap-2.5 w-full'>
					<Autocomplete className='w-full text-orange-500'>
						<input
							className='p-2.5 rounded-xl w-full block focus:outline-none transition-all duration-300 focus:border focus:border-warning border border-secondary'
							placeholder='Address'
							ref={originRef}
							required
						/>
					</Autocomplete>

					<Autocomplete className='w-full'>
						<input
							className='p-2.5 rounded-xl w-full block focus:outline-none transition-all duration-300 focus:border focus:border-warning border border-secondary'
							placeholder='Address'
							ref={destinationRef}
							required
						/>
					</Autocomplete>
				</div>
				<Button className='' color='success' variant='shadow' size='lg' onClick={calcRoute}>
					Get Route
				</Button>
				<Button className='' color='warning' variant='shadow' size='lg' onClick={clearRoutes}>
					Clean
				</Button>
			</div>
			<div className='flex text-center items-center justify-around gap-2.5 bg-foreground-200 py-2 rounded-b-xl flex-wrap'>
				{!directionsDesponse ? (
					<>
						<Spinner color='success' label={`Mesafe: ?`} labelColor='success' />
						<Spinner color='secondary' label={"Vaxt: ?"} labelColor='secondary' />
						<Spinner color='warning' label='Qiymet: ?' labelColor='warning' />
					</>
				) : (
					<>
						<Code color='warning'>{distanse}</Code>
						<Code color='warning'>{duration}</Code>
						<Code color='warning'>Price: {price.toFixed(2)} AZN</Code>
					</>
				)}
			</div>
			<Button
				onClick={handleMenuOpen}
				className='dropdownBtn absolute -translate-x-1/2 left-1/2 group-[.inputs-menu--active]:bg-red-500 group-[.inputs-menu--active]:rotate-180'
				size='lg'
				color='success'
				radius='sm'>
				<svg
					className='w-[20px] h-[20px] animate-bounce '
					stroke='currentColor'
					fill='currentColor'
					strokeWidth='0'
					viewBox='0 0 20 20'
					aria-hidden='true'
					height='200px'
					width='200px'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M10 2a.75.75 0 01.75.75v12.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z'
						clipRule='evenodd'></path>
				</svg>
			</Button>
		</div>
	);
};
