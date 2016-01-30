var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;
	
	if(window.ActiveXObject){
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xmlHttp = false;
		}
	}else{
		try{
			xmlHttp = new XMLHttpRequest();
		}catch(e){
			xmlHttp = false;
		}	
	}
	
	if(!xmlHttp){
		alert("cant create that xmlHttp object");
	}else{
		return xmlHttp;
	}		
}

function process(){
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
		var url = "myTutorials.txt";
		xmlHttp.open("GET", url, true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	}else{	
		setTimeout('process()', 1000);
	}
}

function handleServerResponse(){

	serverConnect = document.getElementById("serverConnect");
	if(xmlHttp.readyState==1){
		serverConnect.innerHTML += "Status 1 : server connection established <br/>";
	}else if(xmlHttp.readyState==2){
		serverConnect.innerHTML += "Status 2 : request received <br/>";
	}else if(xmlHttp.readyState==3){
		serverConnect.innerHTML += "Status 3 : server is processing request <br/>";
	}else if(xmlHttp.readyState==4){
		serverConnect.innerHTML += "Status 4: request is finished and response is ready <br/> Json String: <br/>";
		serverConnect.innerHTML += xmlHttp.responseText;
		if(xmlHttp.status==200){
		
			try{
				var myArr = JSON.parse(xmlHttp.responseText);
				myFunction(myArr);
				//setTimeout('process()', 1000);
			}catch(e){
				alert( e.toString() );
			}	
			
		}else{
			alert(xmlHttp.statusText);
		}
	}
}

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + arr[i].display + '</a><br>';
    }
    document.getElementById("showTutorial").innerHTML = out;
}