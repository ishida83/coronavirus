
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
          <p className="demo-card__title">
            Our Changing Planet
          </p>
          <p className="demo-card__subtitle">by Kurt Wagner</p>
        </div>
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <Button>Read</Button>
          <Button>Bookmark</Button>
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
