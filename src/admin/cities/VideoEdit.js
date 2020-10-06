import React from "react";
import { Edit, SimpleForm, TextInput, DateInput, NumberInput, TopToolbar, ListButton } from "react-admin";

import ChevronLeft from '@material-ui/icons/ChevronLeft';

export const VideoEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const VideoEdit = (props) => (
  <Edit title={<span>{props ? `"${props.id}"` : ""}</span>} actions={<VideoEditActions />} {...props}>
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
