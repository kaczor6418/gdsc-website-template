import { DEFAULT_RIPPLE_EFFECT_TIME } from './common/CONSTANTS';

const style = `
.ripple {
  position: absolute;
  background-color: var(--brand);
  opacity: 50%;
  border-radius: 50%;
  width: 1px;
  height: 1px;
  pointer-events: none;
  animation: ripple var(--long-duration) var(--ease-in-out-quint);
}

@keyframes ripple {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1000);
  }
}
`;

export function rippleEffect(element: HTMLElement, e: MouseEvent, rippleEffectTimeMS = DEFAULT_RIPPLE_EFFECT_TIME): void {
  const ripple = document.createElement('span');
  const styleWrapper = document.createElement('style');
  const { left, top, width, height } = element.getBoundingClientRect();
  styleWrapper.innerHTML = style;
  ripple.appendChild(styleWrapper);
  ripple.className = 'ripple';
  if (e.offsetX === 0 && e.clientY === 0) {
    ripple.style.left = `${width / 2}px`;
    ripple.style.top = `${height / 2}px`;
  } else {
    ripple.style.left = `${e.clientX - left}px`;
    ripple.style.top = `${e.clientY - top}px`;
  }
  element.appendChild(ripple);
  window.setTimeout(() => {
    ripple.remove();
  }, rippleEffectTimeMS);
}
