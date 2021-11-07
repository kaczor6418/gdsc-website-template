export const style = `
:host {
  width: 100%;
}
a {
  text-decoration: none;
}
summary,
.project__picture__description {
  color: var(--brand);
  user-select: none;
  cursor: pointer;
  opacity: 80%;
  transition: opacity var(--default-duration) var(--ease-in-out-quint);
}
summary:hover,
details[open] summary,
.project__picture__description {
  opacity: 100%;
}
h2 {
  margin: 0;
  display: inline-block;
  padding-left: var(--spacing-s);
}
ul {
  list-style-type: none;
}
.project__info {
  padding-left: var(--spacing-l);
}
.project__creators {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.creator {
  cursor: pointer;
  padding: var(--spacing-m);
}
.project__picture__description {
  text-align: center;
  font-weigh: bold;
}
.project__picture {
  max-width: 100%;
}
@media (min-width: 1350px) {
  .project__content--wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  .project__demo {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
`;