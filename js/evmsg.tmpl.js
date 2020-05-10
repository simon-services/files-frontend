EVE.prototype.dataTmpl = "";
EVE.prototype.getMsgTmpl = function(){
  return "<div class=\"w3-container\"><h1>EVMsg</h1><hr><div>version ::{^{:version()}} </div><div>id :: {{:id()}}</div><div>secret :: {{:secret()}}</div><div>state :: {{:state()}}</div><div>scope :: {{:scope()}}</div><div>command :: {{:command()}}</div><div>"+this.dataTmpl+"</div><div>debug.error :: {{:debug().error}}</div><div>debug.warning :: {{:debug().warning}}</div><div>debug.info :: {{:debug().info}}</div></div><hr>";
};
EVE.prototype.tmpl = function(options){
  $.link[options.tmpl]("#"+options.target, options.data,options.helpers);
};
EVE.prototype.addTmpl = function(options){
    $.templates(options.name,options.tmpl);
};
EVE.prototype.wdata = {
  options:{
    templates:[
      {name:"",
       target:"",
       tmpl :""
      }
    ],
    data:{}
  }
};
EVE.prototype.wdata.model = {};
EVE.prototype.wdata.config = function(model){
	if (model){
		$.views.viewModels(model,this.model);
		this.options["model"] = this.model;
	}
	return (this.options);
};
EVE.prototype.wdata.data = function(data){
	return this.model.Data.map(data)
};
EVE.prototype.wdata.render = function(data){
  $.each(this.options.templates, function(idx,tmpl){
    EVMsg.addTmpl({name:tmpl.name,tmpl: tmpl.tmpl});
    if(data){
      EVMsg.tmpl({target:tmpl.target,tmpl:tmpl.name,data:data,helpers:tmpl.helpers});
    }else{
      EVMsg.tmpl({target:tmpl.target,tmpl:tmpl.name,data:EVMsg.wdata.options.data,helpers:tmpl.helpers});
    }
  });
};
EVE.prototype.widget = function(w){
  if (w) {
    this.wdata.options = w;
  }
  return (this.wdata);
};
EVE.prototype.model = {};
EVE.prototype.modelFromMsg = function(msg){
  return(this.model.EVMsg.map(msg));
};
EVE.prototype.newDataModel = function(model){
  var msgModel = {
    EVMsg:{
      getters:["command",{getter:"data",type:"Data"},{getter:"debug",type:"EVDebug"},"id","scope","secret","state","token","version"],
    },
    EVDebug:{getter:["error","warning","info"]}
  };
  var mergedModel = {...msgModel,...model};
  $.views.viewModels(mergedModel,this.model);
};
EVE.prototype.modelFromData = function(data){
  return(this.model.Data.map(data));
};
