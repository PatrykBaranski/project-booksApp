/* global utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ("use strict");
  class BookList {
    constructor() {
      this.favouriteBooks = [];
      this.filters = [];
      this.dom = {};

      this.getElements();
      this.render();
      this.renderRatingsStyles();
      this.initActions();
    }

    getElements() {
      console.log(document.querySelector(".books-list"));
      this.dom.booksListElem = document.querySelector(".books-list");
      this.dom.filtersElem = document.querySelector(".filters");
      this.dom.bookTemplate = Handlebars.compile(
        document.querySelector("#template-book").innerHTML
      );
    }

    render() {
      dataSource.books.forEach((book) => {
        const { booksListElem, bookTemplate } = this.dom;
        const { name, price, rating, image, id } = book;

        booksListElem.innerHTML += bookTemplate({
          name,
          price,
          rating,
          image,
          id,
        });
      });
    }

    initActions() {
      const { booksListElem, filtersElem } = this.dom;

      booksListElem.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (!e.target.closest("a").classList.contains("book__image")) return;
        this.toggleFavouriteBooks(e.target.closest("a"));
      });

      filtersElem.addEventListener("click", (e) => {
        if (!(e.target.getAttribute("type") === "checkbox")) return;
        this.filterBooksCallback(e.target);
      });
    }

    toggleFavouriteBooks(bookElem) {
      const { favouriteBooks } = this;
      const elementID = bookElem.getAttribute("data-id");

      bookElem.classList.toggle("favorite");
      if (favouriteBooks.includes(elementID)) {
        favouriteBooks.splice(favouriteBooks.indexOf(elementID), 1);
      } else {
        favouriteBooks.push(elementID);
      }
    }

    filterBooks() {
      dataSource.books.forEach((book) => {
        const { details, id } = book;
        const currentHTMLElem = document.querySelector(`[data-id="${id}"]`);

        currentHTMLElem.classList.remove("hidden");
        this.filters.forEach((filtr) => {
          if (details[filtr]) {
            currentHTMLElem.classList.add("hidden");
          }
        });
      });
    }

    filterBooksCallback(clickedCheckbox) {
      const checkboxValue = clickedCheckbox.getAttribute("value");
      if (clickedCheckbox.checked) {
        this.filters.push(checkboxValue);
      } else {
        this.filters.splice(this.filters.indexOf(checkboxValue), 1);
      }
      this.filterBooks();
    }

    returnGradientBasedOnRating(rating) {
      if (rating <= 6) {
        return "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
      } else if (rating > 6 && rating <= 8) {
        return "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 10%)";
      } else if (rating > 8 && rating <= 9) {
        return "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
      }
      return "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
    }

    renderRatingsStyles() {
      console.log(this.dom.book);
      this.dom.booksListElem.querySelectorAll(".book").forEach((book) => {
        const bookRatingElem = book.querySelector(".book__rating__fill");
        const bookRatingWithScale = bookRatingElem.innerHTML;
        const bookRating = bookRatingWithScale.slice(
          0,
          bookRatingWithScale.indexOf("/")
        );

        bookRatingElem.style.background = this.returnGradientBasedOnRating(
          +bookRating
        );
        bookRatingElem.style.width = `${bookRating * 10}%`;
      });
    }
  }

  const app = new BookList();
  console.log(app);
}
