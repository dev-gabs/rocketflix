var language = 'en'
var randomNumber = 0

const h1Header = pageHeader.querySelector('h1')
const pMain = pageMain.querySelector('.wrapper > p')
const buttonMain = pageMain.querySelector('.wrapper > button > p')

function enLan() {
  language = 'en'

  h1Header.textContent = `Don't know what to watch?`

  pMain.textContent = `Click on "Find movie" and we'll let you know about a movie you can watch today.`

  buttonMain.textContent = 'Find movie'

  if (randomNumber > 0) {
    movieFinderChangedLanguage()
  }
}

function ptLan() {
  language = 'pt-BR'

  h1Header.textContent = 'Não sabe o que assistir?'

  pMain.textContent = `Clique em "Encontrar filme" que traremos informações de algum filme para você assistir hoje.`

  buttonMain.textContent = 'Encontrar filme'

  if (randomNumber > 0) {
    movieFinderChangedLanguage()
  }
}

function getMovie() {
  randomNumber = getRandomInt()

  movieFinder()

  return randomNumber
}

function urlNotValid() {
  poster.setAttribute('src', './assets/poster.png')

  if (language == 'pt-BR') {
    title.textContent = `Ops, hoje não é dia de assistir filme.
    Bora codar! 🚀`
  } else {
    title.textContent = `Ops, today isn't for watching movies. Let's code! 🚀`
  }

  overview.classList.add('hidden')
  overview.classList.remove('overviewShown')

  movie.classList.add('centerContent')
}

function movieFormat() {
  overview.classList.remove('hidden')
  overview.classList.add('overviewShown')

  movie.classList.remove('centerContent')
}

function getRandomInt() {
  min = Math.ceil(10000)
  max = Math.floor(50000)

  let random = Math.floor(Math.random() * (max - min + 1)) + min

  console.log(random)

  return random
}

function movieFinder() {
  let url = `https://api.themoviedb.org/3/movie/${randomNumber}?api_key=5e96b996ac15a397f955f430d14cc6d1&language=${language}`

  axios
    .get(url)
    .then(response => {
      const posterPath = response.data.poster_path
      const titlePath = response.data.title
      const overviewPath = response.data.overview

      const isAdult = response.data.adult

      movie.classList.remove('hidden')

      if (isAdult == true) {
        urlNotValid()
      } else {
        if (posterPath == null) {
          poster.setAttribute('src', './assets/imgnotfound.png')

          title.textContent = titlePath
        } else {
          movieFormat()

          poster.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/w500${posterPath}`
          )

          title.textContent = titlePath

          if (overviewPath === '') {
            overviewIsUnavaliable()
          } else {
            overview.textContent = overviewPath
          }
        }
      }
    })
    .catch(error => urlNotValid())
}

function movieFinderChangedLanguage() {
  let url = `https://api.themoviedb.org/3/movie/${randomNumber}?api_key=5e96b996ac15a397f955f430d14cc6d1&language=${language}`

  axios
    .get(url)
    .then(response => {
      const posterPath = response.data.poster_path
      const titlePath = response.data.title
      const overviewPath = response.data.overview

      const isAdult = response.data.adult

      movie.classList.remove('hidden')

      if (isAdult == true) {
        urlNotValid()
      } else {
        if (posterPath == null) {
          title.textContent = titlePath
        } else {
          title.textContent = titlePath

          if (overviewPath === '') {
            overviewIsUnavaliable()
          } else {
            overview.textContent = overviewPath
          }
        }
      }
    })
    .catch(error => urlNotValid())
}

function overviewIsUnavaliable() {
  if (language == 'pt-BR') {
    overview.textContent = `Este filme não possui descrição em português.`
  } else {
    overview.textContent = `Overview not found.`
  }
}
