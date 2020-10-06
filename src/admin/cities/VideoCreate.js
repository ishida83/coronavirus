import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
} from "react-admin";

export default function VideoCreate(props) {
  return (
    <Create title="Create a Vlog" {...props}>
      <SimpleForm>
        <TextInput source="city" />
        <TextInput source="state" />
        <NumberInput source="lat" label="Latitude" />
        <NumberInput source="lng" label="Longitude" />
        <TextInput source="imageUrl" label="预览Gif Url" />
        <TextInput source="videoUrl" options={{ multiline: true }} label="第三方视频分享代码" />
      </SimpleForm>
    </Create>
  );
}
