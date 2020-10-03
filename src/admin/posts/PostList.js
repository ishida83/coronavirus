import React from "react";
import {
  List,
  Datagrid,
  DateField,
  TextField,
  EditButton,
  CreateButton,
  ExportButton,
  Filter,
  ReferenceInput,
  SelectInput,
  TextInput,
  ReferenceField,
  SimpleList,

  RichTextField,
  TopToolbar
} from "react-admin";

import { useMediaQuery } from "@material-ui/core";
import { ImportButton } from "react-admin-import-csv";

const ListActions = props => {
  const { 
    className, 
    basePath, 
    total, 
    resource, 
    currentSort, 
    filterValues, 
    exporter 
  } = props;
  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filter={filterValues}
        exporter={exporter}
      />
      <ImportButton {...props} />
    </TopToolbar>
  );
};
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
    <List filters={<PostFilter />} actions={<ListActions />} {...props}>
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
