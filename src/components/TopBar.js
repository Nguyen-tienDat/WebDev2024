// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Home, Film, Heart, User } from 'lucide-react';

// const TopBar = () => {
//   const { scrollY } = useScroll();
  
//   const backgroundColor = useTransform(
//     scrollY,
//     [0, 50],
//     ['rgba(31, 41, 55, 0)', 'rgba(31, 41, 55, 0.9)']
//   );

//   const textColor = useTransform(
//     scrollY,
//     [0, 50],
//     ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.8)']
//   );

//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
//       style={{ backgroundColor }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex justify-between items-center">
//           <motion.h1 
//             className="text-2xl font-bold"
//             style={{ color: textColor }}
//           >
//             MovieMaster
//           </motion.h1>
//           <nav>
//             <motion.ul className="flex space-x-6" style={{ color: textColor }}>
//               {['Home', 'Movies', 'Favorites', 'Profile'].map((item, index) => (
//                 <motion.li key={item}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <button className="flex items-center">
//                     {index === 0 && <Home size={18} className="mr-1" />}
//                     {index === 1 && <Film size={18} className="mr-1" />}
//                     {index === 2 && <Heart size={18} className="mr-1" />}
//                     {index === 3 && <User size={18} className="mr-1" />}
//                     {item}
//                   </button>
//                 </motion.li>
//               ))}
//             </motion.ul>
//           </nav>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TopBar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Film, Heart, User, LogOut } from 'lucide-react';
import { auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const TopBar = ({ user }) => {
  const { scrollY } = useScroll();
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 20],
    isHomePage ? ['rgba(31, 41, 55, 0)', 'rgba(31, 41, 55, 0.9)'] : ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.0)']
  );
  
  const textColor = useTransform(
    scrollY,
    [0, 20],
    isHomePage ? ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.8)'] : ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.0)']
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold"
            style={{ color: textColor }}
            whileHover={{ scale: 1.5}} 
            whileTap={{ scale: 0.95}}
          >
            <Link to="/">MovieMaster</Link>
          </motion.h1>
          <nav>
            <motion.ul className="flex space-x-6" style={{ color: textColor }}>
              <NavItem to="/" icon={<Home size={18} />} text="Home" />
              <NavItem to="/movies" icon={<Film size={18} />} text="Movies" />
              <NavItem to="/favorites" icon={<Heart size={18} />} text="Favorites" />
              {currentUser ? (
                <div className="relative ">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDropdown(!showDropdown)}
                      className=" focus:outline-none"
                    >
                      <User size={18} className="mr-1 inline-block" />
                      Hello, {currentUser.email}
                  </motion.button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link 
                        to="/favorites" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Favorites
                      </Link>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                      </motion.button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="mx-2"><User size={18} className="mr-1 inline-block" />Login</Link>
              )}
            </motion.ul>
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

const NavItem = ({ to, icon, text }) => (
  <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link to={to} className="flex items-center">
      {icon}
      <span className="ml-1">{text}</span>
    </Link>
  </motion.li>
);

export default TopBar;

