import PropTypes from "prop-types";
import { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// ----------------------------------------------------------------------

function getRatio(ratio = "1/1") {
  return {
    "4/3": "calc(100% / 4 * 3)",
    "3/4": "calc(100% / 3 * 4)",
    "6/4": "calc(100% / 6 * 4)",
    "4/6": "calc(100% / 4 * 6)",
    "16/9": "calc(100% / 16 * 9)",
    "9/16": "calc(100% / 9 * 16)",
    "21/9": "calc(100% / 21 * 9)",
    "9/21": "calc(100% / 9 * 21)",
    "1/1": "100%",
  }[ratio];
}

const Image = forwardRef(
  (
    {
      ratio,
      overlay,
      disabledEffect = false,
      alt,
      src,
      afterLoad,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = "opacity", // Change this to "opacity" or remove for a sharper image
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      sx,
      ...other
    },
    ref
  ) => {
    const overlayStyles = overlay
      ? `absolute inset-0 z-10 bg-opacity-50 ${overlay}`
      : "";

    const content = (
      <LazyLoadImage
        alt={alt}
        src={src}
        afterLoad={afterLoad}
        delayTime={delayTime}
        threshold={threshold}
        beforeLoad={beforeLoad}
        delayMethod={delayMethod}
        placeholder={placeholder}
        wrapperProps={wrapperProps}
        scrollPosition={scrollPosition}
        visibleByDefault={visibleByDefault}
        effect={disabledEffect ? undefined : effect}
        useIntersectionObserver={useIntersectionObserver}
        wrapperClassName={wrapperClassName || "component-image-wrapper"}
        placeholderSrc={
          disabledEffect ? "/assets/transparent.png" : "/assets/placeholder.svg"
        }
        className={`w-full h-full object-cover ${
          ratio ? "absolute top-0 left-0" : ""
        }`}
        {...other}
      />
    );

    return (
      <span
        ref={ref}
        className={`relative inline-block align-bottom overflow-hidden ${
          ratio ? "w-full" : ""
        } ${sx || ""}`}
        {...other}
      >
        {overlay && <div className={overlayStyles} />}
        {content}
        <span
          className={`component-image-wrapper w-full h-full align-bottom bg-cover ${
            ratio ? `pt-[${getRatio(ratio)}]` : ""
          }`}
        />
      </span>
    );
  }
);

Image.displayName = "ImageComponent";

Image.propTypes = {
  afterLoad: PropTypes.func,
  alt: PropTypes.string,
  beforeLoad: PropTypes.func,
  delayMethod: PropTypes.string,
  delayTime: PropTypes.number,
  disabledEffect: PropTypes.bool,
  effect: PropTypes.string,
  overlay: PropTypes.string,
  ratio: PropTypes.oneOf([
    "4/3",
    "3/4",
    "6/4",
    "4/6",
    "16/9",
    "9/16",
    "21/9",
    "9/21",
    "1/1",
  ]),
  scrollPosition: PropTypes.object,
  src: PropTypes.string,
  sx: PropTypes.object,
  threshold: PropTypes.number,
  useIntersectionObserver: PropTypes.bool,
  visibleByDefault: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  wrapperProps: PropTypes.object,
  placeholder: PropTypes.element,
};

export default Image;
