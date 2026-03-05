import React, { useState, useRef, useEffect } from 'react';
import { FiCheck, FiChevronDown, FiLoader, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const StatusDropdown = ({ value, onChange, disabled = false, isUpdating = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statusOptions = [
        {
            value: 'pending',
            label: 'Pending',
            color: 'yellow',
            icon: FiClock,
            gradient: 'from-yellow-400 to-amber-500'
        },
        {
            value: 'approved',
            label: 'Approved',
            color: 'green',
            icon: FiCheckCircle,
            gradient: 'from-green-400 to-emerald-500'
        },
        {
            value: 'rejected',
            label: 'Rejected',
            color: 'red',
            icon: FiXCircle,
            gradient: 'from-red-400 to-rose-500'
        },
    ];

    const currentStatus = statusOptions.find(opt => opt.value === value) || statusOptions[0];
    const StatusIcon = currentStatus.icon;

    const getColorClasses = (color, isButton = false) => {
        const colors = {
            yellow: {
                bg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
                text: 'text-yellow-800',
                border: 'border-yellow-300',
                hover: 'hover:from-yellow-100 hover:to-amber-100',
                ring: 'focus:ring-yellow-500/30',
                shadow: 'shadow-yellow-100',
            },
            green: {
                bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
                text: 'text-green-800',
                border: 'border-green-300',
                hover: 'hover:from-green-100 hover:to-emerald-100',
                ring: 'focus:ring-green-500/30',
                shadow: 'shadow-green-100',
            },
            red: {
                bg: 'bg-gradient-to-r from-red-50 to-rose-50',
                text: 'text-red-800',
                border: 'border-red-300',
                hover: 'hover:from-red-100 hover:to-rose-100',
                ring: 'focus:ring-red-500/30',
                shadow: 'shadow-red-100',
            },
        };

        if (isButton) {
            return `${colors[color].bg} ${colors[color].text} ${colors[color].border} ${colors[color].hover}`;
        }
        return `${colors[color].bg} ${colors[color].text} ${colors[color].border} ${colors[color].hover} ${colors[color].ring} ${colors[color].shadow}`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (newValue) => {
        if (newValue !== value && !disabled && !isUpdating) {
            onChange({ target: { value: newValue } });
            setIsOpen(false);
        }
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => !disabled && !isUpdating && setIsOpen(!isOpen)}
                disabled={disabled || isUpdating}
                className={`
          relative flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full text-xs font-semibold border
          transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
          shadow-sm hover:shadow-md
          ${getColorClasses(currentStatus.color)}
          ${isOpen ? 'scale-105 shadow-md' : ''}
        `}
            >
                <div className="flex items-center gap-1.5">
                    {isUpdating ? (
                        <FiLoader className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <StatusIcon className="w-3.5 h-3.5" />
                    )}
                    <span className="tracking-wide">{currentStatus.label}</span>
                </div>
                <FiChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && !disabled && !isUpdating && (
                <div className="absolute z-50 mt-2 w-40 rounded-xl bg-white shadow-xl border border-gray-200 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {statusOptions.map((option, index) => {
                        const OptionIcon = option.icon;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`
                  w-full px-3 py-2.5 text-left text-sm font-medium
                  transition-all duration-200 ease-out
                  flex items-center justify-between gap-2
                  relative overflow-hidden group
                  ${getColorClasses(option.color, true)}
                  ${value === option.value ? 'font-bold shadow-inner' : 'hover:shadow-sm'}
                  ${index !== 0 ? 'border-t border-gray-100' : ''}
                `}
                            >
                                {/* Gradient accent bar for selected item */}
                                {value === option.value && (
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${option.gradient}`} />
                                )}

                                <div className="flex items-center gap-2 ml-1">
                                    <OptionIcon className={`w-4 h-4 ${value === option.value ? 'animate-pulse' : ''}`} />
                                    <span>{option.label}</span>
                                </div>

                                {value === option.value && (
                                    <FiCheck className="w-4 h-4 animate-in zoom-in duration-200" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StatusDropdown;
