var express = require('express');
var router = express.Router();
const db = require('../config/db')

/* GET home page. */
router.post('/keep', function (req, res, next) {
  console.log(req.body)
  const { uid, name, avatar, score, coin, level } = req.body
  console.log(coin == 0 ? undefined : coin,'===========>>>')
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_Insert_data('${uid}', '${name}', '${avatar}', '${score}', '${coin == 0 ? undefined : coin}', '${level}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    res.send(err)
  })
});

router.post('/ranking', function (req, res, next) {
  const { type } = req.body
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_ranking_list('${type}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    res.send(err)
  })
})

router.post('/check', function (req, res, next) {
  const { uid } = req.body
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_check_user('${uid}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    res.send(err)
  })
})

module.exports = router;
