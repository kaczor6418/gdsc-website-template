export const style = `
:host {
  width: 100%;
}
a {
  text-decoration: none;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
}
.avatar-label {
  font-weight: bold;
  padding-top: var(--spacing-m);
  color: var(--brand);
  user-select: none;
  cursor: pointer;
  opacity: 80%;
  transition: opacity var(--default-duration) var(--ease-in-out-quint);
}
.avatar-label:hover {
  opacity: 100%;
}
.section-title {
  padding-left: var(--font-size-l);
}
`;
