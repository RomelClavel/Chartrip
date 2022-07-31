import { Badge, HStack, Pressable, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const TagInput = ({ control, errors, labelStyles, errorMsg }) => {
	const [tags, setTags] = useState([]);
	useEffect(() => {
		const fetchTags = async () => {
			try {
				const data = await fetch('http://192.168.1.215:3001/tags');
				const tagsData = await data.json();
				setTags(tagsData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTags();
	}, []);
	const [selectedTags, setSelectedTags] = useState([]);

	const selectTag = (tag, onChange) => {
		if (!selectedTags.includes(tag)) {
			setSelectedTags((prev) => {
				onChange([...prev, tag]);
				return [...prev, tag];
			});
		} else {
			// setSelectedTags([...selectedTags.filter((tagId) => tagId !== id)]);
			setSelectedTags(() => {
				const newTags = selectedTags.filter((t) => t.id !== tag.id);
				onChange(newTags);
				return newTags;
			});
		}
	};
	return (
		<>
			<Text {...labelStyles}> Select some Tags for your Route</Text>
			<Controller
				name="tags"
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<HStack flexWrap={'wrap'} mt={2}>
						{tags.map((tag, index) => {
							return (
								<Pressable
									key={index}
									onPress={() => {
										selectTag(tag, onChange);
									}}
								>
									<Badge
										mx={1}
										mb={2}
										rounded={'lg'}
										// {...tagIsSelected(tag)}

										bgColor={
											selectedTags.includes(tag) ? 'primary.500' : 'white'
										}
										variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
										borderColor={'primary.500'}
										borderWidth={2}
									>
										<Text
											p={1}
											color={
												selectedTags.includes(tag) ? 'white' : 'primary.500'
											}
											fontWeight={'medium'}
										>
											{tag.title}
										</Text>
									</Badge>
								</Pressable>
							);
						})}
					</HStack>
				)}
			/>
			{errors.tags && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default TagInput;
