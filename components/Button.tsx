import React from 'react'
import { IconType } from 'react-icons';

interface IButton {
  label: string,
  onClick:(e:React.MouseEvent) => void;
  icon?:IconType;
  outline?:boolean;
  disabled?:boolean;
}

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
        relative
        w-full
        rounded-sm
        py-2
        hover:opacity-80
        transition
        disabled:opacity-20
        disabled:cursor-not-allowed
        ${outline ? 'bg-white': 'bg-rose-500'}
    `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  )
}

export default Button