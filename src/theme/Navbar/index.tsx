import React from 'react';
import { useThemeConfig, useColorMode } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

function Navbar(): JSX.Element {
  const {
    navbar: { items },
  } = useThemeConfig();

  const { colorMode, setColorMode } = useColorMode();
  useNavbarMobileSidebar(); // keep for proper mobile behavior

  // ❌ Remove GitHub link from navbar items
  const filteredItems = items.filter(
    (item) =>
      !(
        typeof item === 'object' &&
        'href' in item &&
        typeof item.href === 'string' &&
        item.href.includes('github.com')
      )
  );

  const [leftItems, rightItems] = splitNavbarItems(filteredItems);

  const toggleTheme = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <NavbarMobileSidebarToggle />
        <NavbarLogo />

        <ul className="navbar__items">
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </ul>

        <ul className="navbar__items navbar__items--right">
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}

          {/* Theme Toggle */}
          <li className="navbar__item">
            <button
              className="button button--secondary button--sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {colorMode === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>

          <NavbarSearch />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
