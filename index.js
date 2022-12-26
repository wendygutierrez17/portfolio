const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false

        for(let error in field.validity) {
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }
        return foundError
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }
        return messages[field.type][typeError]
    }

    function setCustomMessage(message = "") {
        const spanError = field.parentNode.querySelector("span.error")
        if(message) {
        spanError.classList.add("active")
        spanError.innerHTML = message
    } else {
        spanError.classList.remove("active")
        spanError.innerHTML = ""
    }
    }
    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)
            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "yellow"
            setCustomMessage()
        }
    }   
}

function verifyEmail () {
    const emailInput = document.querySelector("#email1")
    console.log(emailInput)
    
    emailInput.addEventListener("input", function() {
        if (emailInput.value != "") {
        emailInput.classList.add("correctAnimation")
    } else {
        emailInput.classList.remove("correctAnimation")
    }
} )
}
verifyEmail() 


function customValidation(event) {
   
    const field = event.target
    const validation = ValidateField(field)

    validation()        
    }

for(field of fields) {
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault()


        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
.addEventListener("submit", (event) => {
    console.log("enviar o formulário")
   
    event.preventDefault()
})