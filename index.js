import { config } from './api_key.js';

const API_KEY = config.API_KEY;
// 도서 api호출하는 함수

async function fetchBooks() {
  try {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewAll&MaxResults=12&start=1&SearchTarget=Book&CategoryId=351&Cover=MidBig&output=JS&Version=20131101`
      // `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${API_KEY}&Query=c언어&Cover=MidBig&QueryType=Title&MaxResults=12&start=1&SearchTarget=Book&output=js&Version=20131101&OptResult=Toc,Story,fulldescription`
    );
    const data = await response.json();
    console.log('fetch API 응답 받은 결과', data);
    return data.item;
  } catch (error) {
    console.error('도서를 불러올수 없습니다.:', error);
  }
}

async function displayBooks() {
  const bookContainer = document.querySelector('.books_list');
  const books = await fetchBooks();
  books.forEach((book) => {
    console.log(book);
    const li = document.createElement('li');
    li.classList.add('book_item');
    li.innerHTML = `
            <div class="book-container">
              <div
                class="book-image"
                style="background-image: url('/images/preparingImage.png')"
              >
                <img src="${book.cover}" style="width: 180px" />
              </div>
              <div class="book_info">
                <h5 class="book_name">${book.title}</h5>
                <p class="book_price">가격: ${book.priceStandard}원</p>
              </div>
            </div>
    `;

    li.addEventListener('click', () => {
      handleBookItemClick(book);
    });

    bookContainer.appendChild(li);
  });
}
// 페이지 로드 시 도서 목록 불러오기
displayBooks();

function handleBookItemClick(book) {
  const bookId = book.isbn;
  window.location.href = `/detailPage.html?bookId=${bookId}`;
}

const booksContainer = document.querySelector('.books_list');

booksContainer.addEventListener('mouseover', function (event) {
  const target = event.target.closest('.book_item');
  if (target) {
    booksContainer
      .querySelectorAll('.book_item')
      .forEach((book) => book.classList.add('blurred'));
    target.classList.remove('blurred');
  }
});

booksContainer.addEventListener('mouseleave', function () {
  booksContainer
    .querySelectorAll('.book_item')
    .forEach((book) => book.classList.remove('blurred'));
});

const swiper = new Swiper('.swiper', {
  // 스와이프 옵션
  direction: 'horizontal',
  // loop: true,
  centeredSlides: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
