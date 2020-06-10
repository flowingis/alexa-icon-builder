const preventDefaults = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop']

export default ({ dropArea, onSelectFile }) => window.requestAnimationFrame(() => {
  EVENTS.forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults)
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
