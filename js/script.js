console.log(`4-infinite-scroll`);

let endOfThePage = 0;

let preloading = false; //Przed załadowaniem się danych będzie ustawiana ,,flaga'' = false, domyślnie. Nie ma preloadingu. 


const showPreloader = () => { //Pokazywanie preloader
    let preloader = document.getElementById('preloader'); //Pobranie do zmiennej preloader'a
    console.log('showPreloader()');
    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => { //Ukrywanie preloader'a
    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()');
    preloader.style.display = 'none';
    preloading = false;
}

const getData = () => {

    if (!preloading) { //Jeśli nie jesteśmy w preloadingu

        showPreloader(); //Uruchomienie funkcji

        fetch('https://akademia108.pl/api/ajax/get-users.php') //Pobieranie danych (użytkowników) z API - metodą .get https
            .then(res => res.json()) 
            .then(data => {

                let body = document.body; 
                let hr = document.createElement('hr'); //Tworzenie linii horyzontalnej (separator)
                body.appendChild(hr); //Dołączanie danych do strony

                for (let user of data) {
                    let pId = document.createElement('p'); //Tworzenie paragrafów
                    let pName = document.createElement('p'); //-,,-
                    let pWebsite = document.createElement('p'); //-,,-

                    pId.innerText = `User ID: ${user.id}`; //Wrzucanie danych do paragrafów
                    pName.innerText = `User Name: ${user.name}`; //-,,-
                    pWebsite.innerHTML = `User URL: ${user.pWebsite} <br />-------------`; //-,,- + rozdzielenie użytkowników separatorem

                    body.appendChild(pId); //Dołączanie danych do strony
                    body.appendChild(pName); //-,,-
                    body.appendChild(pWebsite); //-,,-
                }

                hidePreloader();

                console.log(data);
            })
            
            .catch(error => {
                console.log(error);
            });
        // console.log('getData()');
    }
}

const scrollToEndOfPage = () => { //Funkcja, która obsługuje scroll'a

let d = document.documentElement; //document.documentElement - właściwość, by sprawdzić czy strona została do końca przeskrolowana


    //  height of an element's content, including content not visible on the screen
    let scrollHeight = d.scrollHeight; //Pobór całej długości strony od góry do dołu

    //  number of pixels that an element's content is scrolled vertically
    let scrollTop = d.scrollTop; //Pobór tego, co jest u góry strony - wysokość, na jaką przeskrolowano stronę 

    //  inner height of an element in pixels
    let clientHeight = d.clientHeight; //Wewnętrzna wysokość okna przeglądarki

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`=============================`);

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfThePage += 1; 

        console.log(`Scrolled to the end of page: ${endOfThePage}`); //Ile razy przeskrolowano do końca strony

        getData();

        // console.log('scrollToEndOfPage()');
    }
}

window.addEventListener(`scroll`, scrollToEndOfPage); //Funkcja, która obsługuje scroll'a