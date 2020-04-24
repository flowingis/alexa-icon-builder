export default src => new Promise((resolve, reject) => {
  const image = new window.Image()
  image.onload = () => resolve(image)
  image.onerror = reject
  image.src = src
})
