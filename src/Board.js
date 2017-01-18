import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Notification from './Notification';

class Board extends Component {
  constructor(props) {
    super(props);
    // blank url string causes all imageModal images to error out.
    this.state = {
      images: [],
      deleting: false,
      imageModal: {
        active: false,
        url: './camera.png',
        id: '',
        description: '',
        userImage: false
      },
      notification: {
        active: false,
        message: '',
        type: ''
      }
    };
    this.closeImageModal = this.closeImageModal.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.openModal = this.openModal.bind(this);
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
      .catch((err) => {
        this.setState({ deleting: false });
        this.closeImageModal();
        console.error(err);
      }); // TODO: ISSUE MESSAGE
  }
  openModal(url, description, id, userImage) {
    this.setState({ imageModal: { active: true, url, description, id, userImage } });
  }
  closeImageModal() {
    this.setState({
      imageModal: {
        active: false,
        url: './camera.png',
        id: '',
        description: '',
        userImage: false
      }
    });
  }
  closeNotification() {
    this.setState({
      notification: {
        active: false,
        message: '',
        type: ''
      }
    });
  }
  render() {
    const { userId, params } = this.props;
    const { imageModal, deleting, notification } = this.state;
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
        <Notification notificationState={notification} closeNotification={this.closeNotification} />
        <Masonry
          className="masonry"
          options={{
            fitWidth: true,
            gutter: 10
          }}
        >
          {images.map(image => (
            <ImageCard
              key={image._id} image={image} userId={userId} openModal={this.openModal}
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
