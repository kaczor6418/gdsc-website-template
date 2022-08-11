export const style = `
section {
  width: 100%;
}
summary {
  color: var(--brand);
  padding: var(--spacing-xl) 0;
  user-select: none;
  cursor: pointer;
  opacity: 80%;
  transition: opacity var(--default-duration) var(--ease-in-out-quint);
}
details {
  outline: none;
}
summary:hover,
details[open] summary {
  opacity: 100%;
}
h2 {
  margin: 0;
  display: inline-block;
  padding-left: var(--spacing-s);
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
}
li {
  padding: var(--spacing-l);
}
@media (min-width: 768px) {
  ul {
    justify-content: flex-start;
  }
}
`;
