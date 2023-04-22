let nombre, vlrPrestamo = 0, numCuotas = 0, vlrCuota = 0, entrarCiclo = true, listaPrestamos = []
const tasaInt = 0.02;

// Creo el objeto préstamo
const Prestamo = function (nombre, vlrPrestamo, numCuotas, tasaInt, vlrCuota) {
	this.nombre = nombre,
	this.vlrPrestamo = vlrPrestamo,
	this.numCuotas = numCuotas,
	this.tasaInt = tasaInt,
	this.vlrCuota = vlrCuota
}

// Solicito los valores
while (entrarCiclo) {
	nombre = prompt("Digita el nombre del cliente: ").toLowerCase();
	
	// Verifico que el nombre no esté vacío
	if (!nombre) {
		alert("Sr. usuario, el nombre no puede estar vacío. Intente nuevamente.");
		continue;

	} else {
		
		// Verifico que el nombre no exista ya con un préstamo (un cliente solo puede tener un préstamo activo)
		if (tienePrestamo(nombre)) {
			alert("Sr. usuario, este cliente ya tiene un préstamo activo. Intente nuevamente.");
			continue;
		}
	}

	vlrPrestamo = parseInt(prompt("Digita el valor del préstamo: "));
	numCuotas = parseInt(prompt("Digita el número de cuotas: "));

	if (!isNaN(vlrPrestamo) && !isNaN(numCuotas)) {
		if (vlrPrestamo > 0 && numCuotas > 0) {

			ingresarPrestamo(nombre, vlrPrestamo, numCuotas);

			entrarCiclo = confirm("¿Desea ingresar un nuevo crédito?");

		} else {
			alert("Sr. usuario, los valores deben ser mayores que 0. Intente nuevamente.");
		}

	} else {
		alert("Sr. usuario, alguno(s) de los valores no es un número. Intente nuevamente.");
	}
}

function ingresarPrestamo(nombre, vlrPrestamo, numCuotas) {
	// llamo la función de cálculo de cuota
	vlrCuota = obtenerCuotaMensual(vlrPrestamo, numCuotas, tasaInt);
	alert(`Sr. usuario, el valor de la cuota mensual es: ${vlrCuota} a una tasa del ${tasaInt * 100}%`);

	// Instancio Prestamo
	let prestamo = new Prestamo(nombre, vlrPrestamo, numCuotas, tasaInt, vlrCuota);

	// Ingreso el prestamo en la lista
	listaPrestamos.push(prestamo);
	console.log(listaPrestamos);

}

function obtenerCuotaMensual(valorPrestamo, numeroCuotas, tasaInteres) {
	let valorInteres = valorPrestamo * tasaInteres * numeroCuotas;
	let valorCuotaMensual = (valorPrestamo + valorInteres) / numeroCuotas;
	valorCuotaMensual = Math.round(valorCuotaMensual);

	return valorCuotaMensual;
}

function tienePrestamo(nombre) {
	return listaPrestamos.some((el) => el.nombre == nombre);
}
