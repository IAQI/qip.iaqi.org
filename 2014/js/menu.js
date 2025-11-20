/***************************
	JavaScript for menu
****************************/

function hiddenAll(){
	document.getElementById('venue').style.display="none";
	/*document.getElementById('facilities').style.display="none";*/
	document.getElementById('benasque').style.display="none";
	/*document.getElementById('organizer').style.display="none";*/
	document.getElementById('center').style.display="none";
	document.getElementById('pedro').style.display="none";
	document.getElementById('previous').style.display="none";
	document.getElementById('video').style.display="none";
	/* links*/
	document.getElementById('venue_link').style.backgroundColor="#323030";
	/*document.getElementById('facilities_link').style.backgroundColor="#323030";*/
	document.getElementById('benasque_link').style.backgroundColor="#323030";
	/*document.getElementById('organizer_link').style.backgroundColor="#323030";*/
	document.getElementById('center_link').style.backgroundColor="#323030";
	document.getElementById('pedro_link').style.backgroundColor="#323030";
        document.getElementById('previous_link').style.backgroundColor="#323030";
        document.getElementById('video_link').style.backgroundColor="#323030";
}
function show(id_ul, id_link){
	hiddenAll();
	document.getElementById(id_ul).style.display="block";
	document.getElementById(id_link).style.backgroundColor="#7e1b1d";
}