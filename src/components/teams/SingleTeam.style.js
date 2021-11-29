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
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.summary-wrapper {
  display: inline;
}
.technologies-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: var(--spacing-m) 0 0 var(--spacing-xl);
}
.technology {
  padding: var(--spacing-m) var(--spacing-s);
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
@media (min-width: 768px) {
  .team-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
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