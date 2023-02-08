import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

export const QrGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function isValidUrl(string) {
    try {
      new URL(string);
      return false;
    } catch (err) {
      return true;
    }
  }

  const handleInput = (e) => {
    const text = e.target.value;
    setError(isValidUrl(text));
    setInputValue(text);
  };

  return (
    <div className='w-screen bg-white min-h-screen flex flex-col justify-center items-center  gap-5'>
      <div className='flex flex-row justify-between gap-5 items-center w-full p-5'>
        <span className='py-1 font-semibold text-2xl'>Generador QR (solo urls)</span>
        <button onClick={() => navigate('/')} className='rounded-md bg-green-400 px-6 py-2 hover:bg-green-200 hover:text-black text-white text-lg disabled:bg-gray-300 disabled:text-white'>Ir al scanner</button>
      </div>
      <span>Ahora solo captura el codigo con tu camara de un dispositivo movil o toma una captura de pantalla.</span>
      <div className='h-auto m-auto max-w-xs w-full'>
        <QRCode
          size={700}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputValue}
          viewBox={`0 0 256 256`}
        />
        <div className='w-full flex-col flex py-5'>
          <input
            className='focus:bg-green-100 border-2 border-green-400 focus:border-green-600 rounded-sm h-10 p-3 w-full'
            placeholder='Ingresa un valor'
            onInput={handleInput}
            value={inputValue} />
          {
            error && inputValue.length > 0 && <span className='text-red-500 p-2'> No es un valor valido. por favor ingresa una url</span>
          }
        </div>
      </div>
    </div>
  )
};
