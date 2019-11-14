import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  ReactElement,
  ContextType
} from 'react';
import { Breakpoints, BreakpointType } from 'types/common';

const defaultValue: Breakpoints = {};

const BreakpointContext = createContext(defaultValue);

const BreakpointProvider = ({
  children,
  queries
}: {
  children: ReactNode;
  queries: { [key in keyof Breakpoints]: string };
}): ReactElement => {
  const [queryMatch, setQueryMatch] = useState({});

  useEffect(() => {
    const mediaQueryLists: { [key in string]: MediaQueryList } = {};
    const keys = Object.keys(queries) as BreakpointType[];
    let isAttached = false;

    const handleQueryListener = (): void => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = mediaQueryLists[media] && mediaQueryLists[media].matches;
        return acc;
      }, {} as Breakpoints);
      setQueryMatch(updatedMatches);
    };

    if (window && window.matchMedia) {
      const matches: Breakpoints = {};
      keys.forEach((media: BreakpointType) => {
        if (queries[media]) {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach(media => {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    return () => {
      if (isAttached) {
        keys.forEach(media => {
          if (typeof queries[media] === 'string') {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  return (
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  );
};

function useBreakpoint(): ContextType<typeof BreakpointContext> {
  const context = useContext(BreakpointContext);
  if (context === defaultValue) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
}
export { useBreakpoint, BreakpointProvider };
