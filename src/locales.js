const LOCALES = [
  'de-DE',
  'en-AU',
  'en-CA',
  'en-GB',
  'en-IN',
  'en-US',
  'es-ES',
  'fr-FR',
  'it-IT',
  'ja-JP'
]

export default (container) => {
  const render = () => {
    const template = document.querySelector('template')
    window.requestAnimationFrame(() => {
      LOCALES
        .map(locale => {
          const element = template.content.cloneNode(true)
          const checkbox = element.querySelector('input')
          const span = element.querySelector('span')

          checkbox.checked = true
          checkbox.value = locale

          span.textContent = locale

          return element
        })
        .forEach(element => {
          container.appendChild(element)
        })
    })
  }

  const getSelectedLocales = () => {
    return Array
      .from(container.querySelectorAll('input[type="checkbox"]'))
      .filter(input => input.checked)
      .map(input => input.value)
  }

  return {
    render,
    getSelectedLocales
  }
}
