const router = require('express').Router();

const UserController = require('../../controllers/User');
const imageUpload = require("../../services/aws_service");

router.get(
  '/populated',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.populate(
      req.user._id,
      result => res.json(result)
    );
  }
);

router.get(
  '/populated/:id',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.populate(
      req.params._id,
      result => res.json(result)
    );
  }
);

router.get(
  '/:id',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.findById(
      req.params.id,
      (err, user) => res.json({
        user,
        currentUser: req.user._id
      })
    );
  }
);

router.get(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => res.json(req.user)
);

router.delete(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.delete(
      req.user._id,
      result => res.json(result)
    );
  }
);

router.put(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.update(
      req.user._id,
      req.body,
      result => res.json(result)
    );
  }
);

const singleUpload = imageUpload.single('image');
router.post('/s3upload', (req, res) => {
  singleUpload(req, res, (err, some) => {
    if (err) {
      return res.status(422).send({
        errors:
          [{ title: "Image Upload Error", detail: err.message }]
      });
    }
    return res.json({ 'imageUrl': req.file.location });
  })
});


module.exports = router;