'use strict'
//ACCES DOM CONTENT

const loadbtn = document.querySelector('.load')
const country_area = document.querySelector('.country-area')
const search = document.querySelector('#search')
const toggle = document.querySelector('.mode-toggle')
const filter = document.querySelector('.region-select')
const mainArea = document.querySelector('#main-area')

//Details page dom
const backButton = document.querySelector('#backButton')
const detailsContainer = document.querySelector('#detailsContainer')
const detailImg = document.querySelector('#detailImage')
const detailHeadText = document.querySelector('#detailHeadText')
const detailNativeName = document.querySelector('#detailNativeName')
const detailPopulation = document.querySelector('#detailPopulation')
const detailRegion = document.querySelector('#detailRegion')
const detailSubRegion = document.querySelector('#detailSubRegion')
const detailCapital = document.querySelector('#detailCapital')
const detailDomain = document.querySelector('#detailDomain')
const detailCurrencies = document.querySelector('#detailCurrencies')
const detailLanguages = document.querySelector('#detailLanguages')
const detailBorders = document.querySelector('#detailBorders')


//CHECK is the page load first time
let IsPageFirstLoad = true

//Country data storage
let data


//Dark mode button event
//CHECK is the page mode light
toggle.addEventListener('click', evt => {
    const isModeLight = document.querySelector('html').getAttribute('color-mode') == 'light'


    if (isModeLight) {
        document.querySelector('html').setAttribute('color-mode', 'dark')
    } else if (!isModeLight) {
        document.querySelector('html').setAttribute('color-mode', 'light')
    }
})


//GET country data
const getCountry = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    data = await response.json();


    //loadbox
    if (response.ok) {
        loadbox()


    }

}
getCountry()

//FUNCTION FOR CREATING BOX ELEMENT
//get argument as country
const createBox = (country) => {

    const flag = country.flags.svg
    const name = country.name.common;
    const population = country.population;
    const region = country.region
    const capital = country.capital?.[0]


    const countryElement = ` <div class="box">
                        <div class="img-container">
                            <img src="${flag}" class="flag-img" alt="">    
                        </div>
                        <div class="box-text-box">
                            <p class="fw600 country-name">${name}</p>
                            <p class="fw600 population-text">Population: <span class="fw300 population">${population}</span></p>
                            <p class="fw600 region-text">Region: <span class="fw300 region">${region}</span></p>
                            <p class="fw600 capital-text">Capital: <span class="fw300 capital">${capital}</span></p>
                        </div>`
    country_area.insertAdjacentHTML("beforeend", countryElement);


}


//DEFINE current box count
let currentNum = 0
//DEFINE target box count
let objectnum = 20

const loadbox = () => {
    //continue until you reach objectnum count
    for (currentNum; currentNum < objectnum; currentNum++) {
        createBox(data[currentNum])

    }
    objectnum += 20


}


//DEFINE array for selected storage selected country objects
let x = []
search.addEventListener('keyup', evt => {
    IsPageFirstLoad = false
    country_area.textContent = ''
    loadbtn.textContent = 'Load'

    //input value to lower case
    const input = search.value.toLowerCase()
    data.forEach(elm => {
        const countryName = elm.name.common.toLowerCase();
        if (countryName.indexOf(input) > -1) {


            //selected countries push to array
            x.push(elm)
        }
    })
    //selected countries display ui
    x.forEach(elm => {
        createBox(elm)

    })
    //reset selected country
    x = []
    controlCard()

})


//if card element count over 20,display none after 20
const controlCard = () => {
    if (country_area.childElementCount > 20) {
        for (let i = 20; i < country_area.childElementCount; i++) {
            country_area.children[i].style.display = 'none'
        }

    }
}


//define visible box count
let visibleBoxCount = 0
let loadfor = 0

const defineVisibleBoxCount = () => {
    for (const element of country_area.children) {

        if (!(element.style.display == 'none')) {

            visibleBoxCount++
            if (visibleBoxCount > data.length) {
                visibleBoxCount = data.length
            }
        }

    }
}

const loadMoreBox = () => {
    for (loadfor = visibleBoxCount; loadfor < visibleBoxCount + 20; loadfor++) {

        if (!(visibleBoxCount == data.length)) {

            country_area.children[loadfor].style.display = 'flex'


        }

    }
}
const loadMore = () => {
    try {

        if (IsPageFirstLoad == true) {
            loadbox()
        }

        if (IsPageFirstLoad == false) {
            if (country_area.childElementCount > 20) {

                defineVisibleBoxCount()
                //chech box count == all country count if not equal load more 20
                loadMoreBox()
            }
        }

    } catch (e) {
        console.error(e.message)
        loadbtn.textContent = 'Not Found Country'

    }
    //RESET visible box count
    visibleBoxCount = 0
}


loadbtn.addEventListener('click', () => {
    loadMore()
});

filter.addEventListener('change', evt => {
    //reset load btn text content
    loadbtn.textContent = 'Load'
    //define page first load
    IsPageFirstLoad = false
    country_area.textContent = ''
    //define selected option value
    const selected = filter.options[filter.selectedIndex].text
    if (!(selected == 'All')) {

        data.forEach(elm => {
            //selected option country add array
            if (elm.region == selected) {
                x.push(elm)
            }
        })
        //selected country display ui
        x.forEach(elm => {
            createBox(elm)
        })
    } else if (selected == 'All') {
        data.forEach(elm => {
            x.push(elm)
        })
        x.forEach(elm => {
            createBox(elm)
        })
    }
    //control card count if over 20, after 20 display none
    controlCard()
    //reset selected array
    x = []
})

const searchWithcca3 = (ulke) => {
    let country = []

    data.forEach(elm => {
        const countryName = elm.cca3
        if (countryName.indexOf(ulke) > -1) {
            detailsContainer.classList.remove('none')
            mainArea.classList.add('none')
            country.push(elm)

            updateDetailsUi(country[0])

        }


    })
    country = []

}


const updateDetailsUi = (ulke) => {
    detailHeadText.textContent = ulke.name.common
    detailImg.setAttribute('src', `${ulke.flags.svg}`)
    const nativeName = Object.entries(ulke.name.nativeName)
    detailNativeName.textContent = nativeName[0][1].official
    detailPopulation.textContent = ulke.population
    detailRegion.textContent = ulke.region
    detailSubRegion.textContent = ulke.subregion
    detailCapital.textContent = ulke.capital[0]
    detailDomain.textContent = ulke.tld[0]
    const currencies = Object.entries(ulke.currencies)
    detailCurrencies.textContent = currencies[0][0]
    const languages = Object.entries(ulke.languages)
    detailLanguages.textContent = languages[0][0]
    //if ulke borders is none
    if (!(ulke.borders == undefined)) {

        detailBorders.textContent = ''
        ulke.borders.forEach(elm => {
            let borderbtn = ` <button class="primaryBtn">${elm}</button>`
            detailBorders.insertAdjacentHTML('beforeend', borderbtn)

        })

    } else if (ulke.borders == undefined) {
        detailBorders.textContent = 'No Borders'
    }


}


const findCountry = (ulke) => {
    let country = []

    //all country for loop
    data.forEach(elm => {
        const countryName = elm.name.common
        //input value equal country name display ui
        if (countryName.indexOf(ulke) > -1) {
            detailsContainer.classList.remove('none')
            mainArea.classList.add('none')
            country.push(elm)

            updateDetailsUi(country[0])

        }


    })
    country = []

}

//box selected event
country_area.addEventListener('click', evt => {
    const isThereaBox = evt.target.closest('.box')
    if (isThereaBox) {
        const selectedCountry = evt.target.closest('.box').lastChild.firstElementChild.textContent
        findCountry(selectedCountry)
    }

})
backButton.addEventListener('click', evt => {
    detailsContainer.classList.add('none')
    mainArea.classList.remove('none')


})

detailBorders.addEventListener('click', evt => {
    if (evt.target.classList.contains('primaryBtn')) {
        const selectedBorder = evt.target.textContent
        searchWithcca3(selectedBorder)
    }
})

