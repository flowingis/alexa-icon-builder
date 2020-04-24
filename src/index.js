import createImage from './createImage.js'
import download from './download.js'
import localesFactory from './locales.js'

const locale = localesFactory(document.querySelector('div[data-locale-container]'))

const SMALL_SIZE = 108
const BIG_SIZE = 512

const input = document
  .querySelector('input')

const canvas = document.querySelector('canvas')

input.addEventListener('change', event => {
  const [file] = input.files
  createImage(file, 100, canvas)
})

const downloadImages = (file, selectedLocales) => {
  selectedLocales
    .forEach(async selectedLocale => {
      const bigFilename = `${selectedLocale}_largeIconUri.png`
      const smallFilename = `${selectedLocale}_smallIconUri.png`

      const smallUrl = await createImage(file, SMALL_SIZE)
      await download(smallFilename, smallUrl)

      const bigUrl = await createImage(file, BIG_SIZE)
      await download(bigFilename, bigUrl)
    })
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
  })

locale.render()
