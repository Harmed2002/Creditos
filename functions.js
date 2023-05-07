let cedula, nombre, vlrPrestamo = 0, numCuotas = 0, vlrCuota = 0, vlrInteres = 0, fecha = new Date(),  validaDatos = true, listaPrestamos = [];
const tasaInt = 0.02;

// Creo el objeto préstamo
const Prestamo = function (cedula, nombre, vlrPrestamo, numCuotas, tasaInt, vlrCuota, vlrInteres, fecha) {
	this.cedula			= cedula,
	this.nombre			= nombre,
	this.vlrPrestamo	= vlrPrestamo,
	this.numCuotas		= numCuotas,
	this.tasaInt		= tasaInt,
	this.vlrCuota		= vlrCuota,
	this.vlrInteres		= vlrInteres,
	this.fecha			= fecha
}

function adicionarPrest() {
	validaDatos = true
	cedula		= document.getElementById("cedula").value;
	nombre		= document.getElementById("nombre").value;
	nombre		= nombre.toLowerCase();
	vlrPrestamo = parseInt(document.getElementById("vlrCred").value);
	numCuotas	= parseInt(document.getElementById("numCuotas").value);
	const FORM	= document.getElementById("frmPrestamos");

	if (validarDatos(cedula, nombre, vlrPrestamo, numCuotas)) {
		ingresarPrestamo(cedula, nombre, vlrPrestamo, numCuotas, fecha.toLocaleDateString());
		FORM.reset();
		document.getElementById("cedula").focus();
	}

}

function validarDatos(cedula, nombre, vlrPrestamo, numCuotas) {
	// Verifico que el nombre o la cédula no estén vacíos
	if (!nombre || !cedula) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "Sr. usuario, la cédula o el nombre no pueden estar vacíos. Intente nuevamente.",
			confirmButtonText: "Aceptar",
		});

		validaDatos = false;

	} else {
		
		// Verifico que la cédula no exista ya con un préstamo (un cliente solo puede tener un préstamo activo)
		if (tienePrestamo(cedula)) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Sr. usuario, este cliente ya tiene un préstamo activo. Intente nuevamente.",
				confirmButtonText: "Aceptar",
			});

			validaDatos = false;
		}
	}

	if (vlrPrestamo <= 0 || numCuotas <= 0) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "Sr. usuario, los valores deben ser mayores que 0. Intente nuevamente.",
			confirmButtonText: "Aceptar",
		});

		validaDatos = false;
	}
	
	return validaDatos;
}

function obtenerCuotaMensual(valorPrestamo, numeroCuotas, tasaInteres) {
	let valorCuotaMensual = (valorPrestamo + (valorPrestamo * tasaInteres * numeroCuotas)) / numeroCuotas;

	valorCuotaMensual = Math.round(valorCuotaMensual);

	return valorCuotaMensual;
}

function obtenerIntereses(valorPrestamo, numeroCuotas, tasaInteres) {
	let valorInteres = valorPrestamo * tasaInteres * numeroCuotas;

	return valorInteres;
}

function ingresarPrestamo(cedula, nombre, vlrPrestamo, numCuotas, fecha) {
	// llamo la función de cálculo de cuota
	vlrCuota = obtenerCuotaMensual(vlrPrestamo, numCuotas, tasaInt);
	vlrInteres = obtenerIntereses(vlrPrestamo, numCuotas, tasaInt);

	// Instancio Prestamo
	let prestamo = new Prestamo(cedula, nombre, vlrPrestamo, numCuotas, tasaInt, vlrCuota, vlrInteres, fecha);

	// Ingreso el prestamo en la lista
	listaPrestamos.push(prestamo);

	// Adicionamos el registro en las tablas html
	adicionarItem();

	// Mostramos el mensaje
	Swal.fire({
		icon: 'success',
		title: "Felicitaciones",
		text: "El préstamo fue ingresado exitosamente.",
		confirmButtonText: "Aceptar",
		timer: 1500
	});
}

function adicionarItem() {
	let item = 0

	// Obtenego los datos para llenar la tabla de préstamos
	const bodyPrest = document.getElementById("bodyPrest");
	let result = '', resumen = '';

	listaPrestamos.forEach(Prestamo => {
		item++;
		result += `<tr>
						<td>${ item }</td>
						<td>${ Prestamo.cedula }</td>
						<td>${ Prestamo.nombre }</td>
						<td>${ new Intl.NumberFormat().format(Prestamo.vlrPrestamo) }</td>
						<td>${ Prestamo.numCuotas }</td>
						<td>${ new Intl.NumberFormat("en-US", {style: "percent", }).format(Prestamo.tasaInt) }</td>
						<td>${ new Intl.NumberFormat().format(Prestamo.vlrCuota) }</td>
						<td>${ new Intl.NumberFormat().format(Prestamo.vlrInteres) }</td>
						<td>${ new Intl.NumberFormat().format(Prestamo.vlrPrestamo + Prestamo.vlrInteres) }</td>
						<td>${ Prestamo.fecha }</td>
				</tr>`
	})

	bodyPrest.innerHTML = result;

	// Obtenego los datos para llenar la tabla de resúmen
	const bodyResumen = document.getElementById("bodyResumen");
	console.log(listaPrestamos);
	// Obtengo el total solicitado
	const totalSol = listaPrestamos.reduce( (acum, el) => acum + el.vlrPrestamo, 0);
	const totalInt = listaPrestamos.reduce( (acum, el) => acum + el.vlrInteres, 0);

	resumen += `<tr>
					<td colspan="12"></td>
					<td colspan="4">Total Solicitado</td>
					<td>${ new Intl.NumberFormat().format(totalSol) }</td>
				</tr>
				<tr>
					<td colspan="12"></td>
					<td colspan="4">Total Intereses</td>
					<td>${ new Intl.NumberFormat().format(totalInt) }</td>
				</tr>
				<tr>
					<td colspan="12"></td>
					<td colspan="4">Total</td>
					<td>${ new Intl.NumberFormat().format(totalSol + totalInt) }</td>
				</tr>`

	bodyResumen.innerHTML = resumen;
}

function tienePrestamo(cedula) {
	return listaPrestamos.some((el) => el.cedula == cedula);
}

function mostrarNuevoCredito() {
	document.getElementById("nuevoCred").style.display = "flex";
	document.getElementById("listaCred").style.display = "none";
}

function mostrarListaCreditos() {
	document.getElementById("nuevoCred").style.display = "none";
	document.getElementById("listaCred").style.display = "block";
}

function buscarCredito() {
	Swal.fire({
		title: 'Ingresa el nombre del cliente cuyo crédito desea buscar',
		input: 'text',
		showCancelButton: true,
		confirmButtonText: 'Buscar',
		showLoaderOnConfirm: true,
  
		preConfirm: (datoBuscado) => {
			datoBuscado = datoBuscado.trim().toUpperCase()
			let resultado = listaPrestamos.filter((prestamo)=> prestamo.nombre.toUpperCase().includes(datoBuscado))
  
			if (resultado.length > 0){
				console.table(resultado)

				Swal.fire({
					title: 'Resultados de búsqueda',
					html: '<table><tr> <th> Cédula </th> <th> Nombre </th> <th> Vlr. Solicitado </th> <th>Cuotas</th> <th> Vlr. Cuota </th> </tr>' +
					
							resultado.map(prestamo => `<tr>
															<td>${prestamo.cedula}</td>
															<td>${prestamo.nombre}</td>
															<td>${prestamo.vlrPrestamo}</td>
															<td>${prestamo.numCuotas}</td>
															<td>${prestamo.vlrCuota}</td>
														</tr>`).join('') +
						  '</table>',
					confirmButtonText: 'OK'
				})
				/*<td>${prestamo.tasaInt}</td>
				<td>${prestamo.vlrInteres}</td>
				<td>${prestamo.fecha}</td>*/
				
			} else {
				Swal.fire({
					icon: 'info',
					title: "Sr. Usuario",
					text: 'No se encontraron coincidencias.',
					confirmButtonText: 'OK'
				})
			}
		}
	});
  
}