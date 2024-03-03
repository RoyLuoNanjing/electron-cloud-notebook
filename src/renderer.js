
const info = document.getElementById('info')
info.innerHTML = `Chrome (v${window.versions.chrome}), Node.js (v${window.versions.node})`


const btn = document.getElementById('btn')
const titleInput = document.getElementById('title')

const btn2 = document.getElementById('btn2')
const contentInput = document.getElementById('content')
const counter = document.getElementById('counter')

btn.addEventListener('click', () => {
  const title = titleInput.value
  window.electron.setTitle(title)
})

btn2.addEventListener('click', async () => {
  const content = contentInput.value
  const len = await window.electron.writeFile(content)
  info.innerHTML = `File size : ${len}`
})

window.electron.onUpdateCounter((value) => {
  counter.innerText = value.toString()
})