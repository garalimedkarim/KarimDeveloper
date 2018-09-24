25-Array
    var array = new Array();
    array[2] = "kedha";
    var array2 = new Array('1',"2",3,4);
    var array3 = [1,2,3,4];
    
26-Check Array 
    if (Array.isArray(array2))

27-Set | Get lenght
    array2.length = 3; // first 3 elts are kept
28-Array Methods - Convert To String
    var string = array2.toString(); // toLocaleString 
    var string2 = array2.join('-');

29-Array Methods - Add Item 
    array2[array2.length] = "new elt";
    array2.push("new elt at the last");
    array2.unshift("new elt at first");
    array2.splice(2,2,"eltToAdd in the same Place") //splice(index,how many?,itemToAdd1,itemToAdd2);

30-Array remove Items
    array2.pop(); //remove last item and get it in return
    array2.shift; //remve first item and get it in return

31-Array Sort
    array2.sort();
    array2.reverse(); // the first become the last etc...

32-Array Combine & Slice
    array2.slice(2); // delete from 2 to end
    array2.slice(2,4) // delete from 2 to 4 
    array.slice(beginIndex,endIndex);
    array2.slice(-4,-1) // -4 from the end to -1 the last elt
    array1.concat(array2,array3,array4);
    
33-Array Search
    var index = array2.indexOf("elt"); // return elt s index
    var index = array2.indexOf("elt",startIndex);
    var index = array2.lastIndexOf("elt"); //return elt s index

34-Array Methods Practice
35-String Methods - Convert To String
    typeof("karim"); // retrun string
    typeof(myNumber.toString()) // return string

36-Locate String
    myString.indexOf("Love",5); //return index of Love and starts from 5th caracter
    myString.search(/love/i); // not cas sensitive

37-Split a String // String to Array
    myString.split(" "); // return an Array
    myString.substr(startIndex,length);
    myString.substring(startIndex,endIndex);

38-Find & Replace
    myString.charAt(25); //return 25th char
    myString.charCodeAt(25); //return unicode 25th char
    myString.replace("toReplace","newWord");
    myString.replace(/toReplace/g,"newWord"); //replace all
    
39-Concatination
    myString = String.fromCharCode(79,115,97);
    myString.concat(string1,string2,string3);
    
40-Convert Letters
    myString.toLowerCase();

41-All Reference 
    myString.trim(); //white spaces from the end
    MDN : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String
     
42-Chain
43-String Practise

44-Loop For
45-Loop For In
    for (prop in Object){
        if(Object.hasOwnProperty(prop))
            console.log(prop+"/"+Object[prop]);
    }

46-For Advanced
47-Loop While, Do While 
48-Loop Control: break; continue;
    //NB
    var i,x;
    MainLoop:
    for (i=1;i<5;i++){
        ChildLoop:
        for (x=1;x<5;i++){
            break MainLoop;
        }
    }

    continue MainLoop;
    continue ChildLoop;

49-Loop Practise

50..54- Math
Ceil : randon to Up 
Floor: random to down
Round: 
Min Max: arrays
Random: 

55-Regular Expression - Intro
    used with search,replace,match,split,
    /pattern/attributes 
    myString.search(/Love /);
    myString.replace(/L/i,"@");
    // i case insensitive
    // g global search
    // m multiline search
    
56-Regular Expression - Brackets
   myString.replace(/[^e]/i,"@"); 
   myString.replace(/[a-e]/i,"@"); 
    //[...] Character
    //[^...] Not Character
    //[a-z] without using i att for case insensitive
    //[A-g] == A-Z && a-g
    //[0-9a-z] 

57 - Regular Expression - Quantifiers
   myString.replace(/[e+]/i,"@"); 
    [e+] // e or ee or eee...
    [e{3}] // exactly 3 times
    [e{2,3}] // 2 or 3
    [e{2,}] //at least 2 times     
    
58- Date - Date Format 
    Full Format 
    Long Format     
    Short Format // new Date("month/day/year hour:min:sec");
    Iso Format 
    var date = new Date("October 25, 2005 09:30:00"); // Long Format
    
63- Numbers Intro
64- Numbers Methods
    number.toFixed(0); // 99.4 => 99 and 99.6 => 100
    number.toFixed(1); // 99.486 => 99.5
    number.toFixed(2); // 99.486 => 99.59

    parseInt("100px"); // => 100

65- Outro And Where To Continue
    https://developer.mozilla.org/fr/docs/Web/JavaScript
    W3 website
    javascript.info
    http://jstherightway.org/
    
Course JS HTML DOM:
1-What is DOM ?
    DOM = Document Object Model 
    DOM = Object which represent the Web page
    var myP = document.createElement('p'),
    myPText = document.createTextNode("my Text");
    myP.appendChild(myPText);
    document.body.appendChild(myP);

2-Find Elements By [ ID, Class, Tag ]
   myDiv=document.getElementById('idTest'); // Not Compatible with IE8-
   myDiv.innerHTML('new text');     myDiv=document.getElementsByTagName('p');
    myDiv[0].innerHTML('text 0');
    myDiv = document.getElementsByClassName('class0');
    document.querySelector
    document.querySelectorAll
    
3- Find Elements By Objects Part 1
    document.title
    document.images
        document.images[0].src
    
    document.forms
        document.forms[0].x2.value

4- Find Elements By Objects Part 2
    document.body
        document.body.appendChild(eltX);
    myDiv.innerText = document.body.innerHTML;
    
    document.anchors // a doesn't containt href attribute
    document.links // a containing href attribute
    
5- Elements - Get, Set Element Content
    myDiv.innerHTML Vs myDiv.textContent

6- Elements - Get, Set Attribute Value
    myImage = document.querySelector('img');
    myImage.src="http://placehold.it/200/DDD";
    myImage.title = "image 1";
    myImage.className = "class 0";

7- Elements - GetAttribute, SetAttribute
    myImage.setAttribute('class',"class0");
    myImage.getAttribute('class');
    
8 - Elements - HasAttribute, RemoveAttribute
    
9 - Elements - ClassList [ Item, Contains, Length ]
    myImage.classList.length
    myImage.classList.contains('class0')
    myImage.classList.item(0);
    
10 - Elements - ClassList [ Add, Remove, Toggle ]
    myDiv.className += 'class3';
    myDiv.classList.add('class0','class1');
    myDiv.classList.toggle('class5'); //if not exist add it else it remove it
    
11 - Elements - Children - ChildNodes
    myDiv.children[0].textContent();
    
12 - Elements - Children - First & Last Child [ Element ]
    Text Node Vs Element Node
    myDiv.firstChild Vs myDiv.firstElementChild
    myDiv.lastChild Vs myDiv.lastElementChild
    
13 - Elements - Children - Append Child
    myDiv = document.createElement('div');
    myText = document.createTextNode('text node');
    myDiv.appendChild(myText);

14 - Elements - Children - Insert Before
    myMainDiv.insertBefore(newElt,myMainDiv.firstElementChild);
    myMainDiv.insertBefore(newElt,myMainDiv.childNodes[3]);

    children Vs ChildNode = children ignore textNode elements but childNode recognize textNode elements

15 - Elements - Children - Remove Child
    myMainDiv.removeChild(myMainDiv.firstChild);
    
16 - Elements - Node [ Name, Value, Type ]
    nodeName VS tagName / nodeValue

17- Elements - Clone Node
18 - Elements - Parent Element
    //element parent
    this.parentElement.style.display = 'none';

19 - Elements - Next, Previous Sibling
    element next previous
20 - Elements - Focus, Blur
    focus != blur
21 - Elements - Click
    myButton.click();
22 - Elements - Add Event Listener
    myButton.addEventListener('click', function(){
        alert('event Listener');
    });
23 - Elements - Contains
24 - Elements - Client [ Height, Width ]
    elt.clientHeight (height + elt padding)
    //there are four levels : 1)padding 2)border 3)margin 4)overflow:scroll
25 - Elements - Scroll [ Height, Width ]
     elt.scrollHeight (height + elt padding + scroll height)
26 - Elements - Offset [ Height, Width ]
    //elt height + padding + border + scroll but not margin
    elt.offsetHeight

27 - Elements - Scroll [ Top, Left ]
    document.body.scrollTop += 100;
    console.log(document.body.scrollTop);
    //document.body.scrollLeft
    
28 - Elements - Client [ Top, Left ]
    elt.clientLeft; //border left

29 - Elements - Style
    elt.style.backgroundColor // any css property must just be in camelCase;
    elt.style.fontSize; // etc...

30 - Document - InputEncoding, LastModified, Url
    document.inputEncoding; //UTF-8, return meta of charset value
    document.lastModified // last DOM modification date
    document.URL // link of current page

31 - Document - Create [ Element, Text, Comment ]
    var div = document.createElement('div');
    document.body.appendChild(div);
    var txt = document.createTextNode('my text');
    div.appendChild(text);
    
32 - Document - Create Attribute
    myAttr = document.createAttribute('class');
    myAttr.value = 'classA';
    myElt.setAttribute(myAttr);
    
33 - Events - How To Write All Methods
    two methods:
    1) attribute in html:  onclick="clicked()"
    2) myButton = document.querySelector('button');
    myButton.onclick = function() {
        
    }
    or 
    myButton.onclick = clicked();

34 - Events - Onload, Onscroll, Onresize
    e.preventDefault(); //prevent submit for exple or any other event
  
35 - Events - Onfocus, OnBlur, OnSubmit

36 - Events - OnClick, OnDblClick, OnMousEnter
    oncontextmenu // => mouse right click + e.preventDefault(); you can not click right in the page
    onmouseenter / onmouseleave

37 - Events - OnKey [ Up, Down, Press ]
38 - Outro & References

Course Advanced Javascript
2-
    setInterval/clearInterval

3-
    window.pageYOffset // scroll horizontal
    window.scrollTo(x,y); // scroll to x and y
    
8- 
    setInterval(showTime,500);
9-
10-
       function orgos(){
    	setInterval(function(){
        Num = Math.floor(Math.random()*10);	
        console.log(Num);
        },500);
    }
    orgos(); 

Free Pic:
    https://www.pexels.com/search/fruits/
    https://unsplash.com/search/photos/fruits