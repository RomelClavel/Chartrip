import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Box, Image, Pressable, Skeleton, Spinner, Text } from 'native-base';
import ImgIcon from '../../icons/ImgIcon';
import { COLORS } from '../../styles/Styling';
import Constants from 'expo-constants';
import ProfileIcon from '../../icons/ProfileIcon';

const ImgInput = ({ name = 'thumbnail', control, errors, labelStyles, errorMsg, user = false }) => {
	const [image, setImage] = useState('');
	const [loading, setLoading] = useState(false);
	const pickImage = async (onChange) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: true,
		});
		if (!result.cancelled) {
			setLoading(true);

			//MAKE PNG
			let base64Img = `data:image/png;base64,${result.base64}`;

			let apiUrl = Constants.manifest.extra.CLOUDINARY_URL;
			let data = {
				file: base64Img,
				upload_preset: Constants.manifest.extra.PRESET_CLOUDINARY_NAME,
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
					const imageSet = parsedData.secure_url;
					console.log(imageSet);
					onChange(imageSet);
					setImage(imageSet);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<>
			<Text {...labelStyles}> Add a photo</Text>

			<Controller
				name={name}
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
								size={user ? 150 : 200}
								rounded={user ? 'full' : 'lg'}
								alignSelf={'center'}
							/>
						) : (
							<Box
								height={user ? 150 : 180}
								alignItems={'center'}
								justifyContent={'center'}
							>
								{!loading ? (
									<Pressable
										alignSelf={'center'}
										justifyContent={'center'}
										alignItems={'center'}
										width={user ? '150' : '90%'}
										bgColor={COLORS.custom.grey}
										rounded={user ? 'full' : 'lg'}
										onPress={() => pickImage(onChange)}
									>
										{user ? (
											<ProfileIcon size={150} color={'white'} />
										) : (
											<ImgIcon size={180} color={'white'} />
										)}
									</Pressable>
								) : (
									<Spinner size={'lg'} />
								)}
							</Box>
						)}
					</Box>
				)}
			/>
			{errors.thumbnail && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default ImgInput;
