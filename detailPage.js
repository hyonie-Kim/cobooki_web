import { config } from './api_key.js';

const API_KEY = config.API_KEY;

function getBookId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('bookId');
}

// 페이지 로드시 실행되는 함수

async function onPageLoad() {
  const bookId = getBookId();
  if (bookId) {
    try {
      // API에 요청을 보내서 bookId에 해당하는 도서의 세부 정보를 가져옴
      const bookDetails = await fetchBookDetailsById(bookId);
      // 가져온 세부 정보를 사용하여 페이지에 표시
      displayBookDetails(bookDetails);
    } catch (error) {
      console.error('도서 정보를 가져오는 중에 오류가 발생했습니다:', error);
    }
  } else {
    console.error('Book ID not found in query string');
  }
}

// API 요청
async function fetchBookDetailsById(bookId) {
  const apiUrl = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=ISBN&ItemId=${bookId}&output=JS&Cover=MidBig&Version=20131101&OptResult=ebookList,usedList,reviewList
`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(
      `도서 정보를 가져오는데 실패했습니다. : ${response.status}`
    );
  }
  return await response.json();
}

function displayBookDetails(bookDetails) {
  console.log('도서 세부 정보', bookDetails.item[0]);

  const bookContainer = document.querySelector('.book_container');
  bookContainer.innerHTML = `
   <div class="detail_bookCover">
      <img src="${bookDetails.item[0].cover}" alt="" />
    </div>
    <div class="detail_box">
      <div class="detail_info_category">${bookDetails.item[0].categoryName}</div>
      <div class="detail_price_box">
        <div class="detail_info_name">${bookDetails.item[0].title}</div>
      <div class="detail_info">
        <p>${bookDetails.item[0].author}</p>
        <div  class="detail_info_price">${bookDetails.item[0].priceStandard} 원</div>
      </div>
      </div>
      <div class="detail_explain_box">
        <div class="detail_explain_title">상품 설명</div>
      </div>
      <div class="detail-text">
        <p>
         ${bookDetails.item[0].description}
        </p>
      </div>
    </div> 
   `;
}

document.addEventListener('DOMContentLoaded', onPageLoad);
