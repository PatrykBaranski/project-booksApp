/* global utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ("use strict");
  const favouriteBooks = [];
  const filters = [];
  const booksList = document.querySelector(".books-list");

  const bookTemplate = Handlebars.compile(
    document.querySelector("#template-book").innerHTML
  );

  const render = () => {
    dataSource.books.forEach((book) => {
      const { name, price, rating, image, id } = book;

      booksList.innerHTML += bookTemplate({
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
    dataSource.books.forEach((book) => {
      const { details, id } = book;
      const currentHTMLElem = document.querySelector(`[data-id="${id}"]`);

      currentHTMLElem.classList.remove("hidden");
      filters.forEach((filtr) => {
        if (details[filtr]) {
          currentHTMLElem.classList.add("hidden");
        }
      });
    });
  };

  const filterBooksCallback = (clickedCheckbox) => {
    const checkboxValue = clickedCheckbox.getAttribute("value");
    if (clickedCheckbox.checked) {
      filters.push(checkboxValue);
    } else {
      filters.splice(filters.indexOf(checkboxValue), 1);
    }
    filterBooks();
  };

  const returnGradientBasedOnRating = (rating) => {
    if (rating <= 6) {
      return "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
    } else if (rating > 6 && rating <= 8) {
      return "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 10%)";
    } else if (rating > 8 && rating <= 9) {
      return "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
    }
    return "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
  };

  const renderRatingsStyles = () => {
    booksList.querySelectorAll(".book").forEach((book) => {
      const bookRatingElem = book.querySelector(".book__rating__fill");
      const bookRatingWithScale = bookRatingElem.innerHTML;
      const bookRating = bookRatingWithScale.slice(
        0,
        bookRatingWithScale.indexOf("/")
      );
      bookRatingElem.style.background = returnGradientBasedOnRating(
        +bookRating
      );
      bookRatingElem.style.width = `${bookRating * 10}%`;
    });
  };

  const initActions = () => {
    booksList.addEventListener("dblclick", (e) => {
      e.preventDefault();
      if (!e.target.closest("a").classList.contains("book__image")) return;
      toggleFavouriteBooks(e.target.closest("a"));
    });

    document.querySelector(".filters").addEventListener("click", (e) => {
      if (!(e.target.getAttribute("type") === "checkbox")) return;
      filterBooksCallback(e.target);
    });
  };

  render();
  renderRatingsStyles();
  initActions();
}
