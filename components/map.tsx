import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export const Map = ({ directionsResponseData }: { directionsResponseData: any }) => {
	const [defaultPosition, setDefaultPosition] = useState<google.maps.LatLngLiteral | null>(null);
	const [map, setMap] = useState<google.maps.Map | null>(null);

	const options: google.maps.MapOptions = {
		center: defaultPosition || { lat: 40, lng: 49 },
		zoom: 12,
		mapId: process.env.NEXT_PUBLIC_MAP_ID as string,
		keyboardShortcuts: true,
		fullscreenControl: false,
		streetViewControl: false,
		mapTypeControl: false,
		zoomControl: false,
		clickableIcons: true,
		backgroundColor: "inherit",
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT,
		},
	};
	useEffect(() => {
		if (navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setDefaultPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, [navigator]);

	return (
		<GoogleMap
			mapContainerStyle={{ width: "100%", height: "calc(100vh - 100px)" }}
			options={options}
			onLoad={(map) => setMap(map)}>
			{defaultPosition && <Marker position={defaultPosition} />}
			{directionsResponseData && <DirectionsRenderer directions={directionsResponseData} />}
		</GoogleMap>
	);
};
