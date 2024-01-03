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

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante()
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado;
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
                alerta.classList.add('alert-success')
            }

            document.querySelector('.primario').insertBefore(alerta, formulario)

            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }
    }

    actualizarPresupuesto(restante){
        document.querySelector('#restante').textContent = restante
    }

    comprobarPresupuesto(gastos){
        const {restante, presupuesto} = gastos;
        const restanteDiv = document.querySelector('.restante')

        if((presupuesto / 4) > restante){
            restanteDiv.classList.add('alert-danger')
            restanteDiv.classList.remove('alert-success', 'alert-warning')
        } else if((presupuesto / 2) > restante){
            restanteDiv.classList.add('alert-warning')
            restanteDiv.classList.remove('alert-success', 'alert-danger')
        } else{
            restanteDiv.classList.add('alert-success')
            restanteDiv.classList.remove('alert-warning', 'alert-danger')
        }

        if(restante <= 0 ){
            ui.mensajeAlerta('Se Agoto el presupuesto', 'error')
            document.querySelector('.btn-primary').disabled = true
        }else{
            document.querySelector('.btn-primary').disabled = false
        }
    }

    agregarGastoListado(gastos){
        this.limpiarHTML()
        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            nuevoGasto.innerHTML = `
                ${nombre} <span class="badge badge-pill badge-primary">$ ${cantidad}</span>
            `;

            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.className = 'btn btn-danger borrar-gasto'
            
            

            nuevoGasto.appendChild(btnBorrar)
            gastoListado.appendChild(nuevoGasto)
        })
    }

    eliminarGasto(id){
        console.log(gastoListado)
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
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
    const cantidad = parseInt(document.querySelector('#cantidad').value);

    if(nombre === '' || cantidad === ''){
        ui.mensajeAlerta('Ambos campos son obligatorios', 'error')
        return
    }else if ( cantidad <= 0 || isNaN(cantidad)){
        ui.mensajeAlerta('Por favor inserte una cantidad valida', 'error')
        return
    }

    ui.mensajeAlerta('Correcto')
    formulario.reset()

    const detallesGasto = {nombre, cantidad, id: Date.now()}
    presupuesto.nuevoGasto(detallesGasto)

    const { gastos, restante } = presupuesto
    ui.agregarGastoListado(gastos)
    ui.actualizarPresupuesto(restante)
    ui.comprobarPresupuesto(presupuesto)
}