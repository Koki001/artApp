// Create an app object (to make use of namespacing)
const artApp = {};

// save information which will be reused 
artApp.apiKey = "zRAhUPqo";
artApp.apiUrl = "https://www.rijksmuseum.nl/api/en/collection";

// Create a method which will make a call to the API and get some data back
    // take data and put it on the page
artApp.getArt = function() {

    // use the URL constructor to format the API endpoint to which we will be making our request
    const url = new URL(artApp.apiUrl)
    console.log(url)

    // format and add our parameters to our URL
    url.search = new URLSearchParams({
        // include the API parameters here:
        key: artApp.apiKey,
        q: "monkey",
        imgonly: true
    })

    // .fetch the data from API endpoint we have just constructed
    fetch(url)
        .then(function(apiResponse) {
            return apiResponse.json()
        })
        .then(function(artFromApi) {
            console.log(artFromApi.artObjects)
        })

}

// create init method to start our APP
artApp.init = function() {
    console.log("App is initialized")
    artApp.getArt()
}
artApp.init()