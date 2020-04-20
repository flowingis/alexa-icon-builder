export default (file, width) => new Promise(resolve => {
  const fileReader = new window.FileReader()
  fileReader.onload = () => {
    const image = new window.Image()
    const canvas = document.createElement('canvas')
    const tmpCtx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = width

    const radius = width / 4

    image.onload = () => {
      tmpCtx.save()
      tmpCtx.beginPath()
      tmpCtx.arc(2 * radius, 2 * radius, 2 * radius, 0, Math.PI * 2, true)
      tmpCtx.closePath()
      tmpCtx.clip()

      tmpCtx.drawImage(image, 0, 0, 4 * radius + 2, 4 * radius + 2)

      tmpCtx.beginPath()
      tmpCtx.arc(0, 0, 2, 0, Math.PI * 2, true)
      tmpCtx.clip()
      tmpCtx.closePath()
      tmpCtx.restore()

      resolve(canvas.toDataURL())
    }

    image.src = fileReader.result
  }

  fileReader.readAsDataURL(file)
})
