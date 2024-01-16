"use client";

import { Menu } from "antd";
import React from "react";
import { DoubleRightOutlined } from "@ant-design/icons";

//! SIdeMenuUI is reusable MenuUI for showing layout sidebar UI with dropdown

const SideMenuUI = ({
  data: { itemsData, mainCss, menuCss, subMenuCss },
}: {
  data: {
    itemsData: any[] | undefined;
    mainCss?: string;
    menuCss?: string;
    subMenuCss?: string;
  };
}) => {
  const renderSubMenu = (item: any) => {
    return (
      <Menu.SubMenu
        key={item.key}
        icon={item.icon}
        className={menuCss}
        title={item.label}
      >
        {/* Sub manu */}
        {item.children.map((childItem: any) => (
          <Menu.Item className={subMenuCss} key={childItem.key}>
            <DoubleRightOutlined className="!text-primary" /> {childItem.label}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    );
  };
  return (
    <Menu
      className={mainCss}
      defaultSelectedKeys={["1"]}
      triggerSubMenuAction="hover"
      style={{
        overflowY: "auto",
        height: "calc(102vh)",
        fontSize: "14px",
      }}
      mode="inline"
    >
      {itemsData?.map((item: any) =>
        item.children ? (
          renderSubMenu(item)
        ) : (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className="custom-menu-item font-oswald text-[14px]"
          >
            {item.label}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default SideMenuUI;
