export const style = `
:host {
  display: flex;
  justify-content: center;
  align-items: center;
  fill: var(--text1);
}
svg {
  cursor: inherit;
  background: transparent;
  outline: none;
  filter: drop-shadow(var(--shadow-around-level-1) #000000);
  transition: all var(--default-duration) var(--ease-in-out-quint);
  will-change: filter, fill;
}
svg:hover, svg[aria-selected="true"] {
  filter: drop-shadow(var(--shadow-around-level-0) var(--brand));
  fill: var(--brand);
}
`