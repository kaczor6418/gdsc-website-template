export const style = `
section {
  width: 100%;
}
summary {
  color: var(--brand);
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
  display: inline-block;
  padding-left: var(--spacing-s);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0 var(--spacing-l) 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
}
li {
  padding: var(--spacing-l);
}
@media (min-width: 760px) {
  ul {
    justify-content: flex-start;
  }
}
`;