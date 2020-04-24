export default file => new Promise((resolve, reject) => {
  const fileReader = new window.FileReader()
  fileReader.onload = () => resolve(fileReader.result)
  fileReader.onerror = reject
  fileReader.readAsDataURL(file)
})
