export const style = `
a {
  position: relative;
  text-decoration: none;
  color: var(--text1);
  outline: none;
}
.wrapper {
  cursor: pointer;
  width: 18rem;
  background-color: var(--surface2);
  filter: drop-shadow(var(--shadow-around-level-1) #000000);
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all var(--default-duration) var(--ease-in-out-quint);
  transition-property: filter, width, background-color;
  will-change: filter, width;
}

.wrapper:hover,
.wrapper:focus,
.wrapper[aria-selected='true'] {
  outline: none;
  background-color: var(--surface3);
  filter: drop-shadow(var(--shadow-around-level-0) var(--brand));
}

.picture {
  width: 100%;
}

.header {
  font-weight: bold;
}

.content {
  padding: var(--spacing-l);
}

.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  transition: -webkit-line-clamp var(--super-long-duration) var(--ease-in-out-quint);
}

.title {
  color: var(--brand);
}

@media (min-width: 375px) {
  .wrapper {
    width: 20rem;
  }
  .description {
    -webkit-line-clamp: 7;
  }
}

@media (min-width: 1300px) {
  .wrapper {
    width: 22rem;
  }
  .description {
    -webkit-line-clamp: 8;
  }
}
`;