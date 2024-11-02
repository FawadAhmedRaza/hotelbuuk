"use client";

import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { generateSignedUrl } from "../utils/upload-images";
import "react-lazy-load-image-component/src/effects/opacity.css"; // Import lazy load styles
import "react-lazy-load-image-component/src/effects/blur.css";

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

const ImageRender = forwardRef(
  (
    {
      ratio,
      overlay,
      disabledEffect = false,
      alt,
      src,
      afterLoad,
      delayTime,
      threshold = 300, // Default threshold for lazy loading
      beforeLoad,
      type,
      delayMethod = "throttle", // Throttle for better performance
      wrapperProps,
      scrollPosition,
      effect = "opacity", // Smooth opacity effect
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver = true,
      sx,
      ...other
    },
    ref
  ) => {
    const [signedUrl, setSignedUrl] = useState(null);
    const [loading, setLoading] = useState(true); // Start in loading state

    const overlayStyles = overlay
      ? `absolute inset-0 z-10 bg-opacity-50 ${overlay}`
      : "";

    // Fetch the signed URL if 'type' is 'server'
    useEffect(() => {
      (async () => {
        if (type === "server") {
          try {
            const url = await generateSignedUrl(src);
            setSignedUrl(url);
          } catch (err) {
            console.error("Failed to load signed URL", err);
          } finally {
            setLoading(false); // Stop loading
          }
        } else {
          setLoading(false); // No server image, stop loading
        }
      })();
    }, [src, type]);

    if (loading) {
      // Don't render anything while loading to avoid flicker
      return null;
    }

    return (
      <span
        ref={ref}
        className={`relative inline-block align-bottom overflow-hidden ${
          ratio ? "w-full" : ""
        } ${wrapperClassName || ""} ${sx || ""}`}
        {...other}
      >
        {overlay && <div className={overlayStyles} />}

        <LazyLoadImage
          key={src} // Force re-render when src changes
          alt={alt}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          src={signedUrl || src} // Use signed URL if available
          afterLoad={afterLoad}
          delayTime={delayTime}
          threshold={threshold}
          beforeLoad={beforeLoad}
          delayMethod={delayMethod}
          wrapperProps={wrapperProps}
          scrollPosition={scrollPosition}
          visibleByDefault={visibleByDefault}
          effect={disabledEffect ? undefined : effect} // Smooth fade effect
          useIntersectionObserver={useIntersectionObserver}
          wrapperClassName={wrapperClassName || "component-image-wrapper"}
          className={`w-full h-full object-cover ${
            ratio ? "absolute top-0 left-0" : ""
          } ${other.className || ""}`}
          {...other}
        />
      </span>
    );
  }
);

ImageRender.displayName = "ImageRenderComponent";

ImageRender.defaultProps = {
  type: "server",
  alt: "Image",
  ratio: "1/1",
  disabledEffect: false,
};

ImageRender.propTypes = {
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
};

export default ImageRender;
