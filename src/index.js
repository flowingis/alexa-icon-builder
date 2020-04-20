import createImage from './createImage.js'

const input = document
    .querySelector('input')

const SMALL_FILENAME = 'it-IT_smallIconUri.png'
const SMALL_SIZE = 108

const BIG_FILENAME = 'it-IT_largeIconUri.png'
const BIG_SIZE = 512

document
    .querySelector('button')
    .addEventListener('click', () => {
        const [file] = input.files

        if(!file){
            window.alert('Nessun file selezionato')
            return
        }

        createImage(file, SMALL_SIZE)
            .then(download(SMALL_FILENAME))

        createImage(file, BIG_SIZE)
            .then(download(BIG_FILENAME))
    })

const download = filename => url => {
    var link = document.createElement('a')
    link.download = filename
    link.href = url
    link.click()
    return url
}
