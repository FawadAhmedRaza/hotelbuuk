"use client";

import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { generateSignedUrl } from "../utils/upload-images";
import { Iconify } from ".";

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

export const ProfileAvatar = forwardRef(
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
      type,
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
    const [signedUrl, setSignedUrl] = useState(null);

    const [loading, setLoading] = useState(false);
    const overlayStyles = overlay
      ? `absolute inset-0 z-10 bg-opacity-50 ${overlay}`
      : "";

    useEffect(() => {
      (async () => {
        if (type === "server") {
          setLoading(true);
          try {
            const url = await generateSignedUrl(src);
            setSignedUrl(url);
          } catch (err) {
            console.log("error", err);
          } finally {
            setLoading(false);
          }
        }
      })();
    }, [src]);

    const content = (
      <LazyLoadImage
        alt={alt}
        width={"100%"}
        height={"100%"}
        style={{
          objectFit: "cover",
        }}
        src={
          loading
            ? "/assets/placeholder.svg"
            : type == "server"
            ? signedUrl
            : src
        }
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

    if (!src) {
      return (
        <Iconify
          iconName="carbon:user-avatar-filled"
          className="!size-10  rounded-full object-cover text-gray-500"
        />
      );
    }

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

ProfileAvatar.displayName = "ImageRenderComponent";

ProfileAvatar.propTypes = {
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
