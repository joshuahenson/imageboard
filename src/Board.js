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
        id: '',
        description: '',
        userImage: false
      },
      deleting: false
    };
    this.closeModal = this.closeModal.bind(this);
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
        this.closeModal();
      })
      .catch((err) => {
        this.setState({ deleting: false });
        this.closeModal();
        console.error(err);
      }); // TODO: ISSUE MESSAGE
  }
  openModal(url, description, id, userImage) {
    this.setState({ modal: { active: true, url, description, id, userImage } });
  }
  closeModal() {
    this.setState({
      modal: {
        active: false,
        url: './camera.png',
        id: '',
        description: '',
        userImage: false
      }
    });
  }
  render() {
    const { userId, params } = this.props;
    const { modal, deleting } = this.state;
    let images = this.state.images;
    if (params.userId) {
      images = this.state.images.filter(image => image.user.userId === params.userId);
    }
    return (
      <div className="container">
        <ImageModal
          active={modal.active} url={modal.url} deleting={deleting} handleDelete={this.handleDelete}
          description={modal.description} closeModal={this.closeModal} id={modal.id}
          userImage={modal.userImage}
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
