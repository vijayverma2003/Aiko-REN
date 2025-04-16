export function splitCharacters<T>(selector: T, className: string) {
  const element = document.querySelector(selector as any) as Element;
  console.log(element.textContent?.split(""));
  if (element.textContent) {
    element.innerHTML = element.textContent
      .split("")
      .map((char) => {
        if (char === " ")
          return `<span style="display: inline-block" class="${className}">&nbsp;</span>`;
        return `<span style="display: inline-block" class="${className}">${char}</span>`;
      })
      .join("");
  }
}
