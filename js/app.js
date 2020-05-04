//variables globales
const presupuestoUsuario = prompt('Cuanto es tu presupuesto semanal?');
let cantidadPresupuesto;
const formulario = document.querySelector('#agregar-gasto');

//clases

// clase para la logica del presupuesto

class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
	}

	//metodo para ir restando del presupuesto actual
	presupuestoRestante(cantidad = 0) {
		return (this.restante -= Number(cantidad));
	}
}

// clase de interfaz - maneja todo lo que ira en pantalla

class Interfaz {
	insertarPresupuesto(cantidad) {
		const presupuestoSpan = document.querySelector('span#total');
		const restanteSpan = document.querySelector('span#restante');

		//insertar las cantidades al HTML
		presupuestoSpan.innerHTML = `${cantidad}`;
		restanteSpan.innerHTML = `${cantidad}`;
	}
	//logica para monstrar un mensaje en pantalla al llenar el formulario
	imprimirMensaje(mensaje, tipo) {
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('text-center', 'alert');
		if (tipo === 'error') {
			divMensaje.classList.add('alert-danger');
		} else {
			divMensaje.classList.add('alert-success');
		}
		divMensaje.appendChild(document.createTextNode(mensaje));
		//insertar en el DOM
		document.querySelector('.primario').insertBefore(divMensaje, formulario);

		// quitar el alert despues de 3 seg

		setTimeout(function () {
			divMensaje.remove();
			formulario.reset();
		}, 2000);
	}
	//agrega el gasto nuevo a la pantalla
	agregarGastoListado(nombre, cantidad) {
		const gastosListado = document.querySelector('#gastos ul');

		//crear un li para listar los gastos
		const li = document.createElement('li');
		li.className =
			'list-group-item d-flex justify-content-between align-items-center';
		//insertar al HTML
		li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;

		// insertar al HTML
		gastosListado.appendChild(li);
	}

	//comprueba el presupuesto restante

	presupuestoRestante(cantidad) {
		const restante = document.querySelector('#restante');
		//actualizar el restante
		const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
			cantidad
		);
		restante.innerHTML = `${presupuestoRestanteUsuario}`;
		this.comprobarPresupuesto();
	}

	//cambia de color el presupuesto restante

	comprobarPresupuesto() {
		const presupuestoTotal = cantidadPresupuesto.presupuesto;
		const presupuestoRestante = cantidadPresupuesto.restante;

		//comprobar el 50% y el 25%

		if (presupuestoTotal / 4 > presupuestoRestante) {
			const restante = document.querySelector('.restante');
			restante.classList.remove('alert-succes', 'alert-warning');
			restante.classList.add('alert-danger');
		} else if (presupuestoTotal / 2 > presupuestoRestante) {
			const restante = document.querySelector('.restante');
			restante.classList.remove('alert-succes');
			restante.classList.add('alert-warning');
		}
	}
}

//event listeners

document.addEventListener('DOMContentLoaded', function () {
	if (
		presupuestoUsuario === null ||
		presupuestoUsuario === '' ||
		presupuestoUsuario === NaN
	) {
		window.location.reload();
	} else {
		cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
		console.log(cantidadPresupuesto);

		//instanciar la clase de interfaz
		const ui = new Interfaz();
		ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
	}
});
//event listener para cuando se envia el formulario
formulario.addEventListener('submit', function (event) {
	event.preventDefault();

	// leer del campo de gastos la cantidad
	const nombreGasto = document.querySelector('#gasto').value;
	const cantidadGasto = document.querySelector('#cantidad').value;

	//instanciar la interfaz ahora para mostrar los gastos en pantalla

	const ui = new Interfaz();

	// comprobamos que los gastos no estan vacios
	if (nombreGasto === '' || cantidadGasto === '') {
		//mensaje y tipo para un mensaje u otro
		ui.imprimirMensaje('Algo salio Mal :s', 'error');
	} else {
		// insertar en el HTML
		ui.imprimirMensaje('Se agrego correctamente', 'correcto');
		ui.agregarGastoListado(nombreGasto, cantidadGasto);
		ui.presupuestoRestante(cantidadGasto);
	}
});
