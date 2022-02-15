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

        const ulElement = document.querySelector("#artwork")
        ulElement.appendChild(listElement)

    })
}

// create init method to start our APP
artApp.init = function() {
    console.log("App is initialized")
    artApp.getArt("bear")
}
artApp.init()