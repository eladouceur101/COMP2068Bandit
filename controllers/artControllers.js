const Art = require('../models/art');

exports.index = (req, res) => {
  Art.find()
    .then(art => res.status(200).send(art))
    .catch(err => res.status(500).send(err));
};

exports.show = (req, res) => {
  Art.findById({
    _id: req.params.id,
  })
    .then(art => res.status(200).send(art))
    .catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  console.log(req.files.file);
  if (!req.files) return res.status(500).send('No file were uploaded.');

  let image = req.files.file;

  let uploadLocation = `public/art/${image.name}`;

  let art = JSON.parse(req.body.art);
  console.log(art.artName);

  image.mv(uploadLocation, err => {
    if (err) return res.status(500).send(err);
    console.log(art.artName);
    Art.create({
      artName: art.artName,
      imgURL: `art/${image.name}`,
      description: art.description,
      price: art.price,
      artist: {
        name: art.artist.name,
        born: art.artist.born,
        died: art.artist.died,
        nationality: art.artist.nationality,
      },
    })
      .then(() => res.status(200).send({ message: 'art added' }))
      .catch(err => {
        res.status(500).send(err);
        console.log(err);
      });
  });
};

exports.update = (req, res) => {
  if (req.files) {
    let image = req.files.file;

    let uploadedLocation = `public/art/${image.name}`;

    let art = JSON.parse(req.body.art);

    image.mv(uploadedLocation, err => {
      if (err) return res.status(500).send(err);
      Art.update(
        {
          _id: req.params.id,
        },
        {
          artName: art.artName,
          imgURL: `art/${image.name}`,
          description: art.description,
          price: art.price,
          artist: {
            name: art.artist.name,
            born: art.artist.born,
            died: art.artist.died,
            nationality: art.artist.nationality,
          },
        },
      )
        .then(() =>
          res.status(200).send({
            message: 'art added',
          }),
        )
        .catch(err => {
          res.status(500).send(err);
          console.log(err);
        });
    });
  } else {
    let art = JSON.parse(req.body.art);
    Art.update(
      {
        _id: req.params.id,
      },
      {
        artName: art.artName,
        description: art.description,
        price: art.price,
        artist: {
          name: art.artist.name,
          born: art.artist.born,
          died: art.artist.died,
          nationality: art.artist.nationality,
        },
      },
    )
      .then(() =>
        res.status(200).send({
          message: 'art added',
        }),
      )
      .catch(err => {
        res.status(500).send(err);
        console.log(err);
      });
  }
};

exports.delete = (req, res) => {
  Art.deleteOne({
    _id: req.params.id,
  })
    .then(() => res.status(200).send({ message: 'art deleted' }))
    .catch(err => res.status(500).send(err));
};
