"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./map";
import { SearchAddress } from "./searchAddress";
import { Loading } from "./loading";
import { useState } from "react";
const libraries = ["places"];
export const Wrapper: React.FC = (): JSX.Element => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
		libraries: libraries,
	} as any);
	const [directionsResponseData, setDirectionsResponseData] = useState<Object | null>(null);

	const getDirectionsResponsData = (value: Object) => {
		setDirectionsResponseData(value);
	};

	return (
		<section className='relative h-full'>
			{isLoaded ? (
				<>
					{/* @ts-ignore */}
					<SearchAddress getDirectionsResponsData={getDirectionsResponsData} />
					<Map directionsResponseData={directionsResponseData} />
				</>
			) : (
				<div className='flex flex-col items-center justify-center h-screen'>
					<Loading />
				</div>
			)}
		</section>
	);
};
