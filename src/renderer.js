
const info = document.getElementById('info')
info.innerHTML = `Chrome (v${window.versions.chrome}), Node.js (v${window.versions.node})`


const btn = document.getElementById('btn')
const titleInput = document.getElementById('title')

btn.addEventListener('click', () => {
  const title = titleInput.value
  window.electron.setTitle(title)
})