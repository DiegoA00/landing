const databaseURL = 'https://landing-c1529-default-rtdb.firebaseio.com/data.json';

let sendData = () => {
    // Obtén los datos del formulario
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

    // new Date().toLocaleString( locales, options )
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Gracias por tu interés. Hemos recibido tu solicitud de cotización y nos pondremos en contacto contigo pronto para brindarte toda la información que necesitas.'); // Maneja la respuesta con un mensaje
            form.reset()
            
            // Recuperación de datos
            getData()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
}

let getData = async () => {
    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if (data != null) {
            // Inicializa los contadores de pagos a contado y a crédito
            let countContado = 0;
            let countCredito = 0;

            if (Object.keys(data).length > 0) {
                // Recorre todos los datos obtenidos
                for (let key in data) {
                    let { pago } = data[key]; // Aquí obtenemos la forma de pago

                    // Contamos según la forma de pago
                    if (pago === "contado") {
                        countContado++;
                    } else if (pago === "crédito") {
                        countCredito++;
                    }
                }
            }

            // Muestra los datos de las cotizaciones en la interfaz
            // Aquí 'cotizaciones-contado' y 'cotizaciones-credito' son los ID donde se mostrarán los resultados
            document.getElementById('cotizaciones-contado').textContent = countContado;
            document.getElementById('cotizaciones-credito').textContent = countCredito;

        }

    } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }
};

let ready = () => {
    console.log("DOM está listo");
    
    // Recuperación de datos
    getData();
}

let loaded = () => {
    console.log("Iframes e Images cargadas");
    let myform = document.getElementById('form');

    myform.addEventListener('submit', eventSubmit => {
        eventSubmit.preventDefault();
        let isValid = true;
        const formElements = myform.querySelectorAll('.form-control-lg');

        formElements.forEach(element => {
            if (element.value.trim().length === 0) {
                isValid = false;
                element.focus();
                element.animate(
                    [
                        { transform: "translateX(0)" },
                        { transform: "translateX(50px)" },
                        { transform: "translateX(-50px)" },
                        { transform: "translateX(0)" },
                    ],
                    {
                        duration: 100,
                        easing: "linear",
                    }
                );
            }
        });

        if (isValid) {
            sendData();
        }
    });
}





window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)

