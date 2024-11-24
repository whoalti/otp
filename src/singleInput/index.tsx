import { useState, useRef, useEffect, useMemo } from 'react';
import './index.scss';

const generateOTP = (cellNum : number) => {
  const min = Math.pow(10, cellNum - 1);
  const max = Math.pow(10, cellNum) - 1;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp.toString();
};

export const SingleInput = ({ cellNum = 6 }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const generatedOTP = useMemo(() => generateOTP(cellNum), [cellNum]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef(null);
  const indRef = useRef(2);
  useEffect(() => {
    inputRef.current?.focus();
    console.log('effect', indRef.current)
    console.log(generatedOTP);
  }, [indRef.current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, cellNum);
    setOtp(value);
    if (value.length === cellNum) {
      setError('');
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, cellNum);
    setOtp(pasteData);
    if (pasteData.length === cellNum) {
      setError('');
    }
  };

  const renderCells = () => {
    const digits = otp.split('');
    const cells = [];
    for (let i = 0; i < cellNum; i++) {
      const isActive = i === digits.length;
      cells.push(
        <div key={i} className='otp__cell-wrapper'>
          <div className={`otp__cell ${isActive ? 'active' : ''}`}>
            {digits[i] || ''}
          </div>
        </div>
      );
    }
    return cells;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const navigationKeys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Tab',
    ];
  
    if (navigationKeys.includes(e.key)) {
      e.preventDefault(); 
    }

    if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
      e.preventDefault();
    }
    
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === cellNum) {
      console.log('Submitted OTP:', otp);
      if (otp === generatedOTP){
        console.log(`${otp} == ${generatedOTP}`)
      }
    } else {
      setError(`Please enter a ${cellNum}-digit OTP.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='otp'>
      <h1 className='otp__header'>One Time Password</h1>
      <p className='otp__info'>Please enter the {cellNum}-digit OTP sent to you.</p>
      <div
        className='otp__cells'
        onClick={handleClick}
        onPaste={handlePaste}
        ref={containerRef}
        role='group'
        aria-label='One Time Password input'
      >
        {renderCells()}
        <input
          ref={inputRef}
          type='text'
          value={otp}
          onChange={handleChange}
          className='otp__hidden-input'
          inputMode='numeric'
          pattern='\d*'
          autoFocus
          aria-hidden='true'
          aria-label='OTP Input'
          onCopy={(e) => e.preventDefault()}
          onKeyDown={(e) => handleKeyDown(e)}
          onDragStart={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          
        />
      </div>
      {error && <p className='otp__error'>{error}</p>}
      <button type='submit' className='otp__submit-button'>Submit</button>
    </form>
  );
};
