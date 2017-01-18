const sanitizeHtml = require('sanitize-html');
const Image = require('../models/image');

function addImage(req, res) {
  if (!req.body.url || !req.body.description) {
    console.log('empty');
    res.status(400).end();
  } else {
    const newImage = new Image(req.body);
    // Let's sanitize inputs
    newImage.url = sanitizeHtml(newImage.url).trim();
    newImage.description = sanitizeHtml(newImage.description).trim();
    newImage.user = req.user._id;

    newImage.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).end();
    });
  }
}

function getImages(req, res) {
  Image.find().sort('-date').populate('user').exec((err, images) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ images });
  });
}

function likeImage(req, res) {
  Image.update({ _id: req.body.imageId }, { [req.body.like ? '$push' : '$pull']: { likes: req.user.userId } }, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

function deleteImage(req, res) {
  if (!req.query.ID) {
    res.status(400).end();
  }
  Image.findOneAndRemove({ _id: req.query.ID, user: req.user._id }, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

module.exports = { addImage, getImages, likeImage, deleteImage };
