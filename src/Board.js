import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      modal: {
        active: false,
        url: '',
        description: ''
      }
    };
    this.likeHandler = this.likeHandler.bind(this);
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
  likeHandler(index, userId, imageId) {
    if (userId) {
      // optimistic update of state
      const newImagesState = this.state.images.slice(0);
      newImagesState[index].likes.push(userId);
      this.setState({ images: newImagesState });
      // update server
      axios.post('/api/image', { imageId })
      .then(res => console.log(res))
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
        url: '',
        description: ''
      }
    });
  }
  render() {
    const { userId } = this.props;
    const { modal } = this.state;
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
          {this.state.images.map((image, i) => (
            <ImageCard
              key={i} image={image} userId={userId} index={i}
              likeHandler={this.likeHandler} openModal={this.openModal}
            />
          ))}
        </Masonry>
      </div>
  );
  }
}

Board.propTypes = {
  userId: PropTypes.string
};

export default Board;
