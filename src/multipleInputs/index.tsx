import { useState, useRef } from 'react';

import './index.scss';

export const MultipleInputs = ({ cellNum = 6 }: { cellNum?: number }) => {
  const [cells, setCells] = useState(Array(cellNum).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  console.log('RERENDER FEW INPUTS');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, ind: number) {
    console.log('change')
    const updatedCells = [...cells];
    updatedCells[ind] = e.target.value;
    setCells(updatedCells);

    if (e.target.value && ind < cellNum - 1) {
      inputRefs.current[ind + 1]?.focus();
    }
  }

  const handleKeyDown = (e : React.KeyboardEvent, index: number) => {
    console.log(e.key, index, cells[index])
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (cells[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const updatedCells = [...cells];
        updatedCells.splice(index, 1);
        updatedCells.push('');;
        setCells(updatedCells);
      }
    }
  };

  return (
    <div className='otp'>
      <h1 className='otp__header'>One time password</h1>
      <p className='otp__info'>Your number of cells are {cellNum}</p>
      <div className='otp__cells'>
        {cells.map((_, ind) => (
          <div key={ind} className='otp__cell-wrapper'>
            <input
              key={ind}
              className='otp__cell'
              type='text'
              style={{}}
              maxLength={1}
              value={cells[ind]}
              onChange={(e) => handleChange(e, ind)}
              onKeyDown={(e) => handleKeyDown(e, ind)}
              ref={(el) => (inputRefs.current[ind] = el!)} // Assign refs dynamically
            />
          </div>
        ))}
      </div>
    </div>
  );
};
