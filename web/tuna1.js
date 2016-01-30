var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	
	var xmlHttp;
	alert("in create...");
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttp;
}

//call onload
function process(){
	if(xmlHttp){
		try{
			alert("process called");
			xmlHttp.open("GET","tuna.xml",true);
			xmlHttp.onreadystatechange = handleStateChange;
			xmlHttp.send(null);
		}catch(e){
			alert(e.toString());
		}
	}
}

// when state changes calls this function...
function handleStateChange(){
	theD = document.getElementById("theD");
	if(xmlHttp.readyState==1){
		theD.innerHTML += "Status 1 : server connection established <br/>";
	}else if(xmlHttp.readyState==2){
		theD.innerHTML += "Status 2 : request received <br/>";
	}else if(xmlHttp.readyState==3){
		theD.innerHTML += "Status 3 : server is processing request <br/>";
	}
	else if(xmlHttp.readyState==4){
			if(xmlHttp.status=200){
				try{
					handleResponse();
				}catch(e){
					alert(e.toString());
				}
			}else{
				alert(xmlHttp.statusText);
			}
		}
}

// handle the response from the server...
function handleResponse(){
	var xmlResponse = xmlHttp.responseXML; // grab the entire xml file.
	root = xmlResponse.documentElement; // gets the root element of file
	names = root.getElementsByTagName("name"); // gets all the information of the tag 'name';
	ssns = root.getElementsByTagName("ssn"); // gets all the information of the tag 'ssn';
	
	var stuff = "";
	for(var i=0; i<names.length;i++){  // can also have ssns.length 
		stuff = names.item(i).firstChild.data + " - " + ssns.item(i).firstChild.data + " <br/> ";
	} 

	theD = document.getElementById("theD");
	theD.innerHTML = stuff;
}