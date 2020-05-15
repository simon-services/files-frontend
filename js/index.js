$(document).ready(function () {
	var admin = false;
	if (EVMsg.urlParam("admin")){
		admin = true
	}
	var connID = null;
	var token = null;
	var logo = "/img/logo.png";
	var bucket = "test";
	var wsURL = "ws://192.168.178.91:7878/v0.0.1/ws";
	var nav = [
		{
			position:0,
			label:bucket,
			link:"#"+bucket,
			dropdown: false
		}
	];
	if (admin == true){
		nav.push({
			position:1,
			label:"upload",
			link:"#upload",
			dropdown: false
		});
	}
	EVLogin({
		onSend: function (obj) {
			connID = EVMsg.login({
				url: wsURL,
				id: obj.username(),
				secret: obj.password(),
				scope: "Login",
				command: "getToken",
				onSuccess: function (json) {
					EVSideBar({
						target: "container",
						title: "files",
						intro: "files",
						content: "contentID",
						footer: "footerID",
						logo: logo,
						nav: nav,
						helpers:{
							onClick: function(e,o){
								switch(o.linkCtx.data.link()){
									case "#"+bucket:
										EVMsg.send(connID, EVMsg.newMessage({ scope: "Object", command: "getList", token: token, data: [{ bucket: bucket, prefix: "" }] }), function (objects) {
											console.log(objects);
											$.each(o.view.ctx.root.data().nav(),function(idx,link){
												if (link.link() == o.linkCtx.data.link()){
													$(o.linkCtx.elem).addClass("active")
												}else{
													$("a[href$='"+link.link()+"']").removeClass("active");
												}
											});
											EVGallery({target:"contentID",data:objects.data});
										});
										break;
									case "#upload":
											$.each(o.view.ctx.root.data().nav(),function(idx,link){
												if (link.link() == o.linkCtx.data.link()){
													$(o.linkCtx.elem).addClass("active")
												}else{
													$("a[href$='"+link.link()+"']").removeClass("active");
												}
											});
										EVUpload({
											target: "contentID",
											data:{bucket:bucket},
											helpers: {
												upload: function (event, obj) {
													event.preventDefault();
													var fData = new FormData()
													fData.append("description",$(obj.linkCtx.elem[2]).val())
													fData.append("file", obj.linkCtx.elem[1].files[0]);
													$.ajax({
														url: "/v0.0.1/files/buckets/"+bucket+"/objects",
														type: "POST",
														data: fData,
														processData: false,
														contentType: false,
														success: function (resp) {
															var res = JSON.parse(resp);
															console.log(res);
															if(res.debug.error != ""){
																alert(res.debug.error)
															}
															$("a[href$='"+bucket+"']").click();
														},
														error: function (xhr, err,txt) {
															console.log(xhr, err, txt);
															if (err == "error"){
																var errMsg = JSON.parse(xhr.responseText)
																alert(errMsg.debug.error);
															} 
														}
				
													});
												}
											}
										});
										break;
								}
							}
						} 
					});
					EVFooter({target:"footerID",content:"content"});
					token = json.data[0].token;
					$("a[href$='"+bucket+"']").click();
				}
			});
		},
		target: "container",
		data: {
			labelUserName: "username",
			labelPass: "password",
			username: "",
			password: ""
		}
	});
});

