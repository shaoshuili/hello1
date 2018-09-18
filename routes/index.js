let express = require('express');
let router = express.Router();
//引入cookie
const cookie = require("cookie-parser");
//引入约束对象
const {UserModel} = require("../db/modules");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/*
//测试路由
router.post("/register",function (req,res) {
  //获取请求参数
  const {username,password} = req.body;
  //处理数据
  if(username === "admin"){
    //失败的响应
    res.send({code:1,msg:"此用户名已存在~~~"});
  }else {
    //成功的响应
    res.send({code:1,data:{_id:"abc",username,password}});
  }
});*/

//定义注册的路由组件，请求的地址，参数，方式
router.post("/register",function (req,res) {
  //获取请求参数
  const {username,password,type} = req.body;
  //处理请求参数,根据username查找，
  UserModel.findOne({username},function (err,userDoc) {
        //如果失败，打印err
        if(err){
          console.log("err");
        }else {
          //成功，如果有，用户已存在，返回提示
          if(userDoc){
            res.send({
              "code":1,
              "msg": "此用户名已存在"
            })
          }else {
            //如果没有，可以注册，并且保存用户信息，返回成功的响应
              //new一个实例
              new UserModel({username,password: md5(password),type}).save((err,userDoc) =>{
                if(err){
                  console.log(err);
                }else {
                  //没有错误，把这个用户名保存cookie
                  const _id = userDoc.id;
                  //用cookie保存id
                  res.cookie("userid",_id);
                  res.send({
                    _id,
                    username,
                    type
                  })
                }
              })
          }

        }
      })
  //返回响应
});




module.exports = router;
