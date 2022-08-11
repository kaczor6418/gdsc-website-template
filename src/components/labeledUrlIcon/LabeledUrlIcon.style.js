export const style = `
:host {
  display: block;
}
a {
  text-decoration: none;
}
.wrapper {
  margin: auto;
  color: var(--brand);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.label {
  font-weight: bold;
  padding-top: var(--spacing-m);
  color: var(--brand);
  user-select: none;
  cursor: pointer;
  opacity: 80%;
  transition: opacity var(--default-duration) var(--ease-in-out-quint);
}
.label:hover {
  opacity: 100%;
}
`;
