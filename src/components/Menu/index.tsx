import React, { useEffect, useState } from 'react';
import { MenuItem, MenuProps } from './type';
import './style.css';
import { menuConfig } from './menuConfig';
const logo = require('../../assets/images/Logo.png');

const Menu: React.FC<MenuProps> = ({ role }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);
  const handleIconClick = (iconName: string, index: number, subMenu: any) => {
    setActiveIcon(iconName);
    setActiveIndex(index);
    if (activeIcon === iconName && activeIndex === index) {
      setIsExpanded(false);
      setActiveIcon(null);
      setActiveIndex(null);
    } else {
      setIsExpanded(true);
      setActiveIcon(iconName);
      setActiveIndex(index);
    }

    if (subMenu && subMenu.length > 0) {
      setActiveSubIndex(subMenu[0].id);
    } else {
      setActiveSubIndex(null);
    }
  };

  const handleSubMenuClick = (subIndex: number, parentIndex: number) => {
    setActiveSubIndex(subIndex);
    setActiveIndex(parentIndex);
  };

  const menuItems: MenuItem[] = menuConfig[role] || [];

  useEffect(() => {
    if (menuItems.length > 0 && activeIndex === null) {
      setActiveIcon(menuItems[0].title);
      setActiveIndex(0);
      setIsExpanded(true);

      if (menuItems[0].subMenu && menuItems[0].subMenu.length > 0) {
        setActiveSubIndex(menuItems[0].subMenu[0].id);
      }
    }
  }, [menuItems]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="absolute left-0 top-0 bg-orange-500 w-[112px] sm:w-[112px] lg:w-28 h-screen">
        <div>
          <a href="/">
            <img className="w-[74px] h-[42px] left-[19px] top-[58px] absolute" src={logo} alt="Logo" />
          </a>
        </div>
        <div className="w-8 h-[300px] left-[40px] top-[40px] absolute">
          {menuItems.map((item, index) => (
            <div key={item.id} className="relative">
              <a
                href={item.path || '#'}
                className={`relative w-8 h-8 absolute top-0 left-0 flex justify-center items-center cursor-pointer ${
                  activeIndex === index
                    ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2'
                    : ''
                }`}
                onClick={() => handleIconClick(item.title, index, item.subMenu)}
                style={{ top: `${205 + index * 60}px` }}
              >
                <img src={item.icon || 'default-icon.png'} alt={item.title} />
              </a>
            </div>
          ))}
        </div>
      </div>
      {isExpanded && (
        <div className="w-[300px] h-screen left-[112px] absolute bg-white pt-60 shadow-[4px_4px_10px_0px_rgba(133,178,220,0.25)]">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <span
                className={`block w-full h-12 no-underline flex items-center p-8 ${
                  activeIndex === index ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'
                }`}
              >
                <img
                  className="w-8 h-8 filter invert"
                  src={item.icon || 'default-icon.png'}
                  alt={item.title}
                  style={{
                    filter: 'invert(26%) grayscale(91%) saturate(6307%) hue-rotate(2deg)',
                  }}
                />
                <span className="ml-4 text-lg font-bold">{item.title}</span>
              </span>

              {item.subMenu && (
                <div className="ml-8 rounded-lg p-2">
                  {item.subMenu.map((subItem) => (
                    <a
                      href={subItem.path || '#'}
                      key={subItem.id}
                      className={`block w-full h-10 text-gray-600 text-sm hover:bg-gray-200 p-2 rounded-md ${
                        activeSubIndex === subItem.id ? 'bg-gray-300' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();

                        handleSubMenuClick(subItem.id, index);
                        setIsExpanded(false);
                      }}
                    >
                      <span className="text-[#373839] opacity-70 text-sm font-sans tracking-tight hover:text-[#373839] hover:font-bold hover:ml-2 transition-all">
                        {subItem.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
