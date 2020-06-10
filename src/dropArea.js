const preventDefaults = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop']

const HIGHLIGHT_EVENTS = ['dragenter', 'dragover']
const UNHIGHLIGHT_EVENTS = ['dragleave', 'drop']

export default ({ dropArea, onSelectFile }) => window.requestAnimationFrame(() => {
  EVENTS.forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults)
  })

  HIGHLIGHT_EVENTS.forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.add('highlight')
    }, false)
  })

  UNHIGHLIGHT_EVENTS.forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.remove('highlight')
    }, false)
  })

  dropArea.addEventListener('drop', e => {
    const dt = e.dataTransfer
    const [file] = dt.files

    if (!file.type.startsWith('image/')) {
      return
    }

    onSelectFile(file)
  })
})
