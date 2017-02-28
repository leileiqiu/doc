var mongoose = require("mongoose");
var Schema = mongoose.Schema;	//	创建模型
var userScheMa = new Schema({
    myDate:String,
    myCompany:String,
    mySpecification:String,
    myBatchNumber:String,
    myNumber: String,
    myWeight: String,
    myPrice: String,
    myAmountOfMoney: String
});	//	定义了一个新的模型，但是此模式还未和users集合有关联
module.exports = mongoose.model('users', userScheMa); //	与users集合关联