import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import ImageCard from './ImageCard';

const dummyData = [];

// TODO: Remove dummyData
// eslint-disable-next-line
// for (let i = 0; i < 10; i++) {
//   dummyData.push(`http://placehold.it/${Math.floor(Math.random() * (500 - 200)) + 200}x${Math.floor(Math.random() * (500 - 200)) + 200}`);
// }

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }
  render() {
    return (
      <div className="container">
        <Masonry
          className="masonry"
          options={{
            fitWidth: true,
            gutter: 10
          }}
        >
          {dummyData.map((src, i) => <ImageCard key={i} src={src} />)}
        </Masonry>
      </div>
  );
  }
}

export default Board;
