export function initTypewriter() {
  const typewriterElements = document.querySelectorAll<HTMLElement>(".typewriter");
  typewriterElements.forEach((element) => {
    const phrase = element.dataset.phrase || "";

    const container = document.createElement("div");
    container.style.height = "1.5em";
    container.style.display = "flex";
    container.style.alignItems = "center";
    element.parentNode?.insertBefore(container, element);
    container.appendChild(element);

    let charIndex = 0;

    const typeCharacter = () => {
      if (charIndex >= phrase.length) return;
      element.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeCharacter, 100);
    };

    typeCharacter();
  });
}

export function initCvDownload() {
  const btnDescargar = document.getElementById("descargar-cv");
  btnDescargar?.addEventListener("click", () => {
    const cvUrl = "/projects/pdf/JuanDavidDuarteHernandezCV.pdf";
    window.open(cvUrl, "Juan_Duarte_CV.pdf");
  });
}
