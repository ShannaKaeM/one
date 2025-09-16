import React from 'react';

/**
 * ONE - The Universal Component
 * 
 * Can be anything:
 * - A button (onClick)
 * - A container (children or data)
 * - An icon (icon prop)
 * - A text element (text prop)
 * - Whatever the theme defines
 */

interface ONEProps {
  // Content
  children?: React.ReactNode;
  text?: string;
  icon?: string;
  
  // Behavior
  onClick?: () => void;
  
  // Data-driven
  data?: any[];
  itemComponent?: string;
  renderItem?: (item: any, index: number) => React.ReactNode;
  
  // State
  active?: boolean;
  disabled?: boolean;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Any other props from theme
  [key: string]: any;
}

export const ONE: React.FC<ONEProps> = ({
  children,
  text,
  icon,
  onClick,
  data,
  itemComponent,
  renderItem,
  active,
  disabled,
  className = '',
  style,
  ...props
}) => {
  // Determine what type of element to render
  const Element = onClick && !disabled ? 'button' : 'div';
  
  // Build class names
  const classes = [
    'one',
    className,
    active && 'active',
    disabled && 'disabled'
  ].filter(Boolean).join(' ');
  
  // Handle data iteration (container mode)
  if (data && Array.isArray(data)) {
    return (
      <Element 
        className={classes}
        style={style}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {data.map((item, index) => {
          // Use custom render function if provided
          if (renderItem) {
            return renderItem(item, index);
          }
          
          // Otherwise render children with item data
          if (children) {
            return React.cloneElement(children as React.ReactElement, {
              key: item.id || index,
              data: item,
              index
            });
          }
          
          // Default: render item as text
          return (
            <div key={item.id || index} className="one-item">
              {item.icon && <span className="one-icon">{item.icon}</span>}
              {item.label && <span className="one-label">{item.label}</span>}
            </div>
          );
        })}
      </Element>
    );
  }
  
  // Single element mode
  return (
    <Element
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="one-icon">{icon}</span>}
      {text && <span className="one-text">{text}</span>}
      {children}
    </Element>
  );
};