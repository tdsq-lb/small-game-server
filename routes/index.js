var express = require('express');
var router = express.Router();
const db = require('../config/db')

/* GET home page. */
router.post('/keep', function (req, res, next) {
  console.log(req.body)
  const { uid, name, avatar, score, coin, level } = req.body
  console.log(coin === undefined, '==========?>>>>')
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_rocket_insert_data('${uid}', '${name}', '${avatar}', '${score === undefined ? -1 : score}', '${coin === undefined ? -1 : coin}', '${level}')`, [], (res, fie) => {
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
  const { type, uid } = req.body
  console.log(uid, '==========>>>')
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_rocket_ranking_list('${type}','${uid}')`, [], (res, fie) => {
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
    db.query(`CALL p_rocket_check_user('${uid}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    res.send(err)
  })
})

router.post('/before', function (req, res, next) {
  const { uid } = req.body
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_rocket_before_list('${uid}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    res.send(err)
  })
})

router.post('/update', function (req, res, next) {
  const { uid, newuid } = req.body
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_rocket_update_list('${uid}','${newuid}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve[0])
  }).catch((err) => {
    res.send(err)
  })
})

router.post('/event', function (req, res, next) {
  const { event_name = '', game_id = '', path1 = '', path2 = '', path3 = '', path4 = '', path5 = '', uid = '' } = req.body
  const promise = new Promise((resolve, reject) => {
    db.query(`CALL p_event_insert('${event_name}','${game_id}','${path1}','${path2}','${path3}','${path4}','${path5}','${uid}')`, [], (res, fie) => {
      resolve(res)
    })
  })
  promise.then((resolve) => {
    res.send(resolve[0])
  }).catch((err) => {
    res.send(err)
  })
})

module.exports = router;
