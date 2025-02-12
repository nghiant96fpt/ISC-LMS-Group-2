// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { MenuItem, MenuProps } from './type';
// import './style.css';
// import { menuConfig } from './menuConfig';
// const logo = require('../../assets/images/Logo.png');
// const logo2 = require('../../assets/images/logo2.png');
// const arrow = require('../../assets/icons/icon-arrow-left.png');
// const Menu: React.FC<MenuProps> = ({ role }) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [expandedSubMenuIndex, setExpandedSubMenuIndex] = useState<number | null>(null);
//   const [open, setOpen] = useState(true);
//   const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
//   const menuItems: MenuItem[] = menuConfig[role] || [];

//   useEffect(() => {
//     if (menuItems.length > 0 && activeIndex === null) {
//       setActiveIndex(0);
//     }
//   }, [menuItems]);

//   useEffect(() => {
//     if (!open) {
//       setExpandedSubMenuIndex(null);
//     }
//   }, [open]);

//   const handleSubMenuClick = (subIndex: number, parentIndex: number) => {
//     if (expandedSubMenuIndex === parentIndex) {
//       setExpandedSubMenuIndex(null);
//     } else {
//       setExpandedSubMenuIndex(parentIndex);
//     }
//     setActiveSubIndex(subIndex);
//   };

//   return (
//     <nav
//       className={`shadow-md h-screen p-2 flex flex-col duration-500 ${
//         open ? 'bg-background-white text-black' : 'bg-background-orange-3 text-white'
//       } ${open ? 'w-80' : 'w-20'}`}
//     >
//       {/* Header */}
//       <div className="relative px-3 py-2 h-20 flex flex-col justify-center items-center">
//         {open && (
//           <img
//             src={arrow}
//             alt="Close"
//             className="absolute top-2 right-2 w-6 h-8 text-black p-1 rounded-full cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         )}

//         {/* Logo */}
//         <img
//           src={open ? logo2 : logo} // Thay đổi logo dựa trên trạng thái open
//           alt="Logo"
//           className={`duration-300 rounded-md absolute top-[40px] ${open ? 'w-[75px] h-[43px] ' : 'w-[60px] h-[30px]'}`}
//         />
//       </div>
//       {/* Body */}
//       <ul className={`absolute top-40 flex-1 flex flex-col ${open ? 'space-y-4' : 'space-y-6'}`}>
//         {menuItems.map((item, index) => (
//           <li
//             key={index}
//             onClick={() => {
//               if (!open) setOpen(true);
//               if (item.subMenu) setExpandedSubMenuIndex(expandedSubMenuIndex === index ? null : index);
//             }}
//           >
//             <div
//               className={`px-4 py-2 rounded-md duration-300 cursor-pointer flex ${
//                 open ? 'gap-4 items-center' : 'flex-col items-center '
//               } relative group ${
//                 open
//                   ? 'hover:bg-slate-300 hover:text-orange-500 hover:border-r-8 hover:border-orange-500 w-[300px]'
//                   : 'hover:bg-red-900 hover:text-white hover:scale-105'
//               }`}
//             >
//               {/* Icon */}
//               <img
//                 src={item.icon || 'default-icon.png'}
//                 alt={item.title}
//                 className={`duration-300 ${open ? 'w-8 h-8 filter brightness-0 invert-[20%] sepia-[0%] saturate-[0%] hue-rotate-[0deg]' : 'w-7 h-7'}`}
//               />
//               {/* Title */}
//               <p className={`${open ? '' : 'hidden'} duration-500 overflow-hidden`}>{item.title}</p>
//             </div>

//             {/* Submenu */}
//             {item.subMenu && (
//               <div className={`ml-4 rounded-lg p-2 ${expandedSubMenuIndex === index ? 'block' : 'hidden'}`}>
//                 {item.subMenu.map((subItem) => (
//                   <div key={subItem.id}>
//                     <Link
//                       to={subItem.path || '#'}
//                       className="block w-full h-10 text-sm p-2 rounded-md"
//                       onClick={() => handleSubMenuClick(subItem.id, index)}
//                     >
//                       <span
//                         className={`text-sm font-sans tracking-tight transition-all ${
//                           activeSubIndex === subItem.id ? 'text-background-orange-1 ' : 'text-black hover:text-background-orange-1'
//                         }`}
//                       >
//                         {subItem.title}
//                       </span>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { MenuItem, MenuProps } from './type';
// import './style.css';
// import { menuConfig } from './menuConfig';
// const logo = require('../../assets/images/Logo.png');
// const logo2 = require('../../assets/images/logo2.png');
// const arrow = require('../../assets/icons/icon-arrow-left.png');

// const Menu: React.FC<MenuProps> = ({ role }) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [expandedSubMenuIndex, setExpandedSubMenuIndex] = useState<number | null>(null);
//   const [open, setOpen] = useState(true);
//   const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
//   const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);
//   const menuItems: MenuItem[] = menuConfig[role] || [];
//   const location = useLocation();

//   useEffect(() => {
//     if (menuItems.length > 0 && activeIndex === null) {
//       setActiveIndex(0);

//       if (menuItems[0].subMenu && menuItems[0].subMenu.length > 0) {
//         setActiveSubIndex(menuItems[0].subMenu[0].id);
//       }
//     }
//   }, [menuItems]);

//   useEffect(() => {
//     const path = location.pathname;
//     menuItems.forEach((item, index) => {
//       if (item.path === path) {
//         setActiveIndex(index);
//         setActiveParentIndex(index);
//         if (item.subMenu) {
//           item.subMenu.forEach((subItem) => {
//             if (subItem.path === path) {
//               setActiveSubIndex(subItem.id);
//             }
//           });
//         }
//       }
//     });
//   }, [location.pathname, menuItems]);

//   useEffect(() => {
//     if (!open) {
//       setExpandedSubMenuIndex(null);
//     }
//   }, [open]);

//   const handleParentMenuClick = (index: number) => {
//     if (!open) setOpen(true);
//     setActiveIndex(index);
//     setExpandedSubMenuIndex(expandedSubMenuIndex === index ? null : index);
//     setActiveParentIndex(index);

//     const currentMenuItem = menuItems[index];
//     if (currentMenuItem?.subMenu && currentMenuItem.subMenu.length > 0) {
//       setActiveSubIndex(currentMenuItem.subMenu[0].id);
//     } else {
//       setActiveSubIndex(null);
//     }
//   };

//   const handleSubMenuClick = (subIndex: number) => {
//     setActiveSubIndex(subIndex);
//   };

//   return (
//     <nav
//       className={`shadow-md h-screen p-2 flex flex-col duration-500 ${
//         open ? 'bg-background-white text-black' : 'bg-background-orange-3 text-white'
//       } ${open ? 'w-80' : 'w-20'}`}
//     >
//       {/* Header */}
//       <div className="relative px-3 py-2 h-20 flex flex-col justify-center items-center">
//         {open && (
//           <img
//             src={arrow}
//             alt="Close"
//             className="absolute top-2 right-2 w-6 h-8 text-black p-1 rounded-full cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         )}

//         {/* Logo */}

//         <img
//           src={open ? logo2 : logo}
//           alt="Logo"
//           className={`duration-300 rounded-md absolute top-[40px] ${open ? 'w-[75px] h-[43px]' : 'w-[60px] h-[30px]'}`}
//         />
//       </div>
//       {/* Body */}
//       <ul className={`absolute top-40 flex-1 flex flex-col ${open ? 'space-y-4' : 'space-y-6'}`}>
//         {menuItems.map((item, index) => (
//           <li key={index}>
//             <Link to={item?.path || '#'}>
//               <div
//                 onClick={() => handleParentMenuClick(index)}
//                 className={`px-4 py-2 rounded-md duration-300 cursor-pointer flex ${
//                   open ? 'gap-4 items-center' : 'flex-col items-center '
//                 } relative group ${
//                   open
//                     ? 'hover:bg-slate-300 hover:text-orange-500 hover:border-r-8 hover:border-orange-500 w-[300px]'
//                     : 'hover:bg-red-900 hover:text-white hover:scale-105'
//                 } ${activeParentIndex === index ? 'bg-slate-200' : ''}`} // Thêm lớp cho menu cha đang được chọn
//               >
//                 {/* Icon */}

//                 <img
//                   src={item.icon || 'default-icon.png'}
//                   alt={item.title}
//                   className={`duration-300 ${
//                     open ? 'w-8 h-8 filter brightness-0 invert-[20%] sepia-[0%] saturate-[0%] hue-rotate-[0deg]' : 'w-7 h-7'
//                   }`}
//                 />

//                 {/* Title */}
//                 <p className={`${open ? '' : 'hidden'} duration-500 overflow-hidden`}>{item.title}</p>
//               </div>
//             </Link>
//             {/* Submenu */}
//             {item.subMenu && (
//               <div className={`ml-4 rounded-lg p-2 ${expandedSubMenuIndex === index ? 'block' : 'hidden'}`}>
//                 {item.subMenu.map((subItem) => (
//                   <div key={subItem.id}>
//                     <Link
//                       to={subItem.path || '#'}
//                       className="block w-full h-10 text-sm p-2 rounded-md"
//                       // onClick={() => handleSubMenuClick(subItem.id)}
//                       onClick={handleSubMenuClick.bind(this, subItem.id)}
//                     >
//                       <span
//                         className={`text-sm font-sans tracking-tight transition-all ${
//                           activeSubIndex === subItem.id ? 'text-background-orange-1 ' : 'text-black hover:text-background-orange-1'
//                         }`}
//                       >
//                         {subItem.title}
//                       </span>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem, MenuProps } from './type';
import './style.css';
import { menuConfig } from './menuConfig';
const logo = require('../../assets/images/Logo.png');
const logo2 = require('../../assets/images/logo2.png');
const arrow = require('../../assets/icons/icon-arrow-left.png');

const Menu: React.FC<MenuProps> = ({ role }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedSubMenuIndex, setExpandedSubMenuIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
  const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);
  const menuItems: MenuItem[] = menuConfig[role] || [];
  const location = useLocation();

  useEffect(() => {
    if (menuItems.length > 0 && activeIndex === null) {
      setActiveIndex(0);

      if (menuItems[0].subMenu && menuItems[0].subMenu.length > 0) {
        setActiveSubIndex(menuItems[0].subMenu[0].id);
      }
    }
  }, [menuItems]);

  useEffect(() => {
    const path = location.pathname;
    menuItems.forEach((item, index) => {
      if (item.path === path) {
        setActiveIndex(index);
        setActiveParentIndex(index);
        if (item.subMenu) {
          item.subMenu.forEach((subItem) => {
            if (subItem.path === path) {
              setActiveSubIndex(subItem.id);
            }
          });
        }
      }
    });
  }, [location.pathname, menuItems]);

  useEffect(() => {
    if (!open) {
      setExpandedSubMenuIndex(null);
    }
  }, [open]);

  const handleParentMenuClick = (index: number) => {
    if (!open) setOpen(true);
    setActiveIndex(index);
    setExpandedSubMenuIndex(expandedSubMenuIndex === index ? null : index);
    setActiveParentIndex(index);

    const currentMenuItem = menuItems[index];
    if (currentMenuItem?.subMenu && currentMenuItem.subMenu.length > 0) {
      setActiveSubIndex(currentMenuItem.subMenu[0].id);
    } else {
      setActiveSubIndex(null);
    }
  };

  const handleSubMenuClick = (subIndex: number) => {
    setActiveSubIndex(subIndex);
  };

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col duration-100 ${open ? 'bg-background-white text-black' : 'bg-background-1 text-white'} ${
        open ? 'w-80' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="relative px-3 py-2 h-20 flex flex-col justify-center items-center">
        {open && (
          <img src={arrow} alt="Close" className="absolute top-2 right-2 w-6 h-8 text-black p-1 rounded-full cursor-pointer" onClick={toggleMenu} />
        )}

        {/* Logo */}
        <img
          src={open ? logo2 : logo}
          alt="Logo"
          className={`duration-300 rounded-md absolute top-[40px] ${open ? 'w-[75px] h-[43px]' : 'w-[60px] h-[30px]'}`}
        />
      </div>

      {/* Menu Items */}
      <ul className={`absolute top-40 flex-1 flex flex-col ${open ? 'space-y-4' : 'space-y-6'}`}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item?.path || '#'}>
              <div
                onClick={handleParentMenuClick.bind(this, index)}
                className={`px-4 py-2 rounded-md duration-300 cursor-pointer flex ${
                  open ? 'gap-4 items-center' : 'flex-col items-center '
                } relative group ${
                  open
                    ? 'hover:bg-slate-100  hover:border-r-8 hover:border-border-orange w-[300px] '
                    : 'hover:bg-amber-700 hover:text-white hover:scale-105 '
                } ${
                  activeParentIndex === index
                    ? open
                      ? 'bg-slate-200 text-orange-text border-r-8 border-border-orange w-[300px] '
                      : 'bg-amber-800'
                    : ''
                }`}
              >
                {/* Icon */}

                <img
                  src={item.icon || 'default-icon.png'}
                  alt={item.title}
                  className={`duration-300 ${
                    open ? 'w-8 h-8 filter brightness-0 invert-[20%] sepia-[0%] saturate-[0%] hue-rotate-[0deg]' : 'w-7 h-7 '
                  }`}
                />

                {/* Title */}
                <p className={`${open ? '' : 'hidden'}  overflow-hidden`}>{item.title}</p>
              </div>
            </Link>

            {/* Submenu */}
            {item.subMenu && (
              <div className={`ml-4 rounded-lg p-2 ${expandedSubMenuIndex === index ? 'block' : 'hidden'}`}>
                {item.subMenu.map((subItem) => (
                  <div key={subItem.id}>
                    <Link
                      to={subItem.path || '#'}
                      className="block w-full h-10 text-sm p-2 rounded-md"
                      onClick={handleSubMenuClick.bind(this, subItem.id)}
                    >
                      <span
                        className={`text-sm font-sans tracking-tight transition-all ${
                          activeSubIndex === subItem.id ? 'text-background-1' : 'text-black hover:text-background-1'
                        }`}
                      >
                        {subItem.title}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
