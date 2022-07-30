import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { HStack, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { COLORS } from '../../styles/Styling';

const SliderTimeInput = ({ control, errors, labelStyles, errorMsg, setScroll }) => {
	const [multiSliderValue, setMultiSliderValue] = useState([3, 7]);

	const multiSliderValuesChange = (values) => setMultiSliderValue(values);

	// const [scroll, setScroll] = useState(true);
	return (
		<>
			<Text {...labelStyles}> How long does it take to complete</Text>
			<Controller
				name="timeMinMax"
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<HStack alignItems={'center'} justifyContent={'space-between'}>
						<Text fontWeight={'medium'}> {multiSliderValue[0]} hr </Text>
						<MultiSlider
							values={[multiSliderValue[0], multiSliderValue[1]]}
							sliderLength={250}
							onValuesChange={multiSliderValuesChange}
							onValuesChangeStart={() => setScroll(false)}
							onValuesChangeFinish={(value) => {
								setScroll(true);
								onChange(value);
							}}
							min={1}
							max={8}
							selectedStyle={{
								backgroundColor: COLORS.custom.primary,
							}}
							trackStyle={{
								height: 4,
								backgroundColor: COLORS.custom.grey,
							}}
						/>
						<Text fontWeight={'medium'}> {multiSliderValue[1]} hr </Text>
					</HStack>
				)}
			/>
			{errors.timeMinMax && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default SliderTimeInput;
