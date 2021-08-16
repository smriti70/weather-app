console.log("client side javascript")

const userInput = document.querySelector('form');
const search = document.querySelector('input');
const paragraphOne = document.querySelector('#paragraph-1');
const paragraphTwo = document.querySelector('#paragraph-2');
const image = document.querySelector('#image');

userInput.addEventListener('submit',(e)=>{
    e.preventDefault();
    paragraphOne.textContent = "Loading...";
    paragraphTwo.textContent = "";
    fetch('/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            paragraphOne.textContent = "";
            paragraphTwo.textContent = data.error;
        }
        else{
            paragraphOne.textContent = "Location: "+data.location;
            paragraphTwo.textContent = "ForeCast: "+data.forecast;
            image.src = data.imageURL;
            image.style.height = 'auto';
            image.style.width = 'auto';
        }
    })
})
});

