/*


1.1. 引入mongoose
1.2. 连接指定数据库(URL只有数据库是变化的)
1.3. 获取连接对象
1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
2.1. 字义Schema(描述文档结构)
2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
3.1. 通过Model实例的save()添加数据
3.2. 通过Model的find()/findOne()查询多个或一个数据
3.3. 通过Model的findByIdAndUpdate()更新某个数据
3.4. 通过Model的remove()删除匹配的数据
*!/*/
//md5
const md5 = require("blueimp-md5");
//引入mongoose
const mongoose = require("mongoose");
//1. 连接数据库
mongoose.connect("mongodb://localhost:27017/guzhipin");
//获取连接对象
const coon = mongoose.connection;
//绑定连接侦听
coon.on("open",function () {
  console.log("数据库连接成功~~~");
});
//定义约束对象
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 工资
});
//创建module集合(集合名，约束对象)
const userModule = mongoose.model("user",userSchema);
//测试module方法

function testSave() {
  //定义数据对象
  const user = {
    username:"Tom",
    password: md5("1234"),
    type:"daShen"
  };
  //创建module实例
  new userModule(user).save(function (err,userDoc) {
    console.log("save()",err,user);
  })
}
testSave();
