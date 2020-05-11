import API from "./api/index.js";
import Provider from "./api/provider.js";
import PageController from "./controllers/page.js";

const AUTHORIZATION = `Basic ar283jdzsdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const apiWithProvider = new Provider(api);

const bodyElement = document.querySelector(`body`);

const pageController = new PageController(bodyElement, apiWithProvider);
pageController.render();
