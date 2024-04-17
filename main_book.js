import { config } from "./config/API_KEY.js";

const API_KEY = config.KAKAO_API_KEY;
$("document").ready(function () {
  $.ajax({
    url: "https://dapi.kakao.com/v3/search/book?query=프론트엔드",
    method: "GET",
    headers: { Authorization: `KakaoAK ${API_KEY}` },
  }).done(function (data) {
    console.log("data:", data);
  });
});
