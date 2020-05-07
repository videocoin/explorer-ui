import { RefObject, useEffect } from 'react';
import arePassiveEventsSupported from 'are-passive-events-supported';
import useLatest from 'use-latest';
import { IGNORE_OUTSIDE_CLASS_NAME } from 'const';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

const getOptions = (event: HandledEventsType) => {
  if (event !== TOUCHSTART) {
    return false;
  }

  if (arePassiveEventsSupported()) {
    return { passive: true };
  }

  return false;
};

export default function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Handler | null,
  preventLatest = false,
  disableClickOutside = false
) {
  const handlerRef = useLatest(handler);

  const listener = (event: PossibleEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLDivElement;
    if (!target) return;
    const ignored =
      target.classList.contains(IGNORE_OUTSIDE_CLASS_NAME) ||
      target.closest(`.${IGNORE_OUTSIDE_CLASS_NAME}`);

    if (ignored) {
      return;
    }
    if (
      !ref.current ||
      !handlerRef.current ||
      ref.current.contains(event.target as Node)
    ) {
      return;
    }
    !preventLatest && handlerRef.current(event);
  };

  useEffect(() => {
    if (!handler || disableClickOutside) {
      return () => null;
    }

    events.forEach((event) => {
      document.addEventListener(event, listener, getOptions(event));
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          listener,
          getOptions(event) as EventListenerOptions
        );
      });
    };
  }, [disableClickOutside, handler, listener]);
}
