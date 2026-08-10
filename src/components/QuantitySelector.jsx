import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantitySelector = ({ quantity = 1, onQuantityChange, min = 1, max = 99 }) => {
  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value >= min && value <= max) {
        onQuantityChange(value);
      } else if (value < min) {
        onQuantityChange(min);
      } else if (value > max) {
        onQuantityChange(max);
      }
    }
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-12 text-center text-sm font-medium border-x border-gray-200 py-2 focus:outline-none appearance-none hide-arrows"
        aria-label="Quantity"
      />
      
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
