'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useId, useState } from 'react';

import * as styles from './Tabs.css.js';

export function Tabs({ items, defaultKey, activeKey, position = 'bottom', children, className }) {
  const [currentKey, setCurrentKey] = useState(defaultKey ?? items?.[0]?.key);
  const selectedKey = activeKey ?? currentKey;
  const baseId = useId();

  const isLinkTabs = items?.some((item) => item.href);

  if (isLinkTabs) {
    return (
      <nav
        className={clsx(styles.nav, position === 'top' && styles.navTop, className)}
        aria-label="탭"
      >
        {items.map((item) => {
          const isActive = item.key === selectedKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={isActive ? styles.activeTab : styles.tab}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  const panels = Array.isArray(children) ? children : [children];

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

    event.preventDefault();
    const index = items.findIndex((item) => item.key === selectedKey);
    const nextIndex =
      event.key === 'ArrowRight'
        ? (index + 1) % items.length
        : (index - 1 + items.length) % items.length;

    setCurrentKey(items[nextIndex].key);
    document.getElementById(`${baseId}-tab-${items[nextIndex].key}`)?.focus();
  };

  return (
    <div className={clsx(styles.wrap, className)}>
      <div role="tablist" className={styles.tablist} aria-label="탭" onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const isActive = item.key === selectedKey;

          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.key}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.key}`}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? styles.activeTab : styles.tab}
              onClick={() => setCurrentKey(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.key}
          role="tabpanel"
          id={`${baseId}-panel-${item.key}`}
          aria-labelledby={`${baseId}-tab-${item.key}`}
          hidden={item.key !== selectedKey}
        >
          {panels[index]}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
