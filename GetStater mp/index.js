const btn = document.querySelector(".call-to-action button")

btn.addEventListener('click', async(e) => {
    // e.preventDefault();
    console.log("hello world")
    await fetch('http://localhost:5500/listing.html').then(res => console.log(res)).catch((e) => console.log(e)).finally(data => console.log(data))
})