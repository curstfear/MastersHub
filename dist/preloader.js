window.onload = function () {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    // Запускаем задержку
    setTimeout(() => {
      // 1. Запускаем плавное исчезновение
      preloader.style.opacity = "0";

      // 2. Полностью убираем элемент из потока после завершения анимации исчезновения
      setTimeout(() => {
        preloader.style.display = "none";
      }, 400);
    }, 300); // Здесь устанавливается дополнительная задержка
  }
};
