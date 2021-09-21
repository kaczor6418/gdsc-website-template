export const style = `
footer {
  background-color: var(--surface1);
  padding: var(--spacing-m);
  filter: drop-shadow(var( --shadow-top) #000000);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

p {
  text-align: center;
}

a {
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  opacity: 70%;
  color: var(--brand);
  transition: all var(--default-duration) var(--ease-in-out-quint);
  transition-property: opacity, font-size;
  will-change: opacity, font-size;
}

a:hover {
  opacity: 100%;
  font-size: var(--font-size-l);
}
`;