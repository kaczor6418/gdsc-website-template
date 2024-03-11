export function removeStyleFromElement(element: Element): void {
  element.removeAttribute('style');
  const children = Array.from(element.children);
  for (const child of children) {
    child.removeAttribute('style');
    removeStyleFromElement(child);
  }
}
