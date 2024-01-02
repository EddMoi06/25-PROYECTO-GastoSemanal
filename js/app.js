// Varibales y selectores

const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

// Eventos

document.addEventListener('DOMContentLoaded', preguntarPresupuesto)

// Classes 

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
}

class UI {

}


// Funciones

function preguntarPresupuesto() {

   const usuarioPresupuesto = prompt('Cual es tu presupuesto ?');

   if( usuarioPresupuesto === '' || isNaN(usuarioPresupuesto) || usuarioPresupuesto <= 0 || usuarioPresupuesto === null){
        window.location.reload()
        return
   }
}