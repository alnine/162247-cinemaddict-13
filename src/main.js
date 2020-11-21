import {createSiteMenuTemplate} from "./view/site-menu";

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector(`body`);
const siteMainElement = siteBody.querySelector(`.main`);

renderComponent(siteMainElement, createSiteMenuTemplate(), `beforeend`);
