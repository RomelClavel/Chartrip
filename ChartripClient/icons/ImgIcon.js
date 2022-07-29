import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../styles/Styling';

const ImgIcon = ({ size = 40, color = COLORS.custom.grey }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 201 201"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M179.644 55.0396L147.256 53.4692L145.371 32.3485C144.979 27.9124 141.014 24.811 136.381 25.1644L20.1783 34.704C15.5459 35.0966 12.2089 38.8261 12.5623 43.2229L20.8849 135.793C21.2775 140.229 25.2818 143.33 29.875 142.977L35.7636 142.506L34.8214 160.486C34.5859 165.433 38.4332 169.437 43.6152 169.712L173.244 175.875C178.427 176.111 182.706 172.499 182.98 167.552L188.437 64.1866C188.673 59.2794 184.786 55.2751 179.644 55.0396ZM40.2783 57.1202L37.491 110.04L30.6601 119.736L24.3789 49.8575V49.6612V49.4649C24.5752 47.5021 26.0669 45.9317 28.1084 45.7747L130.571 37.3735C132.613 37.2165 134.379 38.5513 134.693 40.4749C134.693 40.5534 134.811 40.5534 134.811 40.6319C134.811 40.6712 134.929 40.7105 134.929 40.789L135.989 52.8804L50.0142 48.7583C44.8322 48.6013 40.5138 52.213 40.2783 57.1202ZM171.439 150.122L153.105 128.412L142.309 115.575C141.367 114.437 139.836 113.494 138.148 113.416C136.46 113.337 135.204 114.005 133.79 115.025L127.352 119.697C125.978 120.522 124.918 121.071 123.466 120.993C122.052 120.914 120.796 120.365 119.893 119.501C119.579 119.187 118.99 118.637 118.519 118.166L101.717 98.969C100.5 97.438 98.4976 96.4565 96.2992 96.3388C94.0615 96.221 91.9023 97.1632 90.489 98.5372L50.7994 141.25L48.1298 144.155L48.2476 141.485L50.9171 90.8819L52.2127 66.1888V65.9925V65.7962C52.7623 63.6763 54.6466 62.1452 56.8843 62.263L137.049 66.1103L148.316 66.6599L171.203 67.7591C173.48 67.8769 175.247 69.6042 175.286 71.7634C175.286 71.8419 175.404 71.8812 175.404 71.9597C175.404 72.0382 175.521 72.0774 175.521 72.156L171.439 150.122Z"
				fill={color}
			/>
			<Path
				d="M146.51 102.973C154.126 102.973 160.329 96.7705 160.329 89.1544C160.329 81.5384 154.165 75.3357 146.51 75.3357C138.894 75.3357 132.691 81.4992 132.691 89.1544C132.691 96.8097 138.855 102.973 146.51 102.973Z"
				fill={color}
			/>
		</Svg>
	);
};

export default ImgIcon;