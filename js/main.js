let ready = () => {
    console.log("DOM está listo")
}

let loaded = () => {
    console.log("Iframes e Images cargadas")
    let myform = document.getElementById('form');
    myform.addEventListener('submit', eventSubmit => {
        eventSubmit.preventDefault()
        const emailElement = document.querySelector('.form-control-lg')
        const emailText = emailElement.value
        if (emailText.length == 0) {
            emailElement.focus()
            emailElement.animate(
                [
                    {transform: "translateX(0)"},
                    {transform: "translateX(500px)"},
                    {transform: "translateX(-500px)"},
                    {transform: "translateX(0)"},
                ],
                {
                    duration: 100,
                    easing: "linear",
                }
            )
        }
    })
}

window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)

