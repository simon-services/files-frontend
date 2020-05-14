$(document).ready(function () {
	var connID = null;
	var token = null;
	var bucket = "test";
	EVLogin({
		onSend: function (obj) {
			connID = EVMsg.login({
				url: "ws://192.168.178.91:7878/v0.0.1/ws",
				id: obj.username(),
				secret: obj.password(),
				scope: "Login",
				command: "getToken",
				onSuccess: function (json) {
					EVSideBar({
						target: "container",
						title: "EVMsg-JS Widgets",
						intro: "EVMsg-JS Widgets",
						logo: "/img/evalgo.png",
						content: "contentID",
						footer: "footerID",
						nav: [
							{
								position:0,
								label:"test",
								link:"#test",
								dropdown: false
							},
							{
								position:1,
								label:"upload",
								link:"#upload",
								dropdown: false
							}
						],
						helpers:{
							onClick: function(e,o){
								switch(o.linkCtx.data.link()){
									case "#create":
										EVMsg.send(connID,EVMsg.newMessage({scope:"Bucket",command:"create",token:token,data:[{bucket:bucket}]}),function(created){
											console.log(created);
										});
									case "#test":
										EVMsg.send(connID, EVMsg.newMessage({ scope: "Object", command: "getList", token: token, data: [{ bucket: bucket, prefix: "" }] }), function (objects) {
											EVGallery({target:"contentID",data:objects.data});
										});
										break;
									case "#upload":
										EVUpload({
											target: "contentID",
											data:{bucket:bucket},
											helpers: {
												upload: function (event, obj) {
													event.preventDefault();
													var fData = new FormData()
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
															EVMsg.send(connID, EVMsg.newMessage({ scope: "Object", command: "getList", token: token, data: [{ bucket: bucket, prefix: "" }] }), function (objects) {
																EVGallery({target:"contentID",data:objects.data});
															});
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
					EVMsg.send(connID, { scope: "Bucket", command: "getList", token: json.data[0].token }, function (resp) {
						EVMsg.send(connID, EVMsg.newMessage({ scope: "Object", command: "getList", token: token, data: [{ bucket: bucket, prefix: "" }] }), function (objects) {
							EVGallery({target:"contentID",data:objects.data});
						});
					});
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

