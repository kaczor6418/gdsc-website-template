export { App } from './App';
import styles from './style/main.css';

const rootStyleWrapper: HTMLStyleElement = document.createElement('style');
rootStyleWrapper.innerHTML = styles;
document.head.appendChild(rootStyleWrapper);
