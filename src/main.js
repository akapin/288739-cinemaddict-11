import API from "./api.js";
import PageController from "./controllers/page.js";

const AUTHORIZATION = `Basic ar283jdzsdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

const bodyElement = document.querySelector(`body`);

const pageController = new PageController(bodyElement, api);
pageController.render();
