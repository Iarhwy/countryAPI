// Берём элементы из дерева
let searchInput = document.getElementById('search__input'),
    searchBtn = document.getElementById('search__btn'),
    searchResult = document.getElementById('search__result')
// Функция получения данных
const getData = () => {
// Присваиваем переменной значение из input
    let countryName = searchInput.value,
// Вставляем в URL api полученное значение input
        finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
// Обрабатываем запрос на сервер
    fetch(finalUrl)
        .then(res => res.json())
        .then(data => {
            searchResult.innerHTML = ''
            getCountry(data)
        })
        .catch(() => {
// Валидация
            searchResult.style.color = 'crimson'
            searchResult.style.fontWeight = '600'
            if (countryName.length == 0) {
              searchResult.innerHTML = 'Поле не должно быть пустым'
            } else {
              searchResult.innerHTML = 'Введите корректное название страны на англ. языке'
            }
        })
}
// Функция отрисовки запрошенной страны
const getCountry = data => {
    let $contryFlag = document.createElement('img'),
        $countryName = document.createElement('h2'),
        $countrySubname = document.createElement('h3'),
        $countryCapitalHeader = document.createElement('label'),
        $countryCapitalBody = document.createElement('span'),
        $countryAreaHeader = document.createElement('label'),
        $countryAreaBody = document.createElement('span'),
        $countryContinentHeader = document.createElement('label'),
        $countryContinentBody = document.createElement('span'),
        $countryPopulHeader = document.createElement('label'),
        $countryPopulBody = document.createElement('span'),
        $countryCurHeader = document.createElement('label'),
        $countryCurBody = document.createElement('span'),
        $countryLangHeader = document.createElement('label'),
        $countryLangBody = document.createElement('span'),
        $countryInfo = document.createElement('div')

    $contryFlag.setAttribute('class', 'search__flag')
    $countryInfo.setAttribute('class', 'search__info')

    $contryFlag.src = data[0].flags.svg
    $contryFlag.alt = data[0].flags.alt
    $countryName.textContent = data[0].name.common
    $countrySubname.textContent = data[0].altSpellings[2]
    $countryCapitalHeader.textContent = 'Столица'
    $countryCapitalBody.textContent = data[0].capital[0]
    $countryAreaHeader.textContent = 'Территория'
    $countryAreaBody.textContent = Math.round(data[0].area * 1.609344)
    $countryContinentHeader.textContent = 'Континент'
    $countryContinentBody.textContent = data[0].continents[0]
    $countryPopulHeader.textContent = 'Население'
    $countryPopulBody.textContent = data[0].population
    $countryCurHeader.textContent = 'Валюта'
    $countryCurBody.textContent = `${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}`
    $countryLangHeader.textContent = 'Язык'
    $countryLangBody.textContent = Object.values(data[0].languages).toString().split(',').join(', ')

    $countryCapitalHeader.append($countryCapitalBody)
    $countryAreaHeader.append($countryAreaBody)
    $countryContinentHeader.append($countryContinentBody)
    $countryPopulHeader.append($countryPopulBody)
    $countryCurHeader.append($countryCurBody)
    $countryLangHeader.append($countryLangBody)
    $countryInfo.append($countryCapitalHeader, $countryAreaHeader, $countryContinentHeader, $countryPopulHeader, $countryCurHeader, $countryLangHeader)
    searchResult.append($contryFlag, $countryName, $countrySubname, $countryInfo)
}
// Накидываем обработчики событий на кнопку и при нажатии на клавишу Enter
searchBtn.addEventListener('click', getData)
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') getData()
})