console.log("client side javascript")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const userInput = document.querySelector('form');
const search = document.querySelector('input');
const paragraphOne = document.querySelector('#paragraph-1');
const paragraphTwo = document.querySelector('#paragraph-2');

userInput.addEventListener('submit',(e)=>{
    e.preventDefault();
    paragraphOne.textContent = "Loading...";
    paragraphTwo.textContent = "";
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            paragraphOne.textContent = "";
            paragraphTwo.textContent = data.error;
        }
        else{
            paragraphOne.textContent = "Location: "+data.location;
            paragraphTwo.textContent = "ForeCast: "+data.forecast;
        }
    })
})
});
