const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const socialIcons = document.querySelector(".social-icons");

navToggle.addEventListener("click", function () {
  console.log(links.classList);
  links.classList.toggle("show-links");
  socialIcons.classList.toggle("show-icons");
});


// second section

const baseUrl = `https://api.nytimes.com/svc/books/v3`;
const apiKey = `0nG5do2caU59G7F2PT1eRQD0RAsaX5Du`;
let activeLink;
const getList = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/names.json?api-key=${apiKey}`
    );
    console.log(res);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Xatolik sodir bo'ldi: " + error);
    return { success: false };
  }
};
getList();
const list = document.getElementById("list");
const setList = async () => {
  // list.innerHTML = "";
  const res = await getList();
  // console.log(res.data.);
  if (res.success) {
    res.data.results.map((v, i) => {
      // console.log(res.data.results);
      console.log();
      const a = document.createElement("a");
      a.href = `#${v.list_name_encoded}`;

      a.className = `list-group-item list-group-item-action`;
      a.onclick = (event) => {
        event.target.classList.add("active");

        activeLink?.classList?.remove("active");
        activeLink = event.target;
        setBooks(v);
      };
      a.innerHTML = `${v.list_name}
      
      <p
        class="
            d-flex
            justify-content-between
            align-items-center
            m-0
            mt-2
        "
        >
        <span><i class="far fa-calendar-alt me-1"></i> ${v.newest_published_date}</span>
        <span class="badge bg-warning text-dark ms-3">${v.updated}</span>
        </p>`;

      list.appendChild(a);
    });
    setBooks(res.data.results[0]);
  }
};

setList();
const getBooks = async (list_name_encoded) => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/current/${list_name_encoded}.json?api-key=${apiKey}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false };
  }
};
const books = document.getElementById("books");
const listName = document.getElementById("list-name");
const setBooks = async (obj) => {
  console.log("list group: " + obj);

  books.innerHTML = "";
  const res = await getBooks(obj.list_name_encoded);
  if (res.success) {
    // listName.innerHTML = `Bo'lim: ${obj.list_name}`;
    res.data.results.books.map((v, i) => {
      const book = document.createElement("div");
      book.className = `col-lg-3 col-md-6 col-sm-12 my-3`;
      book.innerHTML = `   <div class="card shadow p-1">
                    <img
                      src="${v.book_image}"
                      class="bookimg w-100"
                      alt="bookimg"
                    />
                    <div
                      class="
                        d-flex
                        justify-content-sm-between
                        justify-content-between
                        justify-content-between
                      "
                    >
                         <a
                        href="${v.amazon_product_url}"
                        class="btn btn-success m-1 p-md-2 p-3"
                        id="btn"
                      >
                      <i class="fas fa-shopping-cart"></i> buy
                      </a>
                      <button class="btn btn-success m-1 fs-6 p-md-1 p-2">
                       Add to card <i class="fas fa-shopping-basket"></i> 
                      </button>
                    </div>
                  </div>`;
      books.appendChild(book);
    });
  }
};
