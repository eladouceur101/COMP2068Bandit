import React from 'react';
import {
  Grid,
  Image,
  Button,
  Icon,
  Card,
  Container,
  Segment,
} from 'semantic-ui-react';
import '../style/homeStyle.css';
import Axios from 'axios';
import { ArtCard } from './indexStyle';

class Home extends React.Component {
  state = {
    arts: [],
  };
  componentDidMount = () => {
    this.refresh();
  };

  refresh = () => {
    Axios.get('/api')
      .then(res => {
        this.setState({ arts: res.data });
      })
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    Axios.post(`/api/${id}/delete`).then(() => this.refresh());
  };

  render() {
    return (
      <div>
        <Segment raised inverted color="purple">
          <Container textAlign="center">
            <Button color="green" href="/create" animated>
              <Button.Content visible>Add New Listing</Button.Content>
              <Button.Content hidden>
                <Icon name="plus circle" />
              </Button.Content>
            </Button>
          </Container>
          <ArtCard>
            <Grid columns="three">
              <Grid.Row centered columns={4}>
                {console.log(this.state.arts)}
                {this.state.arts &&
                  this.state.arts.map(art => (
                    <Grid.Column centered>
                      <ArtCard>
                        <Card>
                          <Image src={`http://localhost:3000/${art.imgURL}`} />
                          <Card.Content>
                            <Card.Header>{art.artName}</Card.Header>
                            <Card.Meta>
                              <span className="date">{art.artist.name}</span>
                            </Card.Meta>
                            <Card.Description>
                              {art.description}
                            </Card.Description>
                            <br />
                            <Card.Header>${art.price}</Card.Header>
                          </Card.Content>
                          <Card.Content extra>
                            <div className="ui three buttons">
                              <Button
                                animated
                                color="green"
                                href={`/view/${art._id}`}
                              >
                                <Button.Content visible>View</Button.Content>
                                <Button.Content hidden>
                                  <Icon name="shop" />
                                </Button.Content>
                              </Button>
                              <Button
                                href={`/edit/${art._id}`}
                                color="blue"
                                animated
                              >
                                <Button.Content visible>Edit</Button.Content>
                                <Button.Content hidden>
                                  <Icon name="edit" />
                                </Button.Content>
                              </Button>
                              <Button
                                animated
                                color="red"
                                onClick={e => {
                                  if (
                                    window.confirm(
                                      'Are you sure you wish to steal this item?',
                                    )
                                  )
                                    this.handleDelete(art._id);
                                }}
                              >
                                <Button.Content visible>Delete</Button.Content>
                                <Button.Content hidden>
                                  <Icon name="trash alternate" />
                                </Button.Content>
                              </Button>
                            </div>
                          </Card.Content>
                        </Card>
                      </ArtCard>
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </ArtCard>
        </Segment>
      </div>
    );
  }
}
export default Home;
