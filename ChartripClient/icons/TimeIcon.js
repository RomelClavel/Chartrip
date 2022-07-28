import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../styles/Styling';

const TimeIcon = ({ size = 40, color = COLORS.custom.grey }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 50 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{/* <g clip-path="url(#clip0_87_45)"> */}
			<Path
				d="M26.0278 3.33437C23.0362 3.33033 20.0733 3.93204 17.3094 5.10492C14.5455 6.27779 12.035 7.9987 9.9224 10.1687C1.02782 19.2812 1.02782 34.0562 9.9224 43.1656C14.3727 47.7219 20.1988 50 26.0278 50C31.8569 50 37.6859 47.7219 42.1332 43.1656C51.0278 34.0531 51.0278 19.2781 42.1332 10.1687C40.0206 7.9987 37.5102 6.27779 34.7463 5.10492C31.9824 3.93204 29.0194 3.33033 26.0278 3.33437ZM39.9767 40.9562C38.1491 42.8387 35.9752 44.331 33.5809 45.347C31.1866 46.363 28.6194 46.8823 26.0278 46.875C23.4364 46.8817 20.8693 46.3621 18.4751 45.3462C16.0808 44.3302 13.9069 42.8382 12.0789 40.9562C8.35456 37.1406 6.30173 32.0656 6.30173 26.6656C6.30173 21.2656 8.35456 16.1937 12.0789 12.375C13.9065 10.4926 16.0804 9.00019 18.4747 7.98424C20.869 6.96829 23.4363 6.44894 26.0278 6.45625C31.2956 6.45625 36.2493 8.55937 39.9767 12.375C43.7041 16.1906 45.7539 21.2687 45.7539 26.6656C45.7539 32.0625 43.7011 37.1406 39.9767 40.9562ZM35.078 25H27.4523V14.0406C27.4523 13.6262 27.2916 13.2288 27.0056 12.9358C26.7196 12.6427 26.3317 12.4781 25.9272 12.4781C25.5227 12.4781 25.1347 12.6427 24.8487 12.9358C24.5627 13.2288 24.402 13.6262 24.402 14.0406V26.5625C24.402 26.9769 24.5627 27.3743 24.8487 27.6674C25.1347 27.9604 25.5227 28.125 25.9272 28.125H35.078C35.4825 28.125 35.8704 27.9604 36.1564 27.6674C36.4424 27.3743 36.6031 26.9769 36.6031 26.5625C36.6031 26.1481 36.4424 25.7507 36.1564 25.4576C35.8704 25.1646 35.4825 25 35.078 25Z"
				fill={color}
			/>
			{/* </g> */}
			{/* <defs>
				<clipPath id="clip0_87_45">
					<rect width="50" height="50" fill="white" />
				</clipPath>
			</defs> */}
		</Svg>
	);
};

export default TimeIcon;