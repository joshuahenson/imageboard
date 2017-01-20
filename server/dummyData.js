const Image = require('./models/image');
const User = require('./models/user');

function dummyData() {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    console.log('Creating users');
    const userOne = new User({
      userId: 'sampleUserOne',
      displayName: 'userOne',
      userName: 'userOne',
      profilePhoto: 'https://randomuser.me/api/portraits/women/11.jpg'
    });
    userOne.save();

    const userTwo = new User({
      userId: 'sampleUserTwo',
      displayName: 'userTwo',
      userName: 'userTwo',
      profilePhoto: 'https://randomuser.me/api/portraits/women/21.jpg'
    });
    userTwo.save();

    console.log('Creating images');
    const userArr = [userOne._id, userTwo._id];
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus egestas tellus. Donec fringilla pellentesque blandit. Sed tellus nulla, pulvinar vel tortor ut, consequat suscipit quam. Nulla at maximus nibh. Curabitur et consectetur nulla, ut tempus sem. Donec lacinia massa est, a congue mi vestibulum iaculis. Curabitur tempor luctus lorem, quis vehicula justo ornare non. Quisque eget auctor urna. Etiam id bibendum velit, in sodales lacus. Pellentesque quis sem non lacus maximus finibus. Nulla ultrices risus libero, in elementum massa tempus ac. Suspendisse tempor vel quam vel faucibus.';
    const loremArr = lorem.split(' ');
    const loremLength = loremArr.length;
    for (let i = 0; i < 20; i++) {
      const randStart = Math.floor(Math.random() * loremLength);
      const randRange = Math.ceil(Math.random() * 6);
      const likes = 'x'.repeat(4 - Math.sqrt(Math.random() * 24)).split('');
      const newImg = new Image({
        url: `https://unsplash.it/${Math.floor(Math.random() * (650 - 300)) + 300}/${Math.floor(Math.random() * (500 - 300)) + 300}?image=${Math.floor(Math.random() * 1084)}`,
        description: loremArr.slice(randStart, randStart + randRange).join(' '),
        user: userArr[Math.round(Math.random())],
        likes
      });
      newImg.save();
    }
  });
}

module.exports = dummyData;
