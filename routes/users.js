var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json([
    {
      id: 1,
      username: 'samsepi0l',
      age: 23
    },
    {
      id: 2,
      username: 'D0loresH4ze',
      age: 21
    }
  ]);
});

module.exports = router;
