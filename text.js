const elements = [...document.getElementsByClassName('ClassicGrid__Item-sc-td9pmq-1')]
for (const element of elements) {
  const svgEl = element.getElementsByTagName('svg')[0].outerHTML
  const textContainer = element.getElementsByClassName('ClassicGrid__Content-sc-td9pmq-3')
  const filename = textContainer[0].innerText.toLowerCase().replace(' ', '-') + '.svg'

  let blob = new Blob([svgEl], { type: 'image/svg+xml;charset=utf-8' })
  let url = URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.href = url
  link.download = filename

  link.click()
  delete link
}
