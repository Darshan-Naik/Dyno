import { flushSync } from "react-dom";

const useViewTransition = (
  callback: () => void,
  config?: {
    ref: React.RefObject<HTMLElement | null>;
    transitionName: string;
  }
) => {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  if (config) {
    const { ref, transitionName } = config;
    if (!ref.current) {
      document.startViewTransition(() => {
        flushSync(callback);
      });
      return;
    }
    ref.current.style.viewTransitionName = transitionName;
    document.startViewTransition(() => {
      flushSync(() => {
        callback();
        if (ref.current) {
          ref.current.style.viewTransitionName = "";
        }
      });
    });
    return;
  }
  document.startViewTransition(() => {
    flushSync(callback);
  });
};

export default useViewTransition;

/* 
This Hook is used to animate UI transition
It used browser's API `document.startViewTransition`
It takes two arguments
1. callback - function to be called after transition
2. config - optional config object
  - ref - ref of the element to be animated
  - transitionName - name of the transition name given to the element

  Note :
   - Make sure to give proper transition name to the elements
   - and element should contain : layout;
   - there must be single element with transition name at a time on the DOM
   - eg: 
       <div
        style={{
            viewTransitionName: 'open-animate',
            contain: 'layout',
          }}
          >
        content
       </div>
*/
