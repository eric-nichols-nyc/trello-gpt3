import React from 'react'
import { IconType } from 'react-icons';

interface IButton {
  label: string,
  onClick?:(e:React.MouseEvent) => void;
  icon?:IconType;
  outline?:boolean;
  disabled?:boolean;
}
// Reusalbe button component
const Button = ({
  label,
  outline,
  onClick,
  icon:Icon,
  disabled
}:IButton) => {
  return (
    <button 
    disabled={disabled}
      onClick={onClick}
      className={`
        button
        ${outline ? 'bg-white': 'bg-rose-500'}
    `}
    >
      {Icon && (
        <Icon
          size={20}
          className="button_icon"
        />
      )}
      {label}
    </button>
  )
}

export default Button