/* global utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ("use strict");
  const bookTemplate = Handlebars.compile(
    document.querySelector("#template-book").innerHTML
  );
  const favouriteBooks = [];
  const filters = [];

  const render = () => {
    dataSource.books.forEach((book) => {
      const { name, price, rating, image, id } = book;

      document.querySelector(".books-list").innerHTML += bookTemplate({
        name,
        price,
        rating,
        image,
        id,
      });
    });
  };

  const toggleFavouriteBooks = (bookElem) => {
    const elementID = bookElem.getAttribute("data-id");

    bookElem.classList.toggle("favorite");
    if (favouriteBooks.includes(elementID)) {
      favouriteBooks.splice(favouriteBooks.indexOf(elementID), 1);
    } else {
      favouriteBooks.push(elementID);
    }
  };

  const filterBooks = () => {
    const filterFormElem = document.querySelector(".filters");
  };

  const initActions = () => {
    document.querySelector(".books-list").addEventListener("dblclick", (e) => {
      e.preventDefault();
      if (!e.target.closest("a").classList.contains("book__image")) return;
      toggleFavouriteBooks(e.target.closest("a"));
    });

    filterBooks();
  };

  render();
  initActions();
}
