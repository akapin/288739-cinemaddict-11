import API from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import PageController from "./controllers/page.js";

const AUTHORIZATION = `Basic ar283jdzsdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const bodyElement = document.querySelector(`body`);

const pageController = new PageController(bodyElement, apiWithProvider);
pageController.render();

window.addEventListener(`load`, () => navigator.serviceWorker.register(`/sw.js`));

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
