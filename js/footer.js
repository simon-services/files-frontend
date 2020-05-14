function EVFooter(options){
  EVMsg.newDataModel({
    Data:{
      getters:["content"]
    }
  });
  var w = EVMsg.widget().config();
  w.templates[0]={name:"ev-footer", target:options.target, tmpl:"<footer class=\"w3-container w3-theme\" style=\"\"><p>{{:content()}}</p></footer>"};
  var d = EVMsg.modelFromData(options);
  EVMsg.widget(w).render(d);
  return d;
}
