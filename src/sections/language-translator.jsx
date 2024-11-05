"use client";
import React, { useEffect, useRef, useState } from "react";
import { CustomPopover, Iconify } from "../components";
import { useBoolean } from "../hooks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"; // Import usePathname
import { paths } from "../contants";
import { parseCookies, setCookie } from "nookies";

// The following cookie name is important because it's Google-predefined for the translation engine purpose
const COOKIE_NAME = "googtrans";
const allLangs = [
  {
    label: "English",
    value: "en",
    icon: "flagpack:gb-nir",
  },
  {
    label: "German",
    value: "de",
    icon: "flagpack:de",
  },
];

export const LangaugeTranslator = React.memo(() => {
  const { isOpen, toggleDrawer } = useBoolean();
  const popoverRef = useRef(null);
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const [activeLang, setActiveLang] = useState(allLangs[0]);

  const [currentLanguage, setCurrentLanguage] = useState();
  const [languageConfig, setLanguageConfig] = useState();

  // Initialize translation engine
  useEffect(() => {
    // 1. Read the cookie
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      // 2. If the cookie is defined, extract a language nickname from there.
      const sp = existingLanguageCookieValue?.split("/");
      if (sp?.length > 2) {
        languageValue = sp[2];
      }
    }
    // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue - use default one
    if (global?.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global?.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage;
    }
    if (languageValue) {
      // 4. Set the current language if we have a related decision.
      setCurrentLanguage(languageValue);
    }
    // 5. Set the language config.
    if (global?.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global?.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  // Don't display anything if current language information is unavailable.
  if (!currentLanguage || !languageConfig) {
    return null;
  }


  const isDashboardPage =
    pathname.startsWith(paths.hotelDashboard.root) ||
    pathname.startsWith(paths.guestDashboard.root) ||
    pathname.startsWith(paths.nomadDashboard.root);

  const switchLanguage = (lang) => {
    setActiveLang(lang);
    toggleDrawer();
    // We just need to set the related cookie and reload the page
    // "/auto/" prefix is Google's definition as far as a cookie name
    setCookie(null, COOKIE_NAME, "/auto/" + lang);
    window.location.reload();
  };


  return (
    <div className="relative w-fit">
      <div
        ref={popoverRef}
        className={cn(
          "flex items-center gap-2 sm:gap-3 cursor-pointer px-1 py-1 sm:px-4 sm:py-2.5 border rounded-full hover:shadow-md transition-all",
          isDashboardPage
            ? "bg-transparent border-white border-[1.5px] text-white hover:bg-black hover:bg-opacity-20"
            : " border-gray-600 text-black "
        )}
        onClick={toggleDrawer}
      >
        <Iconify
          iconName="et:global"
          className={cn(
            "hidden sm:block size-4 sm:size-5",
            isDashboardPage ? "text-white" : "text-gray-600"
          )}
        />
        <h2 className="text-sm hidden sm:block">{currentLanguage=="de"?"German":"English"}</h2>
        <Iconify
          iconName="iconamoon:arrow-down-2"
          className={cn(
            "size-5 -ml-1 hidden sm:block",
            isDashboardPage ? "text-white" : "text-gray-600"
          )}
        />
        <span className="flex sm:hidden justify-center items-center size-9  rounded-full">
          <Iconify
            iconName={currentLanguage=="en"? "flagpack:gb-nir" : "flagpack:de"}
            className="size-5 text-gray-600"
          />
        </span>
      </div>

      <CustomPopover
        popoverRef={popoverRef}
        isOpen={isOpen}
        onClose={toggleDrawer}
        arrow={true}
        parentClass=""
        className="flex flex-col w-full overflow-hidden"
      >
        <div className="flex flex-col divide-y divide-gray-200 divide-dashed w-full">
          {languageConfig.languages.map((ld, i) => (
            <>
              <div
                key={ld.name}
                onClick={() => switchLanguage(ld.name)}
                className={`flex items-center justify-between gap-3 px-3 py-2 hover:bg-custom-grey-2 text-[15px] w-full cursor-pointer ${
                  currentLanguage === ld.name
                    ? "bg-tertiary"
                    : "hover:bg-tertiary"
                }`}
              >
                <Iconify
                  iconName={ld.name == "en" ? "flagpack:gb-nir" : "flagpack:de"}
                />
                {ld.title}
              </div>
            </>
          ))}
        </div>
      </CustomPopover>
    </div>
  );
});
