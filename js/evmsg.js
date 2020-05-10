function EVE(){
  this.version = "v0.0.1";
  this.id = "";
  this.secret = "";
  this.url = "";
  this.connections = [];
  this.err = "";
  this.token = "";
  this.storage = function(){
    // setItem(key,value)
    // getItem(key)
    // removeItem(key)
    return window.localStorage;
  };
  this.session = function(){
    // setItem(key,value)
    // getItem(key)
    // removeItem(key)
    return (window.sessionStorage);
  };
  this.mdata = {};
  this.mdata.setItem = function(key,value){
    this[key] = value;
  };
  this.mdata.setItemValueById = function(item,idx,key,value){
    $.observable(this.mdata[item].data[idx]).setProperty(key,value);
  };
  this.mdata.setItemValueByKV = function(item,sKey,sVal,key,value){
    $.each(this.mdata[item].data, function(idx,val){
      if (val[sKey] == sVal){
	//$.observable(this.mdata[item].data[idx]).setProperty(key,value);
	this.mdata[item].data[idx][key] = value;
      }
    });
  };
  this.mdata.getItem = function(key){
    return(this[key]);
  };
  this.mdata.removeItem = function(key){
    delete(this[key]);
  };
  this.memory = function(key){
    if(key){
      return this.mdata[key];
    }
    return this.mdata;
  };
  this.connect = function(url){
    var conn = new WebSocket(url, []);
    conn.onerror = function (error) {
      this.Err = error
      console.log('webSocket Error ' + JSON.stringify(error));
    };
    conn.onclose = function(error){
      console.log('webSocket Closed ' + error + ' ' + JSON.stringify(error));
    };
    return (this.connections.push(conn)-1);
  };
  this.logout = function(connID){
    this.id = "";
    this.secret = "";
    this.token = "";
    this.connections[connID].close();
    window.location.reload(true);
  };
  this.login = function(options={}){
    if (!options.id){
      options["id"] = this.id;
    }
    if( !options.secret){
      options["secret"] = this.secret;
    }
    if (!options.url){
      options["url"] = this.url;
    }else{
      this.url = options.url;
    }
    var connID = this.connect(options.url);
    if (this.Err != null){
      console.log(this.Err);
      return false;
    }
    this.connections[connID].onopen = function () {
      console.log(this);
      var msg = EVMsg.newMessage(options)
      EVMsg.connections[connID].send(JSON.stringify(msg));
    };
    this.connections[connID].onmessage = function (e) {
      options.onSuccess(JSON.parse(e.data));
    };
    return connID;
  };
  this.newMessage = function(options){
    if(!options.data){
      options["data"] = [];
    }
    if (!options.scope){
      options["scope"] = "";
    }
    if (!options.command){
      options["command"] = "";
    }
    if (!options.id){
    options["id"] = this.id;
    }
    if (!options.token){
      options["token"] = this.token;
    }
    if (!options.secret){
      options["secret"] = this.secret;
    }
    if (!options.state){
      options["state"]="Created";
    }
    if (!options.debug){
      options.debug = {
	error: null,
	warning: null,
      info: null
      };
    }
    return {
      id: options.id,
      secret: options.secret,
      version: options.version,
      scope: options.scope,
      state: options.state,
      command: options.command,
      token: options.token,
      debug: options.debug,
      data: options.data
    };
  };
  this.observeMsg = function(e,eArgs){
    console.log(key,e,eArgs);
  };
  this.send = function(connID,msg,onMessage) {
    if(!msg.token){
      msg["token"] = this.token;
    }
    this.connections[connID].onmessage = function(e){
      onMessage(JSON.parse(e.data));
    };
    return this.connections[connID].send(JSON.stringify(msg));
  };
  this.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return decodeURIComponent(results[1]) || 0;
  };
  this.sendFile = function(url,token,fileElemID){
    console.log("1");
    var data = new FormData();
    data.append('file', $("#"+fileElemID)[0].files[0]);
    console.log(data);
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      processData: false,
      contentType: false,
      beforeSend: function( xhr ) {
	xhr.setRequestHeader("Authorization", "Bearer "+token);
      },
      success: function(data) {
	console.log(data.status,data.statusText);
      },
      error: function(data){
	console.log(data.status,data.statusText);
      }
    });
  };
  this.getFile = function(url,token){
    return this.getFileCallback(url,token,function(msg){
      console.log("getFileCallback",msg);
    });
  };
  this.getFileCallback = function(url,token,callback){
    $.ajax({
      url: url,
      method: 'GET',
      xhrFields: {
	responseType: 'blob'
      },
      beforeSend: function( xhr ) {
	xhr.setRequestHeader("Authorization", "Bearer "+token);
      },
      success: function (data) {
	var a = document.createElement('a');
	var urlData = window.URL.createObjectURL(data);
	console.log(urlData);
	console.log(a);
	console.log(url.replace(/^.*[\\\/]/, ''));
	a.href = urlData;
	a.download = url.replace(/^.*[\\\/]/, '');
	document.body.append(a);
	a.click();
	a.remove();
	window.URL.revokeObjectURL(urlData);
	callback();
      },
      error: function(data){
	console.log(data.status,data.statusText);
	callback(data);
      },
    });
  };
};
var EVMsg = new EVE();
jQuery.fn.serializeObject = function(){
    var results = {},
        arr = this.serializeArray();
    for (var i = 0, len = arr.length; i < len; i++) {
      obj = arr[i];
      //Check if results have a property with given name
      if (results.hasOwnProperty(obj.name)) {
        //Check if given object is an array
        if (!results[obj.name].push) {
          results[obj.name] = [results[obj.name]];
        }
        results[obj.name].push(obj.value || '');
      } else {
        results[obj.name] = obj.value || '';
      }
    }
    return results;
};
