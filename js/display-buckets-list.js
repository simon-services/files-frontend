function EVDisplayBucketsList(options){
  EVMsg.newDataModel({
    Data:{
      getters:[{getter:"data",type:"Bucket"}]
    },
    Bucket:{getters:["name","created"]}
  });
  var w = EVMsg.widget().config();
	console.log(options);
  w.templates[0]={name:"ev-display-buckets-list", target:options.target, helpers:options.helpers ,tmpl:"<div class=\"w3-center w3-border w3-margin-top w3-light-gray\" style=\"width:90%;margin:auto\">{{for data()}}<div class=\"w3-row w3-margin-top w3-margin-bottom\"><div class=\"w3-container w3-col l4 m12 s12 w3-margin-top w3-margin-bottom\">{^{:name()}}</div><div class=\"w3-container w3-col l4 m12 s12 w3-margin-top w3-margin-bottom\">{^{:created()}}</div><div class=\"w3-col l2 m12 s12 w3-margin-top\"><button class=\"w3-button w3-border\" style=\"margin-top:-9px\" data-link=\"{on ~onGallery}\">gallery</button></div><div class=\"w3-col l2 m12 s12 w3-margin-top\"><button class=\"w3-button w3-border\" style=\"margin-top:-9px\" data-link=\"{on ~onUpload}\">upload</button></div></div>{{/for}}</div>"};
  var d = EVMsg.modelFromData(options);
  EVMsg.widget(w).render(d);
  return d;
}
