import API from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import PageController from "./controllers/page.js";

const AUTHORIZATION = `Basic ar283jdzsdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store();
const apiWithProvider = new Provider(api, store);

const bodyElement = document.querySelector(`body`);

const pageController = new PageController(bodyElement, apiWithProvider);
pageController.render();
