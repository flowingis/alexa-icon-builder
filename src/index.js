import createImage from './createImage.js'
import loadImage from './loadImage.js'
import fileToUrl from './fileToUrl.js'
import download from './download.js'
import localesFactory from './locales.js'

const locale = localesFactory(document.querySelector('div[data-locale-container]'))

const SMALL_SIZE = 108
const BIG_SIZE = 512

const input = document
  .querySelector('input')

const canvas = document.querySelector('canvas')

input.addEventListener('change', async event => {
  const [file] = input.files
  const dataUrl = await fileToUrl(file)
  const image = await loadImage(dataUrl)
  createImage(image, 100, canvas)
})

const downloadImages = async (file, selectedLocales) => {
  const dataUrl = await fileToUrl(file)
  const image = await loadImage(dataUrl)

  return selectedLocales
    .reduce((previousPromise, selectedLocale) => {
      return previousPromise.then(async () => {
        const bigFilename = `${selectedLocale}_largeIconUri.png`
        const smallFilename = `${selectedLocale}_smallIconUri.png`

        const smallUrl = await createImage(image, SMALL_SIZE)
        await download(smallFilename, smallUrl)

        const bigUrl = await createImage(file, BIG_SIZE)
        await download(bigFilename, bigUrl)
      })
    }, Promise.resolve())
}

document
  .querySelector('button')
  .addEventListener('click', async () => {
    const [file] = input.files

    if (!file) {
      window.alert('Nessun file selezionato')
      return
    }

    downloadImages(file, locale.getSelectedLocales())
      .catch(window.alert)
  })

locale.render()
