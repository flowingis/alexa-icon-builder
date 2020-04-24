import loadImage from './loadImage.js'
import fileToUrl from './fileToUrl.js'

export default async (file, width, canvas = document.createElement('canvas')) => {
  const { devicePixelRatio } = window
  const dataUrl = await fileToUrl(file)
  const image = await loadImage(dataUrl)
  canvas.width = width * devicePixelRatio
  canvas.height = width * devicePixelRatio

  canvas.style.width = `${canvas.width / devicePixelRatio}px`
  canvas.style.height = `${canvas.height / devicePixelRatio}px`

  const context = canvas.getContext('2d')

  context.scale(devicePixelRatio, devicePixelRatio)

  const radius = width / 4

  context.save()
  context.beginPath()
  context.arc(2 * radius, 2 * radius, 2 * radius, 0, Math.PI * 2, true)
  context.closePath()
  context.clip()

  context.drawImage(image, 0, 0, 4 * radius + 2, 4 * radius + 2)

  context.beginPath()
  context.arc(0, 0, 2, 0, Math.PI * 2, true)
  context.clip()
  context.closePath()
  context.restore()

  return canvas.toDataURL()
}
