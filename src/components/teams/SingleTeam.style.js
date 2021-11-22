export const style = `
:host {
  width: 100%;
}
summary {
  color: var(--brand);
  user-select: none;
  cursor: pointer;
  opacity: 80%;
  transition: opacity var(--default-duration) var(--ease-in-out-quint);
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
.team-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.members {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.kk-labeled-avatar {
  padding: var(--spacing-m);
}
.single-section {
  padding-left: var(--spacing-xl);
} 
.section-description {
  padding-left: var(--spacing-m);
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