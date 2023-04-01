let lnVlrPrestamo = 0;
let lnNumCuotas = 0;
const lnTasa = 0.02;
let lnVlrCuota = 0;
let lnSw = false;

// Solicito los valores
while (!lnSw) {
    lnVlrPrestamo = parseInt(prompt("Digita el valor del préstamo: "));
    lnNumCuotas = parseInt(prompt("Digita el número de cuotas: "));

    if (!isNaN(lnVlrPrestamo) && !isNaN(lnNumCuotas)) {
        lnSw = true;
    } else {
        alert("Alguno de los valores no es un número. intente nuevamente.")
    }
}

// llamo la función de cálculo de cuota
lnVlrCuota = obtenerCuotaMensual(lnVlrPrestamo, lnNumCuotas, lnTasa);
alert(`Sr. usuario, el valor de la cuota mensual es: ${lnVlrCuota} a una tasa del ${lnTasa * 100}%`);


function obtenerCuotaMensual(pVlrPrestamo, pNumCuotas, pTasa) {
    let lnVlrInteres = pVlrPrestamo * pTasa * pNumCuotas;
    let lnVlrCtaMensual = (pVlrPrestamo + lnVlrInteres) / pNumCuotas;

    return lnVlrCtaMensual;
}