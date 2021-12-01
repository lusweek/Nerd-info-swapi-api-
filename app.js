const openLoadingBox = () => document.querySelector(".load-section").style.display = "flex" 
const closeLoadingBox = () => document.querySelector(".load-section").style.display = "none"


const modal = document.querySelector(".modal-section")
const boxes = document.querySelectorAll(".movie-box")
let posts = []; 
let post = {};

// .map kan bara användas på array 

/*tar länken, gör om det till javascript med .json
sedan tar jag ut resultaten från från länken.
Resultaten är en array som jag kör .map på, vilet gör om alla
objekt i results till en div med en h1 i sig, h1 innehåller
title, vilket ger mig titeln för varje film från länken.
sedan . join för att göra om arrayen till en sträng för att 
inte få några kommatäcken.
*/
const getMovies = async () => {
    openLoadingBox()
    const res = await fetch(`https://swapi.dev/api/films/`)
    const data = await res.json()
    posts = data.results
    document.querySelector("#movies").innerHTML = posts.map((post, index) => 
        `<div onclick=" getTitle(${index});" class="movie-box"><h1>${post.title}</h1>
        <h1>${post.release_date}</h1>
        </div>`).join(""); 
        closeLoadingBox()
};


const getTitle = async (index) => {

    modal.style.display = "flex";

    openLoadingBox()

            document.querySelector(".modal-title")
            .innerHTML = `<h1>${posts[index].title}</h1>`


            /* I getMovies lades information in i posts. Där gav vi även varje box en index. map(value, index value) - mappar up varde 
            objekt i arrayen och ger en index till varje box. Varje box ger jag ett onklick event och en index. 
            Denna indexen hämtar jag i början på denna funktion. Så vet datorn vilken box jag klickar på. 

            Det som händer sedan är att jag hämtar alla karraktärer från indexen. Detta gör jag med en map. (post) är en variabel
            som kan vara vadsomhällst, den representerar varje objekt i arrayen en åt gången. alltså blir i detta fallet post 
            en länk till en karraktär för varje gång. vi fetchar denna länk, sedan gör vi om resultatet till json för att det ska
            bli läsbart i json.

            res blir av någon anlednign en promise som vi måste göra om till informationen vi vill använda. Dett gör vi genom att 
            skriva promise.all(fetchcaracters)
            */
            const fetchcaracters = posts[index].characters.map(post => {
                return fetch(post).then(res => res.json())
            })

            const result = await Promise.all(fetchcaracters);      

            document.querySelector(".modal-cracters").innerHTML = result.map((post) =>  
            `<p>${post.name}</p>`
            ).join("")

        closeLoadingBox()
} 


const closeModal = () => {
    document.querySelector("#cross").addEventListener("click", () => {
        modal.style.display="none"
    })
}

window.addEventListener("load", () => {
    getMovies()
    closeModal()
})



/*  
EXEMPEL PÅ RESULTAT AV FETCH TILL JSON
characters: (16) ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/', 'https://swapi.dev/api/people/3/', 'https://swapi.dev/api/people/4/', 'https://swapi.dev/api/people/5/', 'https://swapi.dev/api/people/10/', 'https://swapi.dev/api/people/13/', 'https://swapi.dev/api/people/14/', 'https://swapi.dev/api/people/18/', 'https://swapi.dev/api/people/20/', 'https://swapi.dev/api/people/21/', 'https://swapi.dev/api/people/22/', 'https://swapi.dev/api/people/23/', 'https://swapi.dev/api/people/24/', 'https://swapi.dev/api/people/25/', 'https://swapi.dev/api/people/26/']
created: "2014-12-12T11:26:24.656000Z"
director: "Irvin Kershner"
edited: "2014-12-15T13:07:53.386000Z"
episode_id: 5
opening_crawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space...."
planets: (4) ['https://swapi.dev/api/planets/4/', 'https://swapi.dev/api/planets/5/', 'https://swapi.dev/api/planets/6/', 'https://swapi.dev/api/planets/27/']
producer: "Gary Kurtz, Rick McCallum"
release_date: "1980-05-17"
species: (5) ['https://swapi.dev/api/species/1/', 'https://swapi.dev/api/species/2/', 'https://swapi.dev/api/species/3/', 'https://swapi.dev/api/species/6/', 'https://swapi.dev/api/species/7/']
starships: (9) ['https://swapi.dev/api/starships/3/', 'https://swapi.dev/api/starships/10/', 'https://swapi.dev/api/starships/11/', 'https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/15/', 'https://swapi.dev/api/starships/17/', 'https://swapi.dev/api/starships/21/', 'https://swapi.dev/api/starships/22/', 'https://swapi.dev/api/starships/23/']
title: "The Empire Strikes Back"
url: "https://swapi.dev/api/films/2/"
*/