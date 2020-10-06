import React from "react";
import { Edit, SimpleForm, TextInput, DateInput, NumberInput } from "react-admin";

const VideoEdit = (props) => (
  <Edit title={<span>{props ? `"${props.id}"` : ""}</span>} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
			<TextInput source="city" />
			<TextInput source="state" />
      <NumberInput source="lat" label="Latitude" />
      <NumberInput source="lng" label="Longitude" />
			<TextInput source="imageUrl" label="预览Gif Url" />
      <TextInput source="videoUrl" options={{ multiline: true }} label="第三方视频分享代码"/>
      {/* <TextInput multiline source="videoUrl" /> */}
    </SimpleForm>
  </Edit>
);

export default VideoEdit;
