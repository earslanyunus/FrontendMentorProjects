'use strict'

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



let firstLoad = true
let data


toggle.addEventListener('click',evt =>{

    if (document.querySelector('html').getAttribute('color-mode')=='light'){
        document.querySelector('html').setAttribute('color-mode','dark')
    }else{
        document.querySelector('html').setAttribute('color-mode','light')
    }
})


//ulke verisini cek
const getCountry = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    data = await response.json();


    //ilk 20 veriyi yukle
    if (response.ok) {
        loadbox()


    }

}
getCountry()

//Verilen arguman ile box objesi olusturur arguman obj olan ulke verisidir
const createBox = (ulke) => {

    const flag = ulke.flags.svg
    const name = ulke.name.common;
    const population = ulke.population;
    const region = ulke.region
    const capital = ulke.capital?.[0]


    const veri = ` <div class="box">
                        <div class="img-container">
                            <img src="${flag}" class="flag-img" alt="">    
                        </div>
                        <div class="box-text-box">
                            <p class="fw600 country-name">${name}</p>
                            <p class="fw600 population-text">Population: <span class="fw300 population">${population}</span></p>
                            <p class="fw600 region-text">Region: <span class="fw300 region">${region}</span></p>
                            <p class="fw600 capital-text">Capital: <span class="fw300 capital">${capital}</span></p>
                        </div>`
    country_area.insertAdjacentHTML("beforeend", veri);


}
//ilk 20 ulkeyi en basta olusturmak icin fonksiyon
let currentNum = 0
let objectnum = 20

const loadbox = () => {
    for (currentNum; currentNum < objectnum; currentNum++) {
        createBox(data[currentNum])

    }
    objectnum += 20


}

//

let x = []
search.addEventListener('keyup', evt => {
    firstLoad = false
    country_area.textContent = ''
    loadbtn.textContent = 'Load'

    const input = search.value.toLowerCase()
    data.forEach(elm => {
        const countryName = elm.name.common.toLowerCase();
        if (countryName.indexOf(input) > -1) {


            //createBox(elm)
            x.push(elm)
        }
    })

    x.forEach(elm => {
        createBox(elm)

    })

    x = []
    controlCard()

})


//Ekranda gozuken ulke sayisini kontrol ediliyor 20 den fazla ise geri kalan none ediliyor
const controlCard = () => {
    if (country_area.childElementCount > 20) {
        for (let i = 20; i < country_area.childElementCount; i++) {
            country_area.children[i].style.display = 'none'
        }

    }
}
//load butonu fonksiyonu
let activecount = 0
let loadfor = 0
const loadMore = () => {
    try {

        if (firstLoad == true){
            loadbox()
        }

        if (firstLoad == false){
        if (country_area.childElementCount > 20) {

            for (const element of country_area.children) {

                if (!(element.style.display == 'none')) {

                    activecount++
                    if (activecount > data.length) {
                        activecount = data.length
                    }
                }


            }


            for (loadfor = activecount; loadfor < activecount + 20; loadfor++) {

                if (!(activecount == data.length)) {

                    country_area.children[loadfor].style.display = 'flex'


                }

            }
        }}

    } catch (e) {
        console.error(e.message)
        loadbtn.textContent = 'Not Found Country'

    }
    activecount = 0
}


loadbtn.addEventListener('click', () => {
    loadMore()
});

filter.addEventListener('change', evt => {
    loadbtn.textContent = 'Load'

    firstLoad = false
    country_area.textContent = ''
    const selected = filter.options[filter.selectedIndex].text
    if (!(selected == 'All')){
    data.forEach(elm =>{
        if (elm.region == selected){
            x.push(elm)
        }
    })
    x.forEach(elm => {
        createBox(elm)
    })}
    else if (selected == 'All'){
        data.forEach(elm =>{
            x.push(elm)
        })
        x.forEach(elm => {
            createBox(elm)
        })
    }
    controlCard()
    x = []
})

const searchWithcca3 = (ulke) =>{
    let country = []

    data.forEach(elm =>{
        const countryName = elm.cca3
        if (countryName.indexOf(ulke)>-1){
            detailsContainer.classList.remove('none')
            mainArea.classList.add('none')
            country.push(elm)

            updateDetailsUi(country[0])

        }


    })
    country = []

}


const updateDetailsUi = (ulke) =>{
    detailHeadText.textContent = ulke.name.common
    detailImg.setAttribute('src',`${ulke.flags.svg}`)
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
    if (!(ulke.borders == undefined)){

        detailBorders.textContent = ''
        ulke.borders.forEach(elm => {
            let borderbtn = ` <button class="primaryBtn">${elm}</button>`
            detailBorders.insertAdjacentHTML('beforeend',borderbtn)

        })

    }else if(ulke.borders == undefined){
        detailBorders.textContent = 'No Borders'
    }


}


const findCountry = (ulke) =>{
    let country = []

data.forEach(elm =>{
    const countryName = elm.name.common
    if (countryName.indexOf(ulke)>-1){
        detailsContainer.classList.remove('none')
        mainArea.classList.add('none')
        country.push(elm)

        updateDetailsUi(country[0])

    }


})
    country = []

}

country_area.addEventListener('click', evt => {
   if (evt.target.closest('.box')){
       const selectedCountry =  evt.target.closest('.box').lastChild.firstElementChild.textContent
       findCountry(selectedCountry)
   }

})
backButton.addEventListener('click', evt => {
    detailsContainer.classList.add('none')
    mainArea.classList.remove('none')


})
detailBorders.addEventListener('click',evt => {
    if (evt.target.classList.contains('primaryBtn')){
        const selectedBorder =  evt.target.textContent
        searchWithcca3(selectedBorder)
    }
})

