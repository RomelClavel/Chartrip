import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Box, Image, Pressable, Text } from 'native-base';
import ImgIcon from '../../icons/ImgIcon';
import { COLORS } from '../../styles/Styling';

const ImgInput = ({ control, errors, labelStyles, errorMsg }) => {
	const [image, setImage] = useState('');
	const pickImage = async (onChange) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: true,
		});

		if (!result.cancelled) {
			// setImage({ image: result.uri });

			//MAKE PNG
			// let base64Img = `data:image/jpg;base64,${result.base64}`;
			let base64Img = `data:image/png;base64,${result.base64}`;

			let apiUrl = 'https://api.cloudinary.com/v1_1/dyicovnlz/upload';
			let data = {
				file: base64Img,
				upload_preset: 'ep160veg',
			};

			fetch(apiUrl, {
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json',
				},
				method: 'POST',
			})
				.then(async (r) => {
					let data = await r.text();
					const parsedData = JSON.parse(data);

					// const imageSet =
					// 	parsedData.secure_url.slice(0, parsedData.secure_url.length - 3) + 'png';
					const imageSet = parsedData.secure_url;
					onChange(imageSet);
					setImage(imageSet);
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<>
			<Text {...labelStyles}> Add a photo</Text>

			<Controller
				name="thumbnail"
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Box>
						{image.length > 0 ? (
							<Image
								source={{
									uri: image,
								}}
								alt="AltText"
								size={200}
								rounded={'lg'}
								alignSelf={'center'}
							/>
						) : (
							<Pressable
								alignSelf={'center'}
								justifyContent={'center'}
								alignItems={'center'}
								width={'90%'}
								bgColor={COLORS.custom.grey}
								rounded={'lg'}
								onPress={() => pickImage(onChange)}
								// onPress={() => {
								// 	setImage('j');
								// }}
							>
								<ImgIcon size={180} color={'white'} />
							</Pressable>
						)}
					</Box>
				)}
			/>
			{errors.thumbnail && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default ImgInput;