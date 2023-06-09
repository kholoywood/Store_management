let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discound = document.getElementById('discound');
let totel = document.getElementById('totel');
let count = document.getElementById('count');
let catogery = document.getElementById('catogery');
let create = document.getElementById('create');

let mood = 'create';
let tmb ;



function gettotel (){
    if(price.value != ''){
        let result =(+price.value + +texes.value + +ads.value  ) - +discound.value;
        totel.innerHTML = result;
        totel.style.background ='#040' ;
    }else{
        totel.innerHTML = '';
        totel.style.background ='#a00d02' ;
    }
}


let detapro  ;
if(localStorage.product != null){
    detapro = JSON.parse(localStorage.product);
}else{
    detapro = [];
}


create.onclick = function(){
    let newpro = {
        title:title.value,
        price:price.value,
        texes:texes.value,
        ads:ads.value,
        discount:discound.value,
        totel:totel.innerHTML,
        count:count.value,
        catogery:catogery.value,
    }
  if(mood ==='create'){
    if(newpro.count > 1){
        for( let i = 0 ; i <newpro.count ;i++){
            detapro.push(newpro);
        }
    }
    else{
        detapro.push(newpro);
    }
  }
  else{
    detapro[tmb] = newpro;
    create.innerHTML ='create';
    count.style.display = 'block'

  }
     
    

  
    localStorage.setItem('product',   JSON.stringify(detapro)   )
    console.log(detapro);
  

    cler();
    show();
}

//////cler///


function cler(){
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value   = '';
    discound.value = '';
    totel.innerHTML = '';
    count.value = '';
    catogery.value = '';
}

/////show///

function show(){
  
let table = '';
for( let i = 0; i < detapro.length ; i++){
    table +=` 
      <tr>
    <td>${i}</td>
    <td>${detapro[i].title}</td>
    <td>${detapro[i].price}</td>
    <td>${detapro[i].texes}</td>
    <td>${detapro[i].ads}</td>
    <td>${detapro[i].discound}</td>
    <td>${detapro[i].totel}</td>
    <td>${detapro[i].catogery}</td>
    <td> <button onclick="update(${i})" id="update">update</button></td>
    <td>  <button onclick =" deletData(${i})" id="delete">delete</button></td>
    </tr>
    ` 

}


document.getElementById('tbody').innerHTML = table

let btnDelete =  document.getElementById('deleteAll')

if(detapro.length > 0){
btnDelete.innerHTML =`
<button  onclick ="deleteAll()">delete all </button>
`
}else{
    btnDelete.innerHTML = ''; 
}

}
show();

///delete ///




function deletData(i) {
   detapro.splice(i,1);
   localStorage.product = JSON.stringify(detapro)
   show();
}

//////delete all///

function deleteAll(){
    localStorage.clear;
    detapro.splice(0);
    show();

}
/////update///


function update(i){
    title.value = detapro[i].title;
    price.value = detapro[i].price;
    texes.value = detapro[i].texes;
    ads.value = detapro[i].ads;
    discound.value = detapro[i].discound;
    gettotel();
    count.style.display = 'none'
    catogery.value = detapro[i].catogery;
    create.innerHTML ='update';
    mood ='update';

    tmb = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
//////////serch//
let searchMood = 'title';
function getSearchMood(id){

    let search =document.getElementById('search');
    if( id == 'searchtitl'){
        searchMood = 'title';
        search.placeholder ='search by title'
    }else{
        searchMood = 'category';
        search.placeholder ='search by category'
    }
    search.focus();
    search.value = '';
    show();

}

function searchData(value){
   
    let table = '';
    if(searchMood == 'title'){
        for(let i =0;i < detapro.length;i++){
            if(detapro[i].title.includes(value)){
                table +=` 
                <tr>
              <td>${i}</td>
              <td>${detapro[i].title}</td>
              <td>${detapro[i].price}</td>
              <td>${detapro[i].texes}</td>
              <td>${detapro[i].ads}</td>
              <td>${detapro[i].discound}</td>
              <td>${detapro[i].totel}</td>
              <td>${detapro[i].catogery}</td>
              <td> <button onclick="update(${i})" id="update">update</button></td>
              <td>  <button onclick =" deletData(${i})" id="delete">delete</button></td>
              </tr>
              ` 
                
            }
    
           
        }
    }else{
        for(let i =0;i < detapro.length;i++){
            if(detapro[i].catogery.includes(value)){
                table +=` 
                <tr>
              <td>${i}</td>
              <td>${detapro[i].title}</td>
              <td>${detapro[i].price}</td>
              <td>${detapro[i].texes}</td>
              <td>${detapro[i].ads}</td>
              <td>${detapro[i].discound}</td>
              <td>${detapro[i].totel}</td>
              <td>${detapro[i].catogery}</td>
              <td> <button onclick="update(${i})" id="update">update</button></td>
              <td>  <button onclick =" deletData(${i})" id="delete">delete</button></td>
              </tr>
              ` 
                
            }
    
           
        }
    }
 
    document.getElementById('tbody').innerHTML = table
}









