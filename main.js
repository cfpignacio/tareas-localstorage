import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const formulario = document.querySelector('form');
const tareaInput = document.querySelector('#tarea');
const guaradrBtn = document.querySelector('#guardar');
const borrarBtn = document.querySelector('#borrar');
const listaTareas = document.querySelector('#listaTareas');

guaradrBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const tarea = tareaInput.value;
	const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

	if (tarea.length <= 0) {
		return Toastify({
			text: `La tarea no puede estar vacia`,
			style: {
				background: 'red',
			},
		}).showToast();
	}

	tareas.push(tarea);

	localStorage.setItem('tareas', JSON.stringify(tareas));
	formulario.reset();
	console.log(localStorage.getItem('tareas'));
	cargarTareas();
	Toastify({
		text: `La tarea con nombre ${tarea} se cargo correctamente.`,
		className: 'info',
	}).showToast();
});

borrarBtn.addEventListener('click', (e) => {
	e.preventDefault();
	localStorage.removeItem('tareas');
	cargarTareas();

	Toastify({
		text: `Se borraron todas las tareas`,
		style: {
			background: 'red',
		},
	}).showToast();
});
const cargarTareas = () => {
	listaTareas.innerHTML = '';

	let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

	tareas.forEach((t) => {
		const li = document.createElement('li');
		li.textContent = t;
		listaTareas.appendChild(li);
	});
};

// Cambiar el funcionamiento de la aplicacion,
// para que pueda almacenar un estado para cada tarea
// [{nombre:'Limpiar',estado:True},{nombre:'Programar',estado:False}]

cargarTareas();
