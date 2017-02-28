var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');
var mongoose = require('mongoose');    //引用mongoose模块
//var db = mongoose.createConnection('localhost','users'); //创建一个数据库连接
mongoose.connect('mongodb://localhost/users');
var userModel = require('./app/models/user');

var app = express();

// view engine setup
//设置视图的根目录为public
app.set('views', path.join(__dirname, 'public'));
//设置引擎为html
app.engine('html', require('jade').__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
// 访问http://localhost:3000/默认调至public目录下的index.html页面
app.get('/', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

app.get('/getUsers', function (req, res) {

  userModel.find({}, function (err,users) {
    if(!err){
      res.send(users);
    }else{
      res.send(err);
    }

  });
});
app.post('/addInfo', function (req, res) {
  console.log("req",req.body);
  var newUser = new userModel({
    "myDate":req.body.myDate,
    "myCompany":req.body.myCompany,
    "mySpecification":req.body.mySpecification,
    "myBatchNumber":req.body.myBatchNumber,
    "myNumber":req.body.myNumber,
    "myWeight":req.body.myWeight,
    "myPrice":req.body.myPrice,
    "myAmountOfMoney":req.body.myAmountOfMoney
  });
  newUser.save(function (err, users) {
    if(!err) {
      console.log(users);
      res.send(users)
    }else{
      res.send(err);
    }
  });
});

app.delete('/deleteInfo', function (req, res) {
  console.log("req",req.query);
  var userObjData = {
    "myDate":req.query.myDate,
    "myCompany":req.query.myCompany,
    "mySpecification":req.query.mySpecification,
    "myBatchNumber":req.query.myBatchNumber,
    "myNumber":req.query.myNumber,
    "myWeight":req.query.myWeight,
    "myPrice":req.query.myPrice,
    "myAmountOfMoney":req.query.myAmountOfMoney
  };
  userModel.remove(userObjData,function (err, users) {
    if(!err) {
      console.log(users);
      res.send(users)
    }else{
      res.send(err);
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
