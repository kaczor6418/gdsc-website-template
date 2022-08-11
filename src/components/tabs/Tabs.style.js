export const style = `
.tabs {
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--surface1);
  display: flex;
  align-items: stretch;
}

.tabs  kk-tab-indicator {
  position: absolute;
  z-index: 100;
  bottom: 0;
  width: 100%;
}

.tabs li {
  flex: 1;
}
`;
