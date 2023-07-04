const activateModal = (content) => {
    const modal = document.querySelector('.modal')
    const 
    modal.classList.add('active')
    modal.innerHTML = content;
}

const deactivateModal = () => {
    const modal = document.querySelector('.modal')
    modal.classList.remove('active')
}