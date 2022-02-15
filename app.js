// Create an app object (to make use of namespacing)
const artApp = {};

// save information which will be reused 
artApp.apiKey = "zRAhUPqo";
artApp.apiUrl = "https://www.rijksmuseum.nl/api/en/collection";

// Create a method which will make a call to the API and get some data back
    // take data and put it on the page
artApp.getArt = function(usersChosenAnimal) {

    // use the URL constructor to format the API endpoint to which we will be making our request
    const url = new URL(artApp.apiUrl)
    console.log(url)

    // format and add our parameters to our URL
    url.search = new URLSearchParams({
        // include the API parameters here:
        key: artApp.apiKey,
        q: usersChosenAnimal,
        imgonly: true,
        ps: 25
    })

    // .fetch the data from API endpoint we have just constructed
    fetch(url)
        .then(function(apiResponse) {
            return apiResponse.json()
        })
        .then(function(artFromApi) {
            artApp.displayArt(artFromApi.artObjects)
        })
}

// create a method which will take the API data and display it on our page
artApp.displayArt = function(artArray) {

    const ulElement = document.querySelector("#artwork")
    ulElement.innerHTML = ""

    artArray.forEach(function(individualArtObject) {

        // extract the data from the API (artist name, title, img url, alt text)
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker;
        const altText = individualArtObject.longTitle;

        // create li element with a class of piece in which this info will be added
        // const listElement = document.createElement("li").classList.add("piece")
        // console.log(listElement)
        const listElement = document.createElement("li")
        listElement.classList.add("piece")

        // create an h2 to hold the title
        const heading = document.createElement("h2")
        heading.textContent = artworkTitle

        // create an img to hold the artwork picture
        const image = document.createElement("img")
        image.alt = altText
        image.src = artworkImage

        // create a p with class of artist to hold the artist name
        const paragraphElement = document.createElement("p")
        paragraphElement.classList.add("artist")
        paragraphElement.textContent = artist
        
        listElement.append(heading, image, paragraphElement)

        
        ulElement.appendChild(listElement)

    })
}
// create a method which will update the heading of the page
artApp.updateAnimalHeading = function(something) {
    document.querySelector("#page-title span").textContent = `${something}s!!`
}

// create a method which sets up all of the event listeners within this app
artApp.eventListenerSetUp = function() {
    // 1st event listener: on the select element (when user selects a different option, take the chosen animal and get the art related to that animal)
    const selectElement = document.querySelector("#animalChoices")
    // when the user selects a different option, get art related to the new choice
    selectElement.addEventListener("change", function() {
        artApp.getArt(this.value)

        const selectedAnimal = this.value.charAt(0).toUpperCase() + this.value.slice(1)
        artApp.getArt(selectedAnimal)
        artApp.updateAnimalHeading(selectedAnimal)
    })
}

// create init method to start our APP
artApp.init = function() {
    console.log("App is initialized")

    artApp.eventListenerSetUp()

    artApp.getArt("bear")
}
artApp.init()