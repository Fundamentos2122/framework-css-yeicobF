/* -------------------- ATRIBUTOS PROPIOS ETIQUETAS HTML -------------------- */

/**
 * Atributo en donde se guarda que tipo de elemento se va a manipular.
 * @type {string}
 */
const attr_toggle = "data-toggle";

/**
 * Atributo en donde se indica el `id` del elemento a mostrar.
 * @type {string}
 */
const attr_target = "data-target";

/**
 * Atributo en donde se indica el `id` del elemento a ocultar.
 * @type {string}
 */
const attr_dismiss = "data-dismiss";

/**
 * Clase del modal. Esta se asigna a los elementos HTML.
 * @type {string}
 */
const class_modal = "modal";

/**
 * Clase para ocultar elementos.
 * @type {string}
 */
const class_show = "show";

/**
 * Asignar eventos a elementos al cargar el DOM (sin contar elementos
 * multimedia, solo el DOM como tal.)
 */
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Botones que abren un modal
   *
   * Con el `querySelectorAll` no tenemos que pasar solo un elemento, sino que
   * pasamos combinadores con selectores. Obtenemos todos los elementos que
   * cumplan con la sintaxis.
   *
   * Lo siguiente quedaría como:
   *
   * > `[data-toggle='modal']`
   *
   */
  let modal_open_buttons = document.querySelectorAll(
    `[${attr_toggle}='${class_modal}']`,
  );

  /** Asignar el evento de abrir el modal por cada uno de los elementos. */
  modal_open_buttons.forEach((element) => {
    element.addEventListener("click", openModal);
  });

  /**
   * Botones que abren un modal
   *
   * Con el `querySelectorAll` no tenemos que pasar solo un elemento, sino que
   * pasamos combinadores con selectores. Obtenemos todos los elementos que
   * cumplan con la sintaxis.
   *
   * Lo siguiente quedaría como:
   *
   * > `[data-toggle='modal']`
   */
  let modal_close_buttons = document.querySelectorAll(`[${attr_dismiss}]`);

  /** Asignar el evento de abrir el modal por cada uno de los elementos. */
  modal_close_buttons.forEach((element) => {
    element.addEventListener("click", closeModal);
  });
});

/**
 * Toda la lógica para abrir el modal.
 * @param {PointerEvent} e Evento.
 */
function openModal(e) {
  /**
   * `e.target` nos trae el elemento que generó el evento.
   *
   * Como dentro tiene un id (attr_target), podemos hacer el toggle al modal
   * completo.
   * @type {string}
   */
  let modal_selector = e.target.getAttribute(attr_target);

  /**
   * Obtener solo un elemento, no toda la colección. Por esta razón utilizamos
   * el `id`, para tener certeza de que solo obtendremos un elemento.
   */
  let modal = document.querySelector(modal_selector);

  /**
   * Agregar la clase para mostrar el modal.
   *
   * `modal.classList` trae la lista de clases separadas por espacio. Con el
   * método `.add()` agregamos una nueva clase.
   */
  modal.classList.add(class_show);
}

/**
 * Cerrar un modal
 * @param {PointerEvent} e Evento.
 */
function closeModal(e) {
  /**
   * `e.target` nos trae el elemento que generó el evento.
   *
   * Como dentro tiene un id (attr_target), podemos hacer el toggle al modal
   * completo.
   * @type {string}
   */
  let modal_selector = e.target.getAttribute(attr_dismiss);

  /**
   * Obtener solo un elemento, no toda la colección. Por esta razón utilizamos
   * el `id`, para tener certeza de que solo obtendremos un elemento.
   */
  let modal = document.querySelector(modal_selector);

  /**
   * Agregar la clase para mostrar el modal.
   *
   * `modal.classList` trae la lista de clases separadas por espacio. Con el
   * método `.remove()` quitamos una clase. En este caso, quitamos la clase de
   * mostrar el elemento.
   */
  modal.classList.remove(class_show);
}
