import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Grid } from 'semantic-ui-react';
import { HeaderStyle, TotalHead } from './partialStyle';
import logo from '../images/Mask_icon.png';

const Heading = () => (
  <TotalHead>
    <Grid
      columns="3"
      textAlign="center"
      verticalAlign="middle"
      padded
      stackable
    >
      <Grid.Row>
        <Grid.Column width={5}>
          <Link to="/">
            <Image src={logo} alt="Logo for Bandit Auctions" size="medium" />
          </Link>
        </Grid.Column>
        <Grid.Column width={3}>
          <HeaderStyle>Bandit Auctions</HeaderStyle>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </TotalHead>
);

export default Heading;
