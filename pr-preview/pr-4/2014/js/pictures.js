// PICTURES

function changePictureText(picture,text){
		document.getElementById('note').innerHTML = text;
		document.getElementById('big').src="/general/img/pedro_pascual/"+picture;
		}
function changePictureText2(picture,text){
		document.getElementById('note').innerHTML = text;
		document.getElementById('big').src="/general/img/pictures/"+picture;
		}
function changePicture(picture){
		document.getElementById('big').src="/general/img/pictures/"+picture;
		}
function changePictureTextconf(picture,text, puntero){
    document.getElementById('note').innerHTML = text;
    document.getElementById('big').src=""+picture;
    document.getElementById('ancla').href=""+puntero;
    //    alert(document.getElementById('ancla').href);
}
var nextnum=1;
var prevnum=-1;
function changePictureNumero(numero)
{
    if (numero == -1 )
    {
	numero=nummax-1
    }
    nextnum=numero + 1;
    if (nextnum >= nummax)
    {
	nextnum=0;
    }
    prevnum=numero-1;
    if (prevnum < 0)
    {
       prevnum=nummax-1;
    }
        
    document.getElementById('note').innerHTML = text[numero];
    document.getElementById('big').src=picture[numero];
    document.getElementById('big').alt=text[numero];
    document.getElementById('ancla').href=puntero[numero];
    //    alert(document.getElementById('ancla').href);
    //   alert ( "prevnum="+prevnum+" nextnum="+nextnum+" nummax="+nummax );
}
