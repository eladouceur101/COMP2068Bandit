import React from 'react';
import Axios from 'axios';
import { Form, Container, Icon, Segment, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class Edit extends React.Component {
  state = {
    selectedID: this.props.match.params.id,
    selectedArt: {},
    artName: '',
    description: '',
    price: 0,
    artist: {
      name: '',
      born: '',
      died: '',
      nationality: '',
    },
    file: {},
  };

  componentDidMount = () => {
    Axios.get(`/api/${this.state.selectedID}`).then(res => {
      this.setState({
        artName: res.data.artName,
        description: res.data.description,
        price: res.data.price,
        artist: res.data.artist,
        selectedArt: res.data,
        imgURL: res.data.imgURL,
      });
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleArtistChange = (e, { name, value }) =>
    this.setState({ artist: { ...this.state.artist, [name]: value } });

  handleSubmit = () => {
    const data = {
      artName: this.state.artName,
      description: this.state.description,
      price: this.state.price,
      artist: this.state.artist,
    };
    console.log(data.artName);

    const formData = new FormData();

    formData.append('art', JSON.stringify(data));
    console.log(this.state.file[0]);
    formData.append('file', this.state.file[0]);

    Axios.post(`/api/${this.state.selectedID}`, formData)
      .then(res => this.props.history.push('/'))
      .catch(res => console.log(res));
  };

  onDrop(acceptedFile, rejectedFiles) {
    this.setState({ file: acceptedFile }, () => console.log(this.state.file));
  }

  render() {
    return (
      <Segment raised>
        {this.state.selectedArt.artist && (
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Dropzone accept="image/*" onDrop={files => this.onDrop(files)}>
                <Container textAlign="center">
                  {this.state.file.length > 0 ? (
                    <img
                      src={URL.createObjectURL(this.state.file[0])}
                      alt="Uploaded File"
                      style={{ height: '200px', width: '200px' }}
                    />
                  ) : (
                    <div>
                      <img
                        src={`http://localhost:3000/${this.state.imgURL}`}
                        alt="Uploaded File"
                        style={{ height: '200px', width: '200px' }}
                      />
                    </div>
                  )}
                </Container>
              </Dropzone>
              <Form.Input
                fluid
                name="artName"
                label="Art Title"
                placeholder="Art Title"
                value={this.state.artName}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="description"
                label="Description"
                placeholder="Description"
                value={this.state.description}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="price"
                label="Listing Price"
                placeholder="Listing Price"
                value={this.state.price}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="name"
                label="Artist"
                placeholder="Artist"
                value={this.state.artist.name}
                required
                onChange={this.handleArtistChange}
              />
              <Form.Input
                fluid
                name="born"
                label="Artist DOB"
                placeholder="Artist DOB"
                value={this.state.artist.born}
                required
                onChange={this.handleArtistChange}
              />
              <Form.Input
                fluid
                name="died"
                label="Artist Death"
                placeholder="Artist Death"
                value={this.state.artist.died}
                onChange={this.handleArtistChange}
              />
              <Form.Input
                fluid
                name="nationality"
                label="Artist Nationality"
                placeholder="Artist Nationality"
                value={this.state.artist.nationality}
                required
                onChange={this.handleArtistChange}
              />
              <Form.Button color="green" content="Submit" />{' '}
              <Button color="blue" href="/">
                Home
              </Button>
            </Form>
          </Container>
        )}
      </Segment>
    );
  }
}

export default Edit;
