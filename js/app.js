// Varibales y selectores

const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

// Eventos

document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
formulario.addEventListener('submit', agregarGasto)

// Classes 

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {

    insertarPresupuesto(cantidad){

        const {presupuesto, restante} = cantidad;

        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    mensajeAlerta(mensaje, tipo){
        const error = document.querySelector('.error')
        if(!error){
            const alerta = document.createElement('div');
            alerta.className = 'text-center alert error'
            alerta.textContent = mensaje

            if(tipo === 'error'){
                alerta.classList.add('alert-danger')
            }else{
                alerta.classList.add('alert-succes')
            }

            document.querySelector('.primario').insertBefore(alerta, formulario)

            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }
    }
    
}

const ui = new UI()
let presupuesto

// Funciones

function preguntarPresupuesto() {

   const usuarioPresupuesto = prompt('Cual es tu presupuesto ?');

   if( usuarioPresupuesto === '' || isNaN(usuarioPresupuesto) || usuarioPresupuesto <= 0 || usuarioPresupuesto === null){
        window.location.reload()
   }

   presupuesto = new Presupuesto(usuarioPresupuesto)
   ui.insertarPresupuesto(presupuesto)
}

function agregarGasto(e){
    e.preventDefault()

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if(nombre === '' || cantidad === ''){
        ui.mensajeAlerta('Ambos campos son obligatorios', 'error')
        return
    }else if ( cantidad <= 0 || isNaN(cantidad)){
        ui.mensajeAlerta('Por favor inserte una cantidad valida', 'error')
        return
    }

    const detallesGasto = {nombre, cantidad, id: Date.now()}
    console.log(detallesGasto)
}