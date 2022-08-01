import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../styles/Styling';

const GoogleIcon = ({ size = 40, color = COLORS.custom.grey }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 50 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M49 25.5682C49 23.7955 48.8409 22.091 48.5455 20.4546H25V30.125H38.4545C37.875 33.25 36.1136 35.8978 33.4659 37.6705V43.9432H41.5455C46.2727 39.591 49 33.1819 49 25.5682Z"
				fill="#4285F4"
			/>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M25.0001 49.9996C31.7501 49.9996 37.4092 47.7609 41.5455 43.9428L33.466 37.67C31.2274 39.17 28.3637 40.0564 25.0001 40.0564C18.4887 40.0564 12.9774 35.6587 11.0115 29.7496H2.65918V36.2268C6.77282 44.3973 15.2274 49.9996 25.0001 49.9996Z"
				fill="#05BE70"
			/>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M11.0114 29.7501C10.5114 28.2501 10.2273 26.6478 10.2273 25.0001C10.2273 23.3524 10.5114 21.7501 11.0114 20.2501V13.7728H2.65909C0.965909 17.1478 0 20.966 0 25.0001C0 29.0342 0.965909 32.8524 2.65909 36.2274L11.0114 29.7501Z"
				fill="#FBBC05"
			/>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M25.0001 9.94318C28.6705 9.94318 31.966 11.2045 34.5569 13.6818L41.7274 6.51136C37.3978 2.47727 31.7387 0 25.0001 0C15.2274 0 6.77282 5.60227 2.65918 13.7727L11.0115 20.25C12.9774 14.3409 18.4887 9.94318 25.0001 9.94318Z"
				fill="#EA4335"
			/>
		</Svg>
	);
};

export default GoogleIcon;
