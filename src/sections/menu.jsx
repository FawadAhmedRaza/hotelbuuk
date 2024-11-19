"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../providers/auth/context/auth-context";

import { AnchorTag, Button, Drawer, Iconify, Typography } from "../components";
import { AuthLinks, MenuLinks } from "../_mock/_menu";
import { BgIcon } from "../components/bg-icon";

export const Menu = ({ isOpen, setIsOpen, onClick }) => {
  const router = useRouter();
  const { authenticated, logout, user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <Drawer isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen}>
      <div className="flex justify-between items-center">
        <Typography
          variant="h3"
          className=" !text-3xl md:!text-4xl font-bold text-primary text-start"
        >
          Hotelbuuk
        </Typography>

        <BgIcon
          iconName="charm:cross"
          onClick={onClick}
          className="bg-primary !text-white flex min-450:hidden"
          iconClass="!text-white size-6"
        />
      </div>
      <div className="flex flex-col h-96 justify-center sm:justify-start items-center sm:items-start gap-5 mt-10">
        {MenuLinks(user)?.map((item) => {
          return (
            <AnchorTag
              key={item?.id}
              href={item?.path}
              onClick={onClick}
              className={` !text-lg  ${
                location?.pathname == item?.path
                  ? "!text-primary underline"
                  : "!text-black hover:!text-primary"
              }`}
            >
              <div className="flex gap-3 items-center">
                <Iconify
                  iconName={item?.icon}
                  className={`!size-5 text-black`}
                />
                <span className="text-lg">{item?.label}</span>
              </div>{" "}
              {/* {item?.label} */}
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
                onClick={onClick}
                className={` !text-lg  ${
                  location?.pathname == item?.path
                    ? "!text-primary underline"
                    : "!text-black hover:!text-primary"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <Iconify
                    iconName={item?.icon}
                    className={`!size-5 text-black`}
                  />
                  <span className="text-lg">{item?.label}</span>
                </div>{" "}
                {/* {item?.label} */}
              </AnchorTag>
            );
          })
        )}
      </div>
    </Drawer>
  );
};
