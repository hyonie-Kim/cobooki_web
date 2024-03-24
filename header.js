const toggleBtn = document.querySelector('.nav_toogleBtn');
const menu = document.querySelector('.nav_menu');
const login = document.querySelector('.nav_login');

toggleBtn.addEventListener('click', () => {
  //active가 없다면 추가, 있다면 제거
  menu.classList.toggle('active');
  login.classList.toggle('active');
});
