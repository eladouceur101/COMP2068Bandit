import React from 'react';
import Axios from 'axios';
import Host from '../config/api';
import { Form, Container, Icon, Segment } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class create extends React.Component {
  state = {
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

    Axios.post(Host, formData)
      .then(res => this.props.history.push('/'))
      .catch(res => console.log(res));
  };

  onDrop(acceptedFile, rejectedFiles) {
    this.setState({ file: acceptedFile }, () => console.log(this.state.file));
  }

  render() {
    return (
      <Segment raised>
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
                    <br />
                    <h3>
                      Drag Art Image File on here, or click to select file to
                      upload
                    </h3>
                    <Icon name="plus circle" />
                  </div>
                )}
              </Container>
            </Dropzone>

            <Form.Input
              fluid
              name="artName"
              label="Art Title"
              placeholder="Art Title"
              required
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="description"
              label="Description"
              placeholder="Description"
              required
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="price"
              label="Listing Price"
              placeholder="Listing Price"
              required
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="name"
              label="Artist"
              placeholder="Artist"
              required
              onChange={this.handleArtistChange}
            />
            <Form.Input
              fluid
              name="born"
              label="Artist DOB"
              placeholder="Artist DOB"
              required
              onChange={this.handleArtistChange}
            />
            <Form.Input
              fluid
              name="died"
              label="Artist Death"
              placeholder="Artist Death"
              onChange={this.handleArtistChange}
            />
            <Form.Input
              fluid
              name="nationality"
              label="Artist Nationality"
              placeholder="Artist Nationality"
              required
              onChange={this.handleArtistChange}
            />
            <Form.Button content="Submit" />
          </Form>
        </Container>
      </Segment>
    );
  }
}

export default create;
