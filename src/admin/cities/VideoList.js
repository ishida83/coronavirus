import React from "react";
import {
  List,
  Datagrid,
  DateField,
  TextField,
	NumberField,
	ImageField,
  EditButton,
  CreateButton,
  ExportButton,
  Filter,
  ReferenceInput,
  SelectInput,
  TextInput,
  ReferenceField,
	RichTextField,
  SimpleList,

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

const VideoList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List actions={<ListActions />} {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => `lat: ${record.lat|| record.latitude}, lon: ${record.lng || record.longitude}`}
          secondaryText={(record) => record.id}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="city" />
          <TextField source="state" />
					<NumberField source="latitude" />
					<NumberField source="lat" />
					<NumberField source="longitude" />
					<NumberField source="lng" />
					<NumberField source="population" />
					<ImageField source="image" title="city" />
					<ImageField source="imageUrl" />
					<RichTextField source="videoUrl" />

          {/* <ReferenceField source="userId" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <DateField source="published_at" />
          <TextField source="average_note" />
          <TextField source="views" /> */}
          <EditButton basePath="/cities" />
        </Datagrid>
      )}
    </List>
  );
};

export default VideoList;
