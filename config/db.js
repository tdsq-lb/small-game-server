const mysql = require('mysql')
const dbconfig = require('./db.confing')

module.exports = {
  query: function (sql, params, callback) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect(function (err) {
      if (err) {
        console.log('数据库链接失败');
        throw err;
      }
      //开始数据操作
      connection.query(sql, params, function (err, results, fields) {
        if (err) {
          console.log('数据操作失败');
          throw err;
        }
        let data = JSON.parse(JSON.stringify(results))
        data.pop();
        if (data.length <= 0) {
          data.push({ code: 500 })
        }
        //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
        callback && callback(data, JSON.parse(JSON.stringify(fields)));
        //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
        //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
        connection.end(function (err) {
          if (err) {
            console.log('关闭数据库连接失败！');
            throw err;
          }
        });
      });
    });
  },
}