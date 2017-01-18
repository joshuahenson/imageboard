import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

class Board extends Component {
  constructor(props) {
    super(props);
    // blank url string causes all modal images to error out.
    this.state = {
      images: [],
      modal: {
        active: false,
        url: './camera.png',
        description: ''
      }
    };
    this.handleLike = this.handleLike.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    axios.get('/api/images')
      .then((res) => {
        this.setState({ images: res.data.images });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleLike(userId, imageId) {
    if (userId) {
      // optimistic update of state
      const index = this.state.images.map((image) => { return image._id; }).indexOf(imageId);
      const newImagesState = this.state.images.slice(0);
      newImagesState[index].likes.push(userId);
      this.setState({ images: newImagesState });
      // update server
      axios.post('/api/image', { imageId })
      .then()
      .catch(err => console.error(err)); // TODO: Revert State / issue message
    } else {
      console.log('not logged in'); // TODO: ISSUE MESSAGE
    }
  }
  openModal(url, description) {
    this.setState({ modal: { active: true, url, description } });
  }
  closeModal() {
    this.setState({
      modal: {
        active: false,
        url: './camera.png',
        description: ''
      }
    });
  }
  render() {
    const { userId, params } = this.props;
    const { modal } = this.state;
    let images = this.state.images;
    if (params.userId) {
      images = this.state.images.filter(image => image.user.userId === params.userId);
    }
    return (
      <div className="container">
        <ImageModal
          active={modal.active} url={modal.url}
          description={modal.description} closeModal={this.closeModal}
        />
        <Masonry
          className="masonry"
          options={{
            fitWidth: true,
            gutter: 10
          }}
        >
          {images.map(image => (
            <ImageCard
              key={image._id} image={image} userId={userId}
              handleLike={this.handleLike} openModal={this.openModal}
            />
          ))}
        </Masonry>
      </div>
  );
  }
}

Board.propTypes = {
  userId: PropTypes.string,
  params: PropTypes.object,
};

export default Board;
