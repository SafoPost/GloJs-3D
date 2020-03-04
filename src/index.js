'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import getCalc from './modules/getCalc';
import sendForm from './modules/sendForm';
import validInput from './modules/validInput';

// timer -------------------
countTimer('29 February 2020');

// menu --------------------
toggleMenu();

// popup -------------------
togglePopup();

// tabs --------------------
tabs();

// Slider ------------------
slider();

// Our team ----------------
ourTeam();

// Calc --------------------
getCalc(100);

// send_ajax_form ----------
sendForm();

// Validate ----------------
validInput();