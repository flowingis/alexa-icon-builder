import createImage from './createImage.js'
import loadImage from './loadImage.js'
import fileToUrl from './fileToUrl.js'
import download from './download.js'
import initDropArea from './dropArea.js'

const SMALL_SIZE = 108
const BIG_SIZE = 512

const input = document.querySelector('input')
const canvas = document.querySelector('canvas')
const dropArea = document.querySelector('[data-drop-area]')

let currentFile

const onSelectFile = async file => {
  currentFile = file
  const dataUrl = await fileToUrl(file)
  const image = await loadImage(dataUrl)
  createImage(image, 100, canvas, true)
}

input.addEventListener('change', () => {
  const [file] = input.files
  return onSelectFile(file)
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
    if (!currentFile) {
      window.alert('No File Selected')
      return
    }

    downloadImages(currentFile)
      .catch(window.alert)
  })

createImage(document.querySelector('img'), 100, canvas, true)

initDropArea({
  dropArea,
  onSelectFile
})
