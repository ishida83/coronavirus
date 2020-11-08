
import React from 'react'
import PropTypes from 'prop-types'
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import IconButton from "@material/react-icon-button";
import Button from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";

import {
  Body1,
  Body2,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography';

import './ShoppingItem.scss';

const ShoppingItem = props => {
	const clickViaIcon = () => {

	}
	const clickViaButton = () => {}
	return (
    <Card className="mdc-card demo-card demo-ui-control demo-card-shaped">
      <CardPrimaryContent className="demo-card__primary-action">
        <CardMedia square imageUrl={props.imageUrl} className="demo-card__media" />
        <div className="demo-card__primary">
          <Headline6 className="demo-card__title">
            南翔小笼
          </Headline6>
          <Subtitle2 className="demo-card__subtitle">南翔小笼原名“南翔大肉馒头”、“南翔大馒头”、“古猗园小笼”,也称为...</Subtitle2>
        </div>
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <Button>值</Button>
          <Button>直达链接</Button>
        </CardActionButtons>
        <CardActionIcons>
          <IconButton>
            <MaterialIcon icon="favorite_border" />
          </IconButton>
          <IconButton>
            <MaterialIcon icon="share" />
          </IconButton>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
}

ShoppingItem.propTypes = {
	imageUrl: PropTypes.string
}

export default ShoppingItem
