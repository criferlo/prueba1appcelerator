function doClick(e) {
	alert($.label.text);
}

var user = Alloy.createModel("User");

//login probado exitoso
user.login("criferlo@gmail.com", "1234", function(_response) {
	if (_response.success) {
		$.index.open();
	} else {
		alert("Error Starting Application " + _response.error);
		Ti.API.error("error logging in " + _response.error);
	}

});

//crear usuario exitoso
/*
var _user = {
	Correo : "otro-correo",
	Avatar : "null",
	Descripcion : "descripcion",
	Nombre : "otro-nombre",
	Direccion : "direccion",
	Telefono : "300300",
	Clave : "otra-clave",
	UrlIntroduccion : "null",
	Ubicacion : "otro-ubicacion",
}

user.createAccount(_user,function(_response){
	if (_response.success) {
		$.index.open();
	} else {
		alert("Error Starting Application " + _response.error);
		Ti.API.error("error logging in " + _response.error);
	}	
}); 
*/
var _id = 12;
user.showMe(_id,function(_response){
	if (_response.success) {
		$.index.open();
	} else {
		alert("Error Starting Application " + _response.error);
		Ti.API.error("error logging in " + _response.error);
	}	
});

/*if(user.authenticated()===true){
 $.userLoggedInAction();
 }else{
 $.userNotLoggedInAction();
 }*/

$.index.open();
