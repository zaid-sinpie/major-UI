const closeModal = () => {
    const modalDiv = document.querySelector('.modal')
    modalDiv.classList.remove("active")
}

const openModal = (text, fn = () => {}) => {
    console.log('opening modal')
    const modalDiv = document.querySelector('.modal')
    const modalCloseBtn = document.querySelector('.modal-close')
    const modalContent = document.querySelector('.modal-text')
    modalDiv.style.display = 'block'
    modalDiv.classList.add('active')
    modalContent.textContent = text;
    modalCloseBtn.addEventListener('click', () => {
        modalDiv.style.display = 'none'
        fn()
    })
}