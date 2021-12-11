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

/* -------------------------------- DROPDOWN -------------------------------- */

/**
 * Clase para hacer un menú dropdown.
 * @type {string}
 */
const dropdown_class = "dropdown";
/**
 * Hacer un toggle del dropdown. Agregarlo o quitarlo.
 * @type {string}
 */
const dropdown_toggle = "dropdown-toggle";
/**
 * Menú que tiene el dropdown.
 * @type {string}
 */
const dropdown_menu_class = "dropdown-menu";

/* --------------------------------- NAVBAR --------------------------------- */

/**
 * Mostrar u ocultar el navbar o menú para celulares.
 * @type {string}
 */
const navbar_toggle = "navbar-toggle";
/**
 * Colapsar el menú o mostrarlo dependiendo del tamaño del dispositivo.
 * @type {string}
 */
const menu_collapse_class = "navbar-collapse";

/* ------------------------------- UTILIDADES ------------------------------- */

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
  /* ------------------------------ ABRIR MODAL ----------------------------- */

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

  /* ----------------------------- CERRAR MODAL ----------------------------- */

  /**
   * Botones que cierran un modal
   *
   * Con el `querySelectorAll` no tenemos que pasar solo un elemento, sino que
   * pasamos combinadores con selectores. Obtenemos todos los elementos que
   * cumplan con la sintaxis.
   *
   * Lo siguiente quedaría como:
   *
   * > `[data-toggle='modal']`
   */
  let modal_close_buttons = document.querySelectorAll(`
    [${attr_dismiss}]
  `);

  /** Asignar el evento de cerrar el modal por cada uno de los elementos. */
  modal_close_buttons.forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  /* ------------------------------- DROPDOWN ------------------------------- */

  /**
   * Dropdown del submenú.
   *
   * Buscamos elementos que estén dentro de `.dropdown` y que tengan la clase
   * `.dropdown-toggle`.
   *
   * Que `.dropdown-toggle` estén inmediatamente enseguida del `.dropdown`.
   */
  let dropwdown_buttons = document.querySelectorAll(
    `.${dropdown_class} > .${dropdown_toggle}`,
  );

  /**
   * El comportamiento con "toggle" es que si le das click, se abre, y si lo
   * vuelves a hacer, se cierra.
   */
  dropwdown_buttons.forEach((element) => {
    element.addEventListener("click", toggleDropdown);
  });

  /* --------------------------------- NAVBAR --------------------------------- */

  /** Collapse del menú. */
  let collapse_menu_buttons = document.querySelectorAll(
    `.${navbar_toggle}`,
  );

  /**
   * El comportamiento con "toggle" es que si le das click, se abre, y si lo
   * vuelves a hacer, se cierra.
   */
  collapse_menu_buttons.forEach((element) => {
    element.addEventListener("click", toggleMenu);
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

/**
 * Abrir y cerrar un dropdown.
 * @param {PointerEvent} e Evento.
 */
function toggleDropdown(e) {
  /**
   * Evitar que se recargue la página, dado que se aplica a un link.
   */
  e.preventDefault();

  /**
   * Obtener submenú.
   *
   * Hay que acceder al elemento padre, el cual, es la lista del dropdown. Ya
   * en ese nivel, podemos buscar lo que está en el submenú.
   */
  let submenu = e.target.parentNode.querySelector(`
    .${dropdown_menu_class}
  `);

  /**
   * Si ya tiene una clase, la quita.
   * Si no tiene la clase, la agrega.
   *
   * Esto sería igual a lo siguiente:
   *
   * `
   *   if (submenu.classList.contains(class_show)) {
   *   submenu.classList.remove(class_show);
   *   } else {
   *     submenu.classList.add(class_show);
   *   }
   * `
   */
  submenu.classList.toggle(class_show);
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

/**
 * Abrir y cerrar un dropdown.
 * @param {PointerEvent} e Evento.
 */
function toggleDropdown(e) {
  /**
   * Evitar que se recargue la página, dado que se aplica a un link.
   */
  e.preventDefault();

  /**
   * Obtener submenú.
   *
   * Hay que acceder al elemento padre, el cual, es la lista del dropdown. Ya
   * en ese nivel, podemos buscar lo que está en el submenú.
   */
  let submenu = e.target.parentNode.querySelector(`
    .${dropdown_menu_class}
  `);

  /**
   * Si ya tiene una clase, la quita.
   * Si no tiene la clase, la agrega.
   *
   * Esto sería igual a lo siguiente:
   *
   * `
   *   if (submenu.classList.contains(class_show)) {
   *   submenu.classList.remove(class_show);
   *   } else {
   *     submenu.classList.add(class_show);
   *   }
   * `
   */
  submenu.classList.toggle(class_show);
}

/**
 * Abrir y cerrar el menú con toggle.
 * @param {PointerEvent} e Evento.
 */
function toggleMenu(e) {
  /**
   * Evitar que se recargue la página, dado que se aplica a un link.
   */
  e.preventDefault();

  /**
   * Acceder al botón padre, ya que, si pongo un SVG, se generan 2 elementos,
   * por lo que, si doy click al elemento más interno, obtiene la etiqueta SVG
   * y no el botón, que es lo que requiero para activar el toggle del menú.
   */
  parentButton = e.target.closest("button");

  // Ahora sí, accedemos al menú respecto al botón padre.
  let menu = parentButton.parentNode.querySelector(`
    .${menu_collapse_class}
  `);

  /**
   * Si ya tiene una clase, la quita.
   * Si no tiene la clase, la agrega.
   */
  menu.classList.toggle(class_show);
}
