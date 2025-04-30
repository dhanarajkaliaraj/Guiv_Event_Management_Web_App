import React, { useState } from "react";
import MenuBar from "./menu-bar";
import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
function SideBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div>
      <div className="lg:flex hidden">
        <MenuBar />
      </div>

      <div  className="lg:hidden flex ">
        <div className="p-5 bg-gray-800">
          <Menu
            size={20}
            color="white"
            onClick={() => setShowMobileMenu(true)}
          />
        </div>
        <Drawer
          open={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
          placement="left"
          style={{ backgroundColor: "oklch(0.278 0.033 256.848)" }}
          closeIcon={<X color="white" size={30} />}
        >
          <MenuBar />
        </Drawer>
      </div>
    </div>
  );
}

export default SideBar;
