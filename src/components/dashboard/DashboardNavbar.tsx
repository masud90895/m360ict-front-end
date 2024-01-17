/* eslint-disable @next/next/no-img-element */
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { IoSearch } from "react-icons/io5";

import { Button, message } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import Image from "next/image";
// import { logout } from "@/utils/local-storage";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Logo from "../shared/Logo/Logo";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { tokenKey } from "@/helpers/token/tokenKey";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const DashboardNavbar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const router = useRouter();
  const SignOutHandler = () => {
    removeFromLocalStorage(tokenKey);
    // logout();
    message.error("Successfully Sign Out");
    router.push("/sign-in");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "#000000",
        backgroundColor: "#ffffff",
        paddingInline: "3px",
      }}
    >
      <Disclosure as="nav" className="bg-white shadow w-full">
        {({ open }) => (
          <>
            <div className="mx-auto  px-2  lg:pr-8">
              <div className="flex h-16 justify-between">
                {/* button */}
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />

                {/* button end  */}
                <div className="md:flex hidden flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-start">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <IoSearch
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block
                         w-full
                          rounded-md 
                          border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6 focus:ring-primary outline-primary "
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>

                {/* only Mobile */}

                <div className=" w-full  py-3 px-16 md:hidden">
                  <Logo />
                </div>

                {/* notification */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          height={50}
                          width={50}
                          className="h-8 w-8 rounded-full"
                          src={
                            // userInfo?.imgUrl ?? userImage
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNvnKSp_yZT4Q5ciyjFGH-rxPJwp2L42BWMuG5YeNJVg&s"
                          }
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={SignOutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700  hover:bg-primary  hover:text-white  mb-0 w-full text-start"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </Header>
  );
};

export default DashboardNavbar;
