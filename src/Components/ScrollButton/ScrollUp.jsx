/**
 * Based on https://github.com/milosjanda/react-scroll-up/blob/master/scrollUp.jsx
 * a MIT LICENSE
 */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useCall from "./../../hooks/useCall";

let ltick = Date.now();

function nextPosition(y, dt) {
  const absoluteSpeed = 3;
  const speed = -absoluteSpeed * y;
  return y + speed * dt;
}

function _handleScroll(parentEl, showState, showUnder) {
  const [show, setShow] = showState;

  if (!parentEl) return;

  if (parentEl.scrollTop > showUnder) {
    if (!show) setShow(true);
  } else {
    if (show) setShow(false);
  }
}

function _stopScrolling(animeId) {
  window.cancelAnimationFrame(animeId);
}

function _scrollStep(parentEl, animeIdState, topPosition) {
  const [animeId, setAnimeId] = animeIdState;
  const tick = Date.now();

  if (parentEl.scrollTop <= topPosition) {
    _stopScrolling(animeId);
  } else {
    const mili2sec = 1e-3;
    const dt = mili2sec * (tick - ltick);
    parentEl.scrollTop = nextPosition(parentEl.scrollTop, dt);
    setAnimeId(
      window.requestAnimationFrame(() =>
        _scrollStep(parentEl, animeIdState, topPosition),
      ),
    );
  }

  ltick = tick;
}

function _onClick(parentEl, animeIdState, topPosition) {
  const [animeId, setAnimeId] = animeIdState;
  ltick = Date.now();
  _stopScrolling(animeId);
  setAnimeId(
    window.requestAnimationFrame(() =>
      _scrollStep(parentEl, animeIdState, topPosition),
    ),
  );
}

const defaultStyle = {
  position: "sticky",
  display: "unset",
  cursor: "pointer",
  transitionDuration: "0.2s",
  transitionTimingFunction: "linear",
  transitionDelay: "0s",
};

export default function ScrollUp(props) {
  const { children, style, topPosition, showUnder, className } = props;
  const showState = useState(false);
  const [parentEl, setParentEl] = useState(null);
  const animeIdState = useState(null);
  const ref = useRef(null);

  const handleScroll = useCall(_handleScroll, parentEl, showState, showUnder);
  const stopScrolling = useCall(_stopScrolling, animeIdState[0]);

  useEffect(() => {
    const parentEl = ref.current.parentElement.parentElement;

    parentEl.addEventListener("scroll", handleScroll);
    parentEl.addEventListener("wheel", stopScrolling, false);
    parentEl.addEventListener("touchstart", stopScrolling, false);
    setParentEl(parentEl);

    return () => {
      parentEl.removeEventListener("scroll", handleScroll);
      parentEl.removeEventListener("wheel", stopScrolling, false);
      parentEl.removeEventListener("touchstart", stopScrolling, false);
    };
  }, [handleScroll, stopScrolling]);

  const innerStyle = {
    ...defaultStyle,
    ...style,
    ...(showState[0]
      ? {
          opacity: 1,
          visibility: "visible",
        }
      : {
          opacity: 0,
          visibility: "hidden",
        }),
  };

  const onClick = useCall(_onClick, parentEl, animeIdState, topPosition);

  return (
    <div ref={ref} className={className} style={innerStyle} onClick={onClick}>
      {children}
    </div>
  );
}

// Set default props
ScrollUp.defaultProps = {
  style: {},
  topPosition: 0,
};

// Set validation property types
ScrollUp.propTypes = {
  topPosition: PropTypes.number,
  showUnder: PropTypes.number.isRequired, // show button under this position,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
