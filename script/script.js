/*
* This event  Fire when page loaded and add event attribute to localStorage
* first, using function template storeAtLocalStorage  to make object.
* second,check for key on local storage and store it in key and make value as array to store all load page event
* third,set time to clear local storage after 5 seconds
*/
window.addEventListener('load',function (e) {
    var loadEvent=new storeAtLocalStorage(e.type,e.target,new Date());
        if(localStorage.getItem('loadPage')==null)
        {
            localStorage.setItem('loadPage',loadEvent.display());
        }
        else
        {
            var arrayLoad=new Array();
            arrayLoad=Array(localStorage.getItem('loadPage'));
            arrayLoad.push(loadEvent.display());
            localStorage.setItem('loadPage',arrayLoad);
        }
    setInterval(clearLocalStorage,5000);
});
/*
* This event  Fire when page unLoaded and add event attribute to localStorage
* first, using function template storeAtLocalStorage  to make object.
* second,check for key on local storage and store it in key and make value as array to store all unLoad page event
*/
window.addEventListener('unload',function (e) {
    var unLoadEvent=new storeAtLocalStorage(e.type,e.target,new Date());
        if(localStorage.getItem('unLoadPage')==null)
            {
                localStorage.setItem('unLoadPage',unLoadEvent.display());
            }
        else
            {
                var arrayUnLoad=new Array();
                arrayUnLoad=Array(localStorage.getItem('unLoadPage'));
                arrayUnLoad.push(unLoadEvent.display());
                localStorage.setItem('unLoadPage',arrayUnLoad);
            }
});
var call=false; //using this flag for check on generate click first clicked or else
var charachters=new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
//charachters array using for initialize all letters
var getDiv=document.getElementById('letters'); //to get div that contain on letters
var genetate=document.getElementById('ok');   //to get generate button
var element = document.getElementById('count');//to get input text
var divPicture=document.getElementById('picture');//to get div that contain picture
var pic=document.getElementById('currentPic');//to get current image node
var prev=0;
var vis=new Array(26); //this array help to get new letter without redundant
//using this function to initialize vis array
function clearVistArray() {
    for (var i=0;i<26;i++){
        vis[i]=false;
    }
}
//using this function to clear localStorage
function clearLocalStorage(){
    localStorage.clear();
}
//this event fire when generate button clicked
genetate.addEventListener('click',function (ee) {
    GenerateChar(ee); //function to generate random letters
});
//function to generate new index to get non repeated letter
function getNewIndex() {
    for(var i=0;i<26;i++){
        if(!vis[i])
            return i;
    }
    return 0;
}
// declaration function to generate random letters
function GenerateChar(ee){
    if(!call) {
        call=true;
        prev=element.value;
        var cnt = element.value;
        getDiv.textContent=""; //to clear div that contain letters
        if(cnt<=7)
            getDiv.style.marginLeft='44%';
        else
            getDiv.style.marginLeft='33%';
        if (cnt < 1 || cnt > 26) {
            pic.src="";
            getDiv.style.marginLeft='46%';
            getDiv.textContent='Invalid Input';
            return;
        }
        var resultGenerate= new storeAtLocalStorage(ee.type,ee.target,new Date());
        if(localStorage.getItem('Generate')==null)
            {
                localStorage.setItem('Generate',resultGenerate.display());
            }
        else
            {
                var arrayGenerate=new Array();
                arrayGenerate=Array(localStorage.getItem('Generate'));
                arrayGenerate.push(resultGenerate.display());
                localStorage.setItem('Generate',arrayGenerate);
            }
        var i, idx, newChar, content, newIdx;

        for (i = 0; i < cnt; i++) {
            idx = Math.floor(Math.random() * 26); //get random index between 1 to 26
            newChar = document.createElement('button'); //create new button
            if (!vis[idx])
            {
                content = document.createTextNode(charachters[idx]);
                vis[idx] = true;
            }
            else
             {
                 newIdx = getNewIndex();
                 content = document.createTextNode(charachters[newIdx]);
                 vis[newIdx] = true;
             }
            newChar.appendChild(content);
            newChar.setAttribute('class', 'btnChar');
            getDiv.appendChild(newChar);
            //this event fire when clicked on any letter
            newChar.addEventListener('click',function(e)
            {
               pic.setAttribute('src','images/'+e.target.textContent+'.jpg');
                var charButtonClick= new storeAtLocalStorage(e.type,e.target,new Date());
                var currentButton=('Button-'+e.target.textContent);
                    if(localStorage.getItem(currentButton)==null)
                    {
                        localStorage.setItem(currentButton,charButtonClick.display());
                    }
                    else
                    {
                        var charClick=new Array();
                        charClick=Array(localStorage.getItem(currentButton));
                        charClick.push(charButtonClick.display());
                        localStorage.setItem(currentButton,charClick);
                    }
            });
        } //end of for loop

    } //end of if(!call) condition
    else
     {
        restDiv(prev); //to clear div
        clearVistArray(); //clearVistArray
        call=false;
        GenerateChar(ee); //call generate function after reset div
    }

}  //end function Generate
//remove all div children
function restDiv(prev) {
    var elBtn=getDiv.getElementsByTagName('button');
        for(var i=0;i<prev;i++){
            if(getDiv.hasChildNodes())
            getDiv.removeChild(getDiv.firstChild);
        }
}
//function template to set attribute for event fired and create new object
function storeAtLocalStorage(eventType,eventTarget,eventTime){
    this.eventType=eventType;
    this.eventTarget=eventTarget;
    this.eventTime=eventTime;
    this.display=function() {
        return "Type: " + this.eventType + ", Target: " + this.eventTarget + ", Time:" + this.eventTime+"\n";
    }
}