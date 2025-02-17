let base_url='https://api.currencyapi.com/v3/latest?apikey=fca_live_DNdChAVGZv4mvDGm4ruO8k3dgCaK2a1nO20kfhxF';
let dropdown=document.querySelectorAll('select');
let button=document.querySelector('form button')
let fromCurr=document.querySelector('.FROM select');
let toCurr=document.querySelector('.TO select')
let mssg= document.querySelector('.MSSG')

    for (select of dropdown){
        for(currcode in countryList){
            let newOption=document.createElement('option');
            newOption.innerHTML=currcode;
            newOption.value=currcode;
            if(select.name==='from'&& currcode==='USD' ){
                newOption.selected='selected'

            }
           else  if(select.name==='to'&& currcode==='INR' ){
                newOption.selected='selected'

            }
            select.append(newOption)
           
    
        }
        select.addEventListener('change',(e)=>{
            updateFlag(e.target)

        })
    }
    

    const updateFlag=(element)=>{
   let currcode=element.value
   let countryCode=countryList[currcode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
let img=element.parentElement.querySelector('img');
img.src=newSrc

    }
   
const updateRate=()=>{
    let amount=document.querySelector('input');
    let amountVal=amount.value;
    if(amountVal===''||amountVal<1){
     amountVal=1;
     amount.value='1'; 
    }
// console.log(fromCurr.value,toCurr.value)
  const URL=`${base_url}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`
fetch(URL)
.then((response)=>{
 return data= response.json() 
}).then((data)=>{

 return rate=data.data[toCurr.value].value
 
}).then((rate)=>{
 return finalAmount=amountVal*rate
}).then((finalAmount)=>{
 mssg.innerHTML=`${amountVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`
})
}
button.addEventListener(('click'),(e)=>{
    e.preventDefault();
    updateRate();
 
})  ;
window.addEventListener(('load'),()=>{
    updateRate();
    }); 