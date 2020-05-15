function EVGallery(options){
	EVMsg.newDataModel({
    Data:{
      getters:[ {getter:"data",type:"Image"}]
    },
    Image:{
      getters:["key","bucket","description"]
    }
  });
  var w = EVMsg.widget().config();
  w.templates[0]={name:"ev-gallery", target:options.target, helpers: options.helpers, tmpl:"<div class=\"w3-row-padding w3-margin-top\">{{for data()}}<div class=\"w3-third\"><div class=\"w3-card w3-center\"><a target=\"_blank\" href=\"/v0.0.1/files/buckets/{{:bucket()}}/objects/{{:key()}}\"><img src=\"/v0.0.1/files/buckets/{{:bucket()}}/thumbnails/{{:key()}}\" style=\"padding-top:16px;height:175px;\"></a><div class=\"w3-container\"><h5>{{:description()}}</h5></div></div></div>{{/for}}</div>"};
  var d = EVMsg.modelFromData(options);
  EVMsg.widget(w).render(d);
  return d;
}
