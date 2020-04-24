export default (filename, url) => new Promise(resolve => {
  window.requestAnimationFrame(() => {
    const link = document.createElement('a')
    link.download = filename
    link.href = url
    link.click()
    resolve(url)
  })
})
