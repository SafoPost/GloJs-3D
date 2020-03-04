'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill'

import elementClosest from 'element-closest';
elementClosest(window);

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
countTimer('06 March 2020');

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