import React from 'react';
import Axios from 'axios';
import Host from '../config/api';
import {
  Container,
  Button,
  Segment,
  Label,
  Image,
  Grid,
  ButtonGroup,
} from 'semantic-ui-react';

class view extends React.Component {
  state = {
    selectedID: this.props.match.params.id,
    art: {},
  };

  componentDidMount = () => {
    Axios.get(`${Host}/${this.state.selectedID}`).then(res => {
      this.setState({ art: res.data });
    });
  };

  handleDelete = id => {
    Axios.post(`${Host}/${id}/delete`).then(() => this.props.history.push('/'));
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <Segment raised>
        {this.state.art.artist && (
          <Container>
            <Grid columns={2} padded="horizontally">
              <Grid.Column>
                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="red" ribbon>
                      Title
                    </Label>
                    <span>{this.state.art.artName}</span>
                  </Grid.Row>
                </Segment>

                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="blue" ribbon>
                      Description
                    </Label>
                    {/* to do */}
                    <span>{this.state.art.description}</span>
                  </Grid.Row>
                </Segment>

                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="green" ribbon>
                      Price
                    </Label>
                    {/* to do */}
                    <span>{this.state.art.price}</span>
                  </Grid.Row>
                </Segment>

                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="purple" ribbon>
                      Artist
                    </Label>
                    {/* to do */}
                    <span>{this.state.art.artist.name}</span>
                  </Grid.Row>
                </Segment>

                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="brown" ribbon>
                      Nationality
                    </Label>
                    {/* to do */}
                    <span>{this.state.art.artist.nationality}</span>
                  </Grid.Row>
                </Segment>

                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="yellow" ribbon>
                      Birth
                    </Label>
                    {/* to do */}
                    <span>{this.state.art.artist.born}</span>
                  </Grid.Row>
                </Segment>

                <Segment raised>
                  <Grid.Row>
                    <Label as="a" color="grey" ribbon>
                      Death
                    </Label>
                    {/* to do */}
                    <span>{this.state.art.artist.died}</span>
                  </Grid.Row>
                </Segment>
                <Segment raised>
                  <Grid.Row>
                    <ButtonGroup>
                      <Button color="blue" href={`/edit/${this.state.art._id}`}>
                        Edit
                      </Button>
                      <Button.Or />
                      <Button
                        color="green"
                        onClick={e => {
                          if (
                            window.confirm(
                              'Are you sure you wish to steal this item?',
                            )
                          )
                            this.handleDelete(this.state.art._id);
                        }}
                      >
                        Buy
                      </Button>
                      <Button.Or />
                      <Button color="red" href="/">
                        Home
                      </Button>
                    </ButtonGroup>
                  </Grid.Row>
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment raised>
                  <Image
                    src={`http://localhost:3000/${this.state.art.imgURL}`}
                  />
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        )}
      </Segment>
    );
  }
}
export default view;
