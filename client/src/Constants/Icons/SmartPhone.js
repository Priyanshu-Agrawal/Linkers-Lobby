import * as React from "react";

const SmartPhone = ({ size = 20, color = "#8effd2", ...props }) => (
	<svg width={size} height={size} fill={color} viewBox="0 0 24 24" {...props}>
		<path d="M7 4v16h10V4H7ZM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
	</svg>
);

export default SmartPhone;