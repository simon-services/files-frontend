function EVLogin(options){
  EVMsg.newDataModel({
    Data:{
      getters:["labelUserName","labelPass","username","password"],
      extend:{
        send: function(){
          options.onSend(this);
          return false;
        }
      }
    }
  });
  var w = EVMsg.widget().config();
  w.templates[0]={name:"ev-login", target:options.target, tmpl:" <div class=\"w3-container w3-display-middle\" id=\"login\"><div class=\"w3-card-4\" style=\"max-width:600px\"><form data-link=\"{on 'submit' send}\" id=\"login\" class=\"w3-container\" action=\"#\"><div class=\"w3-section\"><label><b>Username</b></label> <input class=\"w3-input w3-border w3-margin-bottom\" type=\"text\" placeholder=\"Enter Username\" name=\"username\" data-link=\"username()\" required><label><b>Password</b></label><input class=\"w3-input w3-border\" type=\"password\" placeholder=\"Enter Password\" name=\"password\" data-link=\"password()\" required><button class=\"w3-button w3-block w3-gallery-button w3-section w3-padding\" type=\"submit\">Login</button></div></form></div></div>"};
  var d = EVMsg.modelFromData(options);
  EVMsg.widget(w).render(d);
  return d;
}

