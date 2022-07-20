let timer
let deleteFirstPhotoDelay


// Fetching the breed list 
async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json() //response returns another promise
        createBreedList(data.message) // object contains two keys - message and status
        //console.log(data.message); // the value of message is an array of arrays

    } catch (error) {
        console.log("There was a problem fetching the dog list  ")
    }

}
start();

// Displaying the list for the user, by providing the data to the select tag
function createBreedList(breedList) {
    document.getElementById("dropdown").innerHTML = `
     <select onChange = "loadByBreed(this.value)">
            <option >Choose a Dog Breed</option>
            ${Object.keys(breedList).map((breed) => { //Object.keys is available to access every object
                return `<option>${breed}</option>`})
            .join('')} // Joining all the select statement returned by map method
        </select>
     `
}

async function loadByBreed(breed) {
    if (breed != "Choose a Dog Breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(images) {
    let currPos = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style= "background-image: url('${images[0]}')"> </div>
        <div class="slide" style= "background-image: url('${images[1]}')"> </div>
    `
        currPos += 2
        if (images.length == 2) currPos = 0
        timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style= "background-image: url('${images[0]}')"> </div>
        <div class="slide"></div>
    `
    }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style= "background-image: url('${images[currPos]}')"> </div>`)
        deleteFirstPhotoDelay = setTimeout(() => {
            document.querySelector(".slide").remove()
            if (currPos + 1 >= images.length) { currPos = 0 }
            else { currPos++ }
        }, 1000)
    }
}