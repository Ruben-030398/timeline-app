import { useEffect } from 'react';

const useHorizontalScrollEnd = (element: HTMLElement | null, callback: () => void, disabled: boolean) => {
  useEffect(() => {

    function handleScroll() {
      if (!element) return;

      if (element.scrollLeft + element.clientWidth === element.scrollWidth) {
        callback();
      }
    }

    if (element && !disabled) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      element && element.removeEventListener('scroll', handleScroll);
    };
  }, [callback, disabled, element]);
}

export default useHorizontalScrollEnd;