"use client";
import React from "react";
import { AnchorTag, Button, Drawer, Iconify, Typography } from "../components";
import { AuthLinks, MenuLinks } from "../_mock/_menu";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../auth/jwt/auth-context";
import { auth } from "../auth";

export const Menu = ({ isOpen, setIsOpen, onClick }) => {
  const router = useRouter();
  const { authenticated, logout } = useAuthContext();

  const pathname = usePathname();
  console.log(pathname);
  console.log("Is Auth true", authenticated);

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <Drawer isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen}>
      <div className="flex justify-between items-center">
        <Typography
          variant="h3"
          className=" !text-3xl md:!text-4xl font-bold text-primary text-start  "
        >
          Hotelbuuk
        </Typography>

        <Iconify
          iconName="radix-icons:cross-1"
          className="size-8 text-primary cursor-pointer"
          onClick={onClick}
        />
      </div>
      <div
        className="flex flex-col h-96 justify-center sm:justify-start items-center   sm:items-start
       gap-5 mt-10 "
      >
        {MenuLinks?.map((item) => {
          return (
            <AnchorTag
              key={item?.id}
              href={item?.path}
              className={` !text-lg  ${
                location?.pathname == item?.path
                  ? "!text-primary underline"
                  : "!text-black hover:!text-primary"
              }`}
            >
              {item?.label}
            </AnchorTag>
          );
        })}
        {authenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          AuthLinks?.map((item) => {
            return (
              <AnchorTag
                key={item?.id}
                href={item?.path}
                className={` !text-lg  ${
                  location?.pathname == item?.path
                    ? "!text-primary underline"
                    : "!text-black hover:!text-primary"
                }`}
              >
                {item?.label}
              </AnchorTag>
            );
          })
        )}
      </div>
    </Drawer>
  );
};
