import createImage from './createImage.js'

const SMALL_FILENAME = 'it-IT_smallIconUri.png'
const SMALL_SIZE = 108

const BIG_FILENAME = 'it-IT_largeIconUri.png'
const BIG_SIZE = 512

const input = document
  .querySelector('input')

const canvas = document.querySelector('canvas')

input.addEventListener('change', event => {
  const [file] = input.files
  createImage(file, 100, canvas)
})

document
  .querySelector('button')
  .addEventListener('click', async () => {
    const [file] = input.files

    if (!file) {
      window.alert('Nessun file selezionato')
      return
    }

    const smallUrl = await createImage(file, SMALL_SIZE)
    download(SMALL_FILENAME, smallUrl)

    const bigUrl = await createImage(file, BIG_SIZE)
    download(BIG_FILENAME, bigUrl)
  })

const download = (filename, url) => {
  window.requestAnimationFrame(() => {
    const link = document.createElement('a')
    link.download = filename
    link.href = url
    link.click()
    return url
  })
}
