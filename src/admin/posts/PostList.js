import React from "react";
import {
  List,
  Datagrid,
  DateField,
  TextField,
  EditButton,
  Filter,
  ReferenceInput,
  SelectInput,
  TextInput,
  ReferenceField,
  SimpleList,
} from "react-admin";

import { useMediaQuery } from "@material-ui/core";

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

const PostList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={<PostFilter />} {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <ReferenceField source="userId" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <DateField source="published_at" />
          <TextField source="average_note" />
          <TextField source="views" />
          <EditButton basePath="/posts" />
        </Datagrid>
      )}
    </List>
  );
};

export default PostList;
