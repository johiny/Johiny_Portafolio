// Utility to enable horizontal drag scroll + wheel horizontal conversion
export function enableDragScroll(container: HTMLElement) {
  // Horizontal wheel scroll
  container.addEventListener('wheel', (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const startDrag = (pageX: number) => {
    isDown = true;
    startX = pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.classList.add('dragging');
  };
  const endDrag = () => {
    isDown = false;
    container.classList.remove('dragging');
  };
  const moveDrag = (pageX: number) => {
    if (!isDown) return;
    const x = pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  // Mouse
  container.addEventListener('mousedown', (e) => startDrag(e.pageX));
  container.addEventListener('mouseleave', endDrag);
  container.addEventListener('mouseup', endDrag);
  container.addEventListener('mousemove', (e) => moveDrag(e.pageX));

  // Touch
  container.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX), { passive: true });
  container.addEventListener('touchend', endDrag, { passive: true });
  container.addEventListener('touchmove', (e) => moveDrag(e.touches[0].pageX), { passive: true });
}
