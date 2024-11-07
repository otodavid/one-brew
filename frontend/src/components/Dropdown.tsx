import { ReactNode, useEffect, useRef, useState } from 'react';

interface dropdownProps {
  trigger: string;
  menuItems: string[];
}

export default function Dropdown({ trigger, menuItems }: dropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      setIsOpen(false);
    }

    if (isOpen && e.key == 'Tab') {
      e.preventDefault();
      menuRef.current?.focus();
    }

    if (isOpen && e.key === 'ArrowDown') {
      (menuRef.current?.childNodes[0] as HTMLLIElement).focus();
    }

    if (isOpen && e.key === 'ArrowUp' && menuRef.current) {
      const lastIndex = menuRef.current?.childNodes.length - 1;
      (menuRef.current.childNodes[lastIndex] as HTMLLIElement).focus();
    }
  };

  const handleItemOnKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const firstUlChild = menuRef.current?.firstChild as HTMLLIElement;
    const lastUlChild = menuRef.current?.lastChild as HTMLLIElement;

    console.log(firstUlChild);
    if (e.key === 'ArrowDown' && isOpen && e.currentTarget !== lastUlChild) {
      e.preventDefault();
      (e.currentTarget?.nextSibling as HTMLLIElement).focus();
    } else if (
      e.key === 'ArrowUp' &&
      isOpen &&
      e.currentTarget !== firstUlChild
    ) {
      e.preventDefault;
      (e.currentTarget?.previousSibling as HTMLLIElement).focus();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button onClick={handleDropdown} onKeyDown={(e) => handleKeyDown}>
        {trigger}
      </button>

      {isOpen && (
        <ul ref={menuRef}>
          {menuItems.map((item, id) => (
            <li
              key={id}
              tabIndex={isOpen ? 0 : -1}
              onKeyDown={(e) => handleItemOnKeyDown(e)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
