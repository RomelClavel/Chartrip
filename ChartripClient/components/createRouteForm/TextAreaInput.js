import { Text, TextArea } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';

const TextAreaInput = ({ name, control, errors, labelStyles, errorMsg, placeholder }) => {
	return (
		<>
			<Text {...labelStyles}> {name.charAt(0).toUpperCase() + name.slice(1)}</Text>
			<Controller
				name={name}
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextArea
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						size="lg"
						placeholder={placeholder}
					/>
				)}
			/>
			{errors[name] && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default TextAreaInput;
