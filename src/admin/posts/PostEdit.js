import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";
import PostTitle from "./PostTitle";

const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="teaser" options={{ multiLine: true }} />
      <TextInput multiline source="body" />
      <DateInput label="Publication date" source="published_at" />
      <TextInput source="average_note" />
      <TextInput disabled label="Nb views" source="views" />
    </SimpleForm>
  </Edit>
);

export default PostEdit;
