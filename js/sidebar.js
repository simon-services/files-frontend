// Open and close the sidebar on medium and small screens
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Accordions
function myAccordion(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else { 
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-theme", "");
  }
}

// Change style of top container on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("myTop").classList.add("w3-card-4", "w3-animate-opacity");
    document.getElementById("myIntro").classList.add("w3-show-inline-block");
  } else {
    document.getElementById("myIntro").classList.remove("w3-show-inline-block");
    document.getElementById("myTop").classList.remove("w3-card-4", "w3-animate-opacity");
  }
}

function EVSideBar(options){
  EVMsg.newDataModel({
    Data:{
      getters:["title","intro","logo","content","footer",{getter:"nav",type:"Navigation"}]
    },
    Navigation:{
      getters:["position","link","label","title","dropdown",{getter:"links",type:"Dropdown"}]
    },
    Dropdown:{
      getters:["position","link","label"]
    }
  });
  var w = EVMsg.widget().config();
  w.templates[0]={name:"ev-side-bar", target:options.target, helpers: options.helpers, tmpl:"<nav class=\"w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card\" style=\"z-index:3;width:250px;\" id=\"mySidebar\"><a class=\"w3-bar-item w3-button w3-hide-large w3-large\" href=\"javascript:void(0)\" onclick=\"w3_close()\">Close <i class=\"fa fa-remove\"></i></a>{{for data().nav()}}{^{if  dropdown() }}<div><a class=\"w3-bar-item w3-button\" onclick=\"myAccordion('demo')\" href=\"javascript:void(0)\">{{:title()}}<i class=\"fas fa-caret-down\"></i></a><div id=\"demo\" class=\"w3-hide\">{{for links()}}<a class=\"w3-bar-item w3-button\" data-link=\"{on ~onClick}\" href=\"{{:link()}}\">{{:label()}}</a>{{/for}}</div></div>{{else}}<a class=\"w3-bar-item w3-button\" data-link=\"{on ~onClick}\" href=\"{{:link()}}\">{{:label()}}</a>{{/if}}{{/for}}</nav><div class=\"w3-main\" style=\"margin-left:250px;\"><div class=\"w3-overlay w3-hide-large w3-animate-opacity\" onclick=\"w3_close()\" style=\"cursor:pointer\" id=\"myOverlay\"></div><div id=\"myTop\" class=\"w3-container w3-top w3-theme w3-large\"><p><i class=\"fa fa-bars w3-button w3-teal w3-hide-large w3-xlarge\" onclick=\"w3_open()\"></i><span id=\"myIntro\" class=\"w3-hide\">{{:data().intro()}}</span></p></div><header class=\"w3-container w3-theme\" style=\"\"><h1 class=\"\">{{:data().title()}}</h1></header><div  id=\"{{:data().content()}}\"><div class=\"w3-row\"><div class=\"w3-container w3-col l12 m12 s12\"><div class=\"w3-code notranslate jsHigh\"><pre id=\"js-code\" style=\"white-space:pre-wrap;\"></pre></div></div><div class=\"w3-container embed-container w3-col l12 m12 s12\"><div class=\"w3-container\" id=\"widget-container\"></div></div></div></div><div  id=\"{{:data().footer()}}\"></div></div>"};
  var d = EVMsg.modelFromMsg(EVMsg.newMessage({data:options}));
  EVMsg.widget(w).render(d);
  return d;
}
