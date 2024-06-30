const host = 'api.frankfurter.app';
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(curCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name == "from" && curCode == "USD"){
            newOption.selected = "selected";
        }
        if(select.name == "to" && curCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}
const updateFlag = (element) =>{
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc
};
const updateExchangeRate = async () =>{
    let amount = document.querySelector(".EnterAmount input");
    let amtVal = amount.value;
    if(amtVal.Val == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = (`https://${host}/latest?amount=${amtVal}&from=${fromCur.value}&to=${toCur.value}`)
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCur.value];
    let finalAmt = amtVal*rate; 
    msg.innerText = `${finalAmt}`;
};
btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});
