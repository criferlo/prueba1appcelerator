/**
 * @author Cristhian
 */
function S4(){
	return ((1+Math.random())*65536 | 0).toString(16).substring(1);
}

function guid(){
	return S4()+S4()+"-"+S4()+"-"+ S4()+"-"+S4()+"-"+S4()+S4()+S4();
}

function InitAdapter(config){
	Cloud=require("ti.cloud");
	Cloud.debug=!0;
	config.Cloud=Cloud;
}

function Sync(model,method,opts){
	//later
}

var_ = require("alloy/underscore")._;

module.exports.sync=Sync;

module.exports.beforeModelCreate = function(config){
	config=config || {};
	config.data={};
	InitAdapter(config);
	return config;
};

module.exports.afterModelCreate = function(Model){
	Model=Model || {};
	Model.prototype.config.Model=Model;
	return Model;
}
