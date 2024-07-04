// بسم الله الرحمن الرحيم 

// Call All Classes 
let copyBtn = document.querySelector(".copy-button");
let right = `<i class="fa-solid fa-check"></i>`
let sound = document.querySelector(".sound");
let twitter = document.querySelector(".x-twitter");

let quoteId = document.querySelector(".quote-id");
let quoteDiv = document.querySelector(".quote-display");
let authorName = document.querySelector(".author-name");

let generate = document.querySelector(".button-generate");
let auto = document.querySelector(".button-auto");
let stop = document.querySelector(".button-stop");
let github = document.querySelector(".github");
let intervalId;


// Get API and convert. 
async function getQuote(){
    let respone = await fetch("https://api.quotable.io/random");
    let data = await respone.json()
    return data
}


// Generate the Quotes 
async function generateQuotes(){
    generate.classList.add("loading");
    generate.innerHTML = "Loading..."
    const quotes = await getQuote();
    quoteId.innerHTML = quotes.length;
    quoteDiv.innerHTML = quotes.content;
    authorName.innerHTML = `- ${quotes.author} -`;
    generate.innerHTML = "Start"
    generate.classList.remove("loading")
}

generate.addEventListener("click" , generateQuotes);

// make anthor function to just use Data 
async function auotStatus(){
    const quotes = await getQuote();
    quoteDiv.innerHTML = quotes.content;
    quoteId.innerHTML = quotes.length;
    authorName.innerHTML = `- ${quotes.author} -`;
}
// function for auto  Button 
async function autoPlay(){
    intervalId = setInterval(auotStatus , 6000);
    auto.classList.add("done")
    auto.innerHTML = 'Auto: On'
}

auto.addEventListener("click" , autoPlay)


// Stop the auto play 
stop.addEventListener("click" , () =>{
    clearInterval(intervalId);
    auto.classList.remove('done')
    auto.innerHTML = "Auto"
})


// Copy The Quoute 
copyBtn.addEventListener('click' , ()=>{
    const theQoute = quoteDiv.innerHTML;
    navigator.clipboard.writeText(theQoute);
    copyBtn.innerHTML = right;
    
    setTimeout(() => {
        copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`
    }, 2000);
});




// listen to the Quote 
async function auotSound (){
    sound.classList.add("play")
    const speak = new SpeechSynthesisUtterance(`${quoteDiv.innerHTML} by ${authorName.innerHTML}`);
    speechSynthesis.speak(speak);
    setTimeout(() => {
        sound.classList.remove("play")
    }, 6000);
}

sound.addEventListener("click" ,auotSound);


// Share The Quote on X (Twitter)
twitter.addEventListener("click", ()=> {
    let twittURL = `http://www.twitter.com/share?url=${quoteDiv.innerHTML} by ${authorName.innerHTML} `;
    window.open(twittURL , "_black")
});

github.addEventListener("click" , () => {
    const link = `https://github.com/Kobesy0`;
    window.open(link , "_blank")
})
// End 
