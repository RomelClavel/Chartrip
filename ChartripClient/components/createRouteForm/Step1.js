import { View, ScrollView, Heading, VStack, Text, Pressable, Divider } from 'native-base';
import React, { useState } from 'react';
import TextInput from './TextInput';
import { COLORS } from '../../styles/Styling';
import { useForm } from 'react-hook-form';
import TextAreaInput from './TextAreaInput';
import CountryStateInput from './CountryStateInput';
import SliderTimeInput from './SliderTimeInput';
import ImgInput from './ImgInput';
import TagInput from './TagInput';

const Step1 = ({ jumpTo }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			country: '',
			state: '',
			description: '',
			timeMinMax: [3, 7],
			thumbnail: '',
			tags: [],
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		jumpTo('second');
	};

	const [scroll, setScroll] = useState(true);

	return (
		<View flex={1} style={{ backgroundColor: COLORS.custom.backgroundWhite }}>
			<ScrollView px={5} scrollEnabled={scroll}>
				<VStack mx="3">
					<Heading mt={4} alignSelf={'center'} fontWeight={'semibold'} fontSize={'xl'}>
						Add your Route details
					</Heading>
					<TextInput
						control={control}
						name={'name'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>
					<CountryStateInput
						control={control}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>
					<ImgInput
						control={control}
						name={'thumbnail'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>
					<TextAreaInput
						control={control}
						name={'description'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>
					<SliderTimeInput
						control={control}
						name={'timeMinMax'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
						setScroll={setScroll}
					/>

					<TagInput
						control={control}
						name={'tags'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>

					<Divider my={4} />
					<Pressable
						bgColor={'primary.500'}
						title="Submit"
						onPress={handleSubmit(onSubmit)}
						mb={10}
						alignSelf={'flex-end'}
						rounded={'lg'}
					>
						<Text px={4} py={4} color={'white'} fontSize={'md'} fontWeight={'semibold'}>
							Next Step
						</Text>
					</Pressable>
				</VStack>
			</ScrollView>
		</View>
	);
};

const labelStyles = {
	fontWeight: 'medium',
	opacity: 80,
	mt: '2',
	mb: '1',
};
const errorMsg = {
	fontWeight: 'medium',
	opacity: 80,
	color: 'error.500',
	my: '1',
	ml: '3',
};

export default Step1;
