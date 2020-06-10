import createImage from './createImage.js'
import loadImage from './loadImage.js'
import fileToUrl from './fileToUrl.js'
import download from './download.js'

const SMALL_SIZE = 108
const BIG_SIZE = 512

const input = document
  .querySelector('input')

const canvas = document.querySelector('canvas')

input.addEventListener('change', async event => {
  const [file] = input.files
  const dataUrl = await fileToUrl(file)
  const image = await loadImage(dataUrl)
  createImage(image, 100, canvas, true)
})

const downloadImages = async (file) => {
  const dataUrl = await fileToUrl(file)
  const image = await loadImage(dataUrl)
  const bigFilename = 'largeIcon.png'
  const smallFilename = 'smallIcon.png'

  const smallUrl = await createImage(image, SMALL_SIZE)
  await download(smallFilename, smallUrl)

  const bigUrl = await createImage(image, BIG_SIZE)
  await download(bigFilename, bigUrl)
}

document
  .querySelector('button')
  .addEventListener('click', async () => {
    const [file] = input.files

    if (!file) {
      window.alert('No File Selected')
      return
    }

    downloadImages(file)
      .catch(window.alert)
  })

createImage(document.querySelector('img'), 100, canvas, true)
