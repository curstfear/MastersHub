document.addEventListener("DOMContentLoaded", () => {
  // Карта соответствия: data-animation => [Классы Tailwind для скрытия]
  const ANIMATION_MAP = {
    "fade-up": ["opacity-0", "translate-y-10"], // Появление снизу (сдвиг вверх)
    "fade-down": ["opacity-0", "-translate-y-10"], // Появление сверху (сдвиг вниз)
    "fade-left": ["opacity-0", "translate-x-10"], // Появление справа (сдвиг влево)
    "fade-right": ["opacity-0", "-translate-x-10"], // Появление слева (сдвиг вправо)
    fade: ["opacity-0"], // Только плавное появление
  };

  const revealElements = document.querySelectorAll(".js-reveal");

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      const animationType = target.getAttribute("data-animation");
      const delay = target.getAttribute("data-delay") || "0";

      const hiddenClasses = ANIMATION_MAP[animationType] || [];

      if (entry.isIntersecting) {
        // ПОЯВЛЕНИЕ

        // Применяем задержку
        target.style.transitionDelay = `${delay}ms`;

        // 1. Устанавливаем видимое состояние
        target.classList.add("opacity-100");

        // 2. УДАЛЯЕМ классы скрытия (Tailwind анимирует удаление)
        target.classList.remove(...hiddenClasses);

        // Опционально: отключаем наблюдение, если анимация должна быть однократной
        // observer.unobserve(target);
      } else {
        // СКРЫТИЕ (Для повторной анимации при обратной прокрутке)

        // 1. Удаляем видимое состояние
        target.classList.remove("opacity-100");

        // 2. Возвращаем классы скрытия
        target.classList.add(...hiddenClasses);

        // Сбрасываем задержку
        target.style.transitionDelay = "0ms";
      }
    });
  };

  // Настройки Observer: срабатывает, когда 10% элемента видно
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px", // Срабатывание немного заранее
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Инициализация: применяем начальное скрытое состояние и начинаем наблюдение
  revealElements.forEach((element) => {
    const animationType = element.getAttribute("data-animation");
    const hiddenClasses = ANIMATION_MAP[animationType] || [];

    // Обязательно добавляем класс transform для корректной работы анимации сдвига
    element.classList.add(...hiddenClasses, "opacity-0", "transform");

    observer.observe(element);
  });
});
