import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
  tabIndex?: number;
  backgroundColor?: string;
  type?: 'button' | 'submit' | 'reset'; 
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  tabIndex = 0,
  backgroundColor,
  type = 'button',  
}) => {
  const buttonClass = `${styles.button} ${
    variant === 'primary' ? styles.primary : ''
  } ${variant === 'secondary' ? styles.secondary : ''} ${
    variant === 'danger' ? styles.danger : ''
  } ${fullWidth ? styles.fullWidth : ''}`;

  return (
    <button
      className={buttonClass}
      style={{ backgroundColor: backgroundColor || undefined }}
      onClick={onClick}
      disabled={disabled}
      tabIndex={tabIndex}
      type={type} 
    >
      {children}
    </button>
  );
};

export default Button;
