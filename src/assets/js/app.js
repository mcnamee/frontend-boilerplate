/* global window $ */

// Imports / Plugins / Dependencies
// ------------------------------------------------------

import 'bootstrap';

window.Popper = require('popper.js').default;
window.$ = require('jquery');

// Custom
// ------------------------------------------------------

/**
 * Popovers
 */
$(() => $('[data-toggle="popover"]').popover());

/**
 * Tooltips
 */
$(() => $('[data-toggle="tooltip"]').tooltip());
