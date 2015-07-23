exports.definition = {
	config : {

		adapter : {
			type : "acs",
			collection_name : "users"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here

			login : function(_login, _password, _callback) {
				var self = this;
				var url = "http://tm.inger.co/api/v00/usuarios/login";
				var client = Ti.Network.createHTTPClient({
					onload : function(e) {
						//consola
						var results = JSON.parse(client.responseText);
						Ti.API.info(JSON.stringify(results, null, 2));
						//cargar usuario
						var user = e;
						Ti.App.Properties.setString('sessionId', e.Id);
						Ti.App.Properties.setString('user', JSON.stringify(user));
						_callback && _callback({
							success : true,
							model : new model(user)
						});
					},
					onerror : function(e) {
						//consola
						var results = JSON.parse(client.responseText);
						Ti.API.info(JSON.stringify(results, null, 2));
						//cargar usuario
						_callback && _callback({
							success : true,
							model : new model(user)
						});
					},
				});

				client.open("POST", url);
				client.send({
					Correo : _login,
					Clave : _password
				});

			},

			createAccount : function(_userInfo, _callback) {
				
				var self = this;
				var url = "http://tm.inger.co/api/v00/usuarios/";
				
				var client = Ti.Network.createHTTPClient({
					onload : function(e) {
						//consola
						var results = JSON.parse(client.responseText);
						Ti.API.info(JSON.stringify(results, null, 2));
						//cargar usuario
						var user = e;
						Ti.App.Properties.setString('sessionId', e.Id);
						Ti.App.Properties.setString('user', JSON.stringify(user));
						_callback && _callback({
							success : true,
							model : new model(user)
						});
					},
					onerror : function(e) {
						//consola
						var results = JSON.parse(client.responseText);
						Ti.API.info(JSON.stringify(results, null, 2));
						//cargar usuario
						_callback && _callback({
							success : true,
							model : new model(user)
						});
					},
				});
				
				client.open("POST", url);
				client.send({
					//Id: null
					Correo : _userInfo.Correo,
					Avatar : _userInfo.null,
					Descripcion: _userInfo.Descripcion,
					Nombre: _userInfo.Nombre,
					Direccion: _userInfo.Direccion,
					Telefono: _userInfo.Telefono,
					Clave: _userInfo.Clave,
					UrlIntroduccion: _userInfo.UrlIntroduccion,
					Ubicacion: _userInfo.Ubicacion,
					//createdAt: null
					//updatedAt: null
					 
				});
			},

			logout : function(_callback) {
						TAP.removeProperty("sessionId");
						TAP.removeProperty("user");
						_callback && _callback({
							success : true,
							model : null
						});
			},

			authenticated : function() {
				var TAP = Ti.App.Properties;

				if (TAP.hasProperty("sessionId")) {
					Ti.API.info("SESSION ID" + TAP.getString("sessionId"));
					return true;
				}
				return false;
			},
			showMe : function(_id,_callback) {
				var TAP = Ti.App.Properties;
				
				var self = this;
				Ti.API.info("consultado:"+_id);
				var url = "http://tm.inger.co/api/v00/usuarios/"+_id;
				
				var client = Ti.Network.createHTTPClient({
					onload : function(e) {
						//consola
						var results = JSON.parse(client.responseText);
						Ti.API.info(JSON.stringify(results, null, 2));
						//cargar usuario
						var user = e;
						Ti.App.Properties.setString('sessionId', e.Id);
						Ti.App.Properties.setString('user', JSON.stringify(user));
						_callback && _callback({
							success : true,
							model : new model(user)
						});
					},
					onerror : function(e) {
						//consola
						var results = JSON.parse(client.responseText);
						Ti.API.info(JSON.stringify(results, null, 2));
						//cargar usuario
						_callback && _callback({
							success : true,
							model : new model(user)
						});
					},
				});
				
				client.open("GET", url);
				client.send({
					Id : _id,
				});
				
			},
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			 fetch: function(options) {
			 options = options ? _.clone(options) : {};
			 options.reset = true;
			 return Backbone.Collection.prototype.fetch.call(this, options);
			 }
			 */
		});

		return Collection;
	}
	//

};

