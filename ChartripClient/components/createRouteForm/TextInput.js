import { Input, Text } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';

const TextInput = ({ name, control, errors, labelStyles, errorMsg }) => {
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
					<Input onBlur={onBlur} onChangeText={onChange} value={value} size="lg" mt={2} />
				)}
			/>
			{errors[name] && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default TextInput;
