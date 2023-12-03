import * as React from "react";

const MapPin = ({ size = 20, color = "#8effd2", ...props }) => (
	<svg width={size} height={size} fill={color} viewBox="0 0 24 24" {...props}>
		<path d="M18.364 17.364 12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0ZM11 10H8v2h3v3h2v-3h3v-2h-3V7h-2v3Z" />
	</svg>
);

export default MapPin;