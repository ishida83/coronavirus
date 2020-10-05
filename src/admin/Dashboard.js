// in src/Dashboard.js
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import { Title, } from "react-admin";

import LocaleSwitcher from './LocaleSwitcher';


export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      <LocaleSwitcher />
    </CardContent>
  </Card>
);
