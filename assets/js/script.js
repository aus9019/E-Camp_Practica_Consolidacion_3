//* Objeto 
class Gasto {
    constructor(id, nombre, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}

//* Variables 
let presupuesto = 0;
let resultadoGasto = 0;
let resultadoSaldo = 0;
let gastos = [];

//* Eventos para los Botones 
const btnEnviarPresupuesto = document.querySelector("#btnEnviarPresupuesto");
btnEnviarPresupuesto.addEventListener("click", ingresandoPresupuesto);

const btnEnviarGasto = document.querySelector("#btnEnviarGasto");
btnEnviarGasto.addEventListener("click", ingresandoGasto);

//* Función ingresandoPresupuesto 
function ingresandoPresupuesto() {
    const inputPresupuesto = document.querySelector("#inputPresupuesto");

    presupuesto = parseInt(inputPresupuesto.value);

    if (isNaN(presupuesto)) {
        alert("Debe ingresar un valor correcto para realizar los calculos");
    } else if (presupuesto <= 0) {
        alert("El valor debe ser mayor de 0");
    } else {
        document.querySelector("#presupuestoInicial").innerHTML = presupuesto;
    }
}

//* Función ingresandoGasto 
function ingresandoGasto() {
    let inputNombreGasto = document.querySelector("#inputNombreGasto");
    let inputCantidadGasto = document.querySelector("#inputCantidadGasto");

    nombreGasto = inputNombreGasto.value;
    cantidad = parseInt(inputCantidadGasto.value);

    if (nombreGasto === "") {
        alert("Ingrese el nombre del Gasto");
    } else if (isNaN(cantidad) || cantidad <= 0) {
        alert("Debe ingresar un Gasto valido");
    } else {
        let gasto = new Gasto(Math.floor((Math.random() * 100) + 1), nombreGasto, cantidad);

        resultadoGasto = resultadoGasto + gasto.cantidad;
        if (resultadoGasto > presupuesto) {
            alert("No te queda suficiente dinero para ese Gasto")
            resultadoGasto = resultadoGasto - gasto.cantidad;
        } else {
            document.querySelector("#gastoTotal").innerHTML = resultadoGasto;
            gastos.push(gasto);
            resultadoSaldo = presupuesto - resultadoGasto;
            document.querySelector("#saldoRestante").innerHTML = resultadoSaldo;
            tablaGastos(gasto);
            inputNombreGasto.value = "";
            inputCantidadGasto.value = "";
        }
    }
}

//* Función tablaGastos 
function tablaGastos(gasto) {
    const tbody = document.querySelector('#tbody');
    const tr = document.createElement('tr');

    tr.id = `element${gasto.id}`;
    tr.innerHTML = `
        <td>${gasto.nombre}</td>
        <td>$${gasto.cantidad}</td>
        <td>
            <a href="#" class="delete-icon" onclick="papelera(${gasto.id},${gasto.cantidad})">
                <i class="fas fa-trash"></i>
            </a>
        </td>
    `;

    tbody.appendChild(tr);
}


//* Función Flecha papelera 
const papelera = (id, cantidad) => {
    for (let i = 0; i < gastos.length; i++) {
        if (id === gastos[i].id) {
            const eliminado = document.querySelector("#element" + id);
            eliminado.remove();
            gastos.splice(i, 1);
        }
    }
    resultadoGasto = resultadoGasto - cantidad;
    resultadoSaldo = presupuesto - resultadoGasto;

    document.querySelector("#gastoTotal").innerHTML = resultadoGasto;
    document.querySelector("#saldoRestante").innerHTML = resultadoSaldo;
};

