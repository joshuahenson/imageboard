import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import ImageCard from './ImageCard';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
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
  render() {
    const { userId } = this.props;
    return (
      <div className="container">
        <Masonry
          className="masonry"
          options={{
            fitWidth: true,
            gutter: 10
          }}
        >
          {this.state.images.map((image, i) => <ImageCard key={i} image={image} userId={userId} />)}
        </Masonry>
      </div>
  );
  }
}

Board.propTypes = {
  userId: PropTypes.string
};

export default Board;
