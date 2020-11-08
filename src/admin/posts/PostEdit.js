import React from "react";
import { Edit, SimpleForm, TextInput, DateInput, TopToolbar, ListButton, ShowButton } from "react-admin";
import PostTitle from "./PostTitle";

import ChevronLeft from '@material-ui/icons/ChevronLeft';

export const PostEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const PostEdit = (props) => (
  <Edit title={<PostTitle />} actions={<PostEditActions />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="teaser" options={{ multiline: true }} />
      <TextInput multiline source="body" />
      <DateInput label="Publication date" source="published_at" />
      <TextInput source="average_note" />
      <TextInput disabled label="Nb views" source="views" />
    </SimpleForm>
  </Edit>
);

export default PostEdit;
