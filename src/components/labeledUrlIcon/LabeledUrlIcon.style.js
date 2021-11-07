export const style = `
:host {
  width: 100%;
}
a {
  text-decoration: none;
}
.wrapper {
  margin: auto;
  color: var(--brand);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  padding-right: var(--spacing-m);
}
.label {
  font-weight: bold;
  padding-left: var(--spacing-m);
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