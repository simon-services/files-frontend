function EVUpload(options){
  EVMsg.newDataModel({
    Data:{
      getters:["bucket"]
    }
  });  
  var w = EVMsg.widget().config();
  w.templates[0]={name:"ev-upload", target:options.target, helpers:options.helpers ,tmpl:"<div class=\"w3-container w3-display-middle\" id=\"login\"><div class=\"w3-card-4\" style=\"max-width:600px\"><form data-link=\"{on 'submit' ~upload}\" id=\"login\" class=\"w3-container\" action=\"#\"><div class=\"w3-section\"><label><b>Bucket</b></label> <input class=\"w3-input w3-border w3-margin-bottom\" type=\"text\" placeholder=\"Bucket\" name=\"bucket\" value=\"{{:bucket()}}\" readonly required><label><b>File</b></label><input class=\"w3-input w3-border\" type=\"file\" placeholder=\"Choose File\" name=\"file\" required><button class=\"w3-button w3-block w3-green w3-section w3-padding\" type=\"submit\">Upload</button></div></form></div></div>"};
  var d = EVMsg.modelFromData(options.data);
  EVMsg.widget(w).render(d);
  return options.data;
}
