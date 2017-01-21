import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import placeholder from './images/camera.png';

class Board extends Component {
  constructor(props) {
    super(props);
    // blank url string causes all imageModal images to error out.
    this.state = {
      images: [],
      deleting: false,
      imageModal: {
        active: false,
        url: placeholder,
        id: '',
        description: '',
        userImage: false
      }
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  handleDelete(imageId) {
    this.setState({ deleting: true });
    axios.delete(`/api/image?ID=${imageId}`)
      .then(() => {
        this.setState({
          deleting: false,
          images: this.state.images.filter(image => image._id !== imageId)
        });
        this.closeImageModal();
      })
      .catch(() => {
        this.setState({ deleting: false });
        this.closeImageModal();
        this.props.showNotification('SERVER ERROR: Please try again', 'is-danger');
      });
  }
  openImageModal(url, description, id, userImage) {
    this.setState({ imageModal: { active: true, url, description, id, userImage } });
  }
  closeImageModal() {
    this.setState({
      imageModal: {
        active: false,
        url: placeholder,
        id: '',
        description: '',
        userImage: false
      }
    });
  }
  render() {
    const { userId, params, showNotification } = this.props;
    const { imageModal, deleting } = this.state;
    let images = this.state.images;
    if (params.userId) {
      images = this.state.images.filter(image => image.user.userId === params.userId);
    }
    return (
      <div className="container">
        <ImageModal
          active={imageModal.active} url={imageModal.url} deleting={deleting} handleDelete={this.handleDelete}
          description={imageModal.description} closeImageModal={this.closeImageModal} id={imageModal.id}
          userImage={imageModal.userImage}
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
              openImageModal={this.openImageModal} showNotification={showNotification}
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
  showNotification: PropTypes.func
};

export default Board;
