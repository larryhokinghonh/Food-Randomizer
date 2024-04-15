const foods = [
    {name: "Nasi Lemak", imageURL: "..\\img\\nasi-lemak.jpg"},
    {name: "Ayam Goreng", imageURL: "..\\img\\ayam-goreng.jpg"},
    {name: "Nasi Dagang", imageURL: "..\\img\\nasi-dagang.jpg"},
    {name: "Nasi Tumpang", imageURL: "..\\img\\nasi-tumpang.jpg"},
    {name: "Roti Jala", imageURL: "..\\img\\roti-jala.jpg"},
    {name: "Sup Kambing", imageURL: "..\\img\\sup-kambing.jpg"},
    {name: "Sambal Udang", imageURL: "..\\img\\sambal-udang.jpg"},
    {name: "Nasi Kerabu", imageURL: "..\\img\\nasi-kerabu.jpeg"},
    {name: "Lontong", imageURL: "..\\img\\lontong.png"},
    {name: "Rendang", imageURL: "..\\img\\rendang.jpg"},
    {name: "Pecal", imageURL: "..\\img\\pecal.jpg"},
    {name: "Lemang", imageURL: "..\\img\\lemang.jpg"},
    {name: "Biryani", imageURL: "..\\img\\biryani.jpg"},
    {name: "Bak Kut Teh", imageURL: "..\\img\\bak-kut-teh.png"},
    {name: "Jeu Hoo Char", imageURL: "..\\img\\jeu-hoo-char.jpg"},
    {name: "Char Kway Teow", imageURL: "..\\img\\char-kway-teow.jpg"},
    {name: "O Chian", imageURL: "..\\img\\o-chian.jpg"},
    {name: "Roti Canai", imageURL: "..\\img\\roti-canai.jpg"},
    {name: "Mee Rebus", imageURL: "..\\img\\mee-rebus.jpg"},
    {name: "Lor Bak", imageURL: "..\\img\\lor-bak.jpg"},
    {name: "Roti Tisu", imageURL: "..\\img\\roti-tisu.jpg"},
    {name: "Kaya Pau", imageURL: "..\\img\\kaya-pau.jpg"},
    {name: "Ikan Bakar", imageURL: "..\\img\\ikan-bakar.jpg"},
    {name: "Pisang Goreng", imageURL: "..\\img\\pisang-goreng.jpg"},
    {name: "Satay", imageURL: "..\\img\\satay.jpg"},
    {name: "Laksa", imageURL: "..\\img\\laksa.jpg"},
    {name: "Bubur", imageURL: "..\\img\\bubur.jpg"},
    {name: "Apam Balik", imageURL: "..\\img\\apam-balik.jpg"},
    {name: "Wonton Mee", imageURL: "..\\img\\wonton-mee.jpg"},
    {name: "Murtabak", imageURL: "..\\img\\murtabak.jpg"},
    {name: "Asam Pedas", imageURL: "..\\img\\asam-pedas.jpg"},
    {name: "Tepung Pelita", imageURL: "..\\img\\tepung-pelita.jpg"},
    {name: "Rojak", imageURL: "..\\img\\rojak.jpg"},
    {name: "Curry Puff", imageURL: "..\\img\\curry-puff.jpg"},
    {name: "Popiah", imageURL: "..\\img\\popiah.jpg"},
    {name: "Hinava", imageURL: "..\\img\\hinava.jpg"}
]

let prevFoodName = []
let prevImg = []
let pointer = -1

function getNewFood() {
    if (prevFoodName.includes(document.getElementById("food-name").innerHTML) == false && prevImg.includes(document.getElementById("img").src) == false) {
        prevFoodName.push(document.getElementById("food-name").innerHTML)
        prevImg.push(document.getElementById("img").src)
        pointer++
    }

    const index = Math.floor(Math.random() * foods.length)
    return foods[index]
}

function displayNewFood() {
    const foodItem = getNewFood()
    document.getElementById("food-name").innerHTML = foodItem.name
    document.getElementById("img").src = foodItem.imageURL
}

function displayFood() {
    if (pointer < prevFoodName.length-1 && pointer < prevImg.length-1 && prevFoodName.length != 0 && prevFoodName.length != 0) {
        pointer++
        document.getElementById("food-name").innerHTML = prevFoodName[pointer]
        document.getElementById("img").src = prevImg[pointer]
    } else {
        displayNewFood()
    }
}

function displayPrevFood() {
    if (prevFoodName.length > 0 && prevImg.length > 0 && pointer-1 >= 0) {
        pointer--
        document.getElementById("food-name").innerHTML = prevFoodName[pointer]
        document.getElementById("img").src = prevImg[pointer]
    }
}

async function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            const coords = [position.coords.latitude, position.coords.longitude];
            resolve(coords)
        }, error => {
            reject(error)
        })
    })
}

async function initMap() {
  const { Place } = await google.maps.importLibrary("places");
  const userCoords = await getUserLocation()
  const request = {
    textQuery: "Nasi Lemak in Malaysia",
    fields: ["displayName", "rating", "userRatingCount", "googleMapsURI"],
    includedType: "restaurant",
    locationBias: {lat: userCoords[0], lng: userCoords[1]},
    isOpenNow: true,
    // language: "en-US",
    maxResultCount: 10,
    minRating: 3.5,
    region: "my",
    useStrictTypeFiltering: true,
  };
  //@ts-ignore
  const { places } = await Place.searchByText(request);

  if (places.length) {
    console.log(places);
    // Loop through and get all the results.
    placeSuggestionDiv = document.getElementsByClassName("rounded")[1]
    console.log(placeSuggestionDiv)
    placeSuggestionDiv.setAttribute("id", "places-suggestion-div")
    places.forEach((place) => {
        // for each loop, create a new div, add an id to the div, add the contents in the div, have two rows in the div
        let currentNode = document.getElementById("places-suggestion-div").appendChild(document.createElement("div"))
        currentNode.id = "place-suggestion"
        currentNode.appendChild(document.createElement("div"))
        currentNode.appendChild(document.createElement("div"))
        currentNode.children[0].id = "place-info"
        currentNode.children[0].appendChild(document.createElement("h6"))
        currentNode.children[0].children[0].textContent = place.displayName + place.rating + place.userRatingCount
        currentNode.children[1].id = "place-url"
        currentNode.children[1].appendChild(document.createElement("a"))
        currentNode.children[1].children[0].setAttribute("href", place.googleMapsURI)
        currentNode.children[1].children[0].textContent = place.googleMapsURI

      console.log(place.displayName, place.rating, place.userRatingCount, place.googleMapsURI);
    });
  } else {
    console.log("No results");
  }
}

// getUserLocation();
// initMap();