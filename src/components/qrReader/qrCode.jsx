import { useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import { useNavigate } from "react-router-dom";

export const QrView = () => {
  const [data, setData] = useState('');
  const [turn, setTurn] = useState(true);
  const navigate = useNavigate();
  const [qrStorage, setQrStorage] = useState([]);

  useEffect(() => {
    const exist = localStorage.getItem('codes');
    const qr = exist ? exist.split(',') : [];
    setQrStorage(JSON.parse(qr));
  }, [setQrStorage]);

  const handleResult = (result, error) => {
    if (!!result) {
      setData(result?.text);
    };
    if (!!error) {
      console.info(error);
    };
  };

  const handleSaveData = async () => {
    const updated = [...qrStorage, data]
    setQrStorage(updated);
    setData('');
    localStorage.setItem('codes', JSON.stringify(updated));
    alert('Se ha añadido correctamente. ');
  };

  return (
    <div className='w-screen bg-white min-h-screen flex flex-col justify-center items-center gap-5'>
      <span className='py-1 font-semibold text-2xl'>Lector QR</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input onInput={() => setTurn(!turn)} type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 dark:peer-focus:ring-green-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{!turn ? 'Apagar el scanner' : 'Encender el scanner'}</span>
      </label>
      {
        !turn ? (
          <div className='container flex flex-row justify-center w-full'>
            <QrReader
              onResult={(result, error) => handleResult(result, error)}
              className='w-2/6'
              scanDelay={1000}
            />
          </div>
        ) : (
          <div className='w-2/6 h-4/6 border-2 border-dashed border-red-300 text-4xl p-16 gap-8'>
            Por favor, enciende el scanner.
          </div>
        )
      }
      <div className='flex flex-row justify-center gap-5'>
        <button className='text-blue-600 hover:text-blue-200 underline' onClick={() => navigate('/generador')}>¿No tienes un codigo? genera uno</button>
      </div>
      <div className='flex flex-row justify-center gap-5'>
        <button disabled={!data} onClick={handleSaveData} className='rounded-md bg-green-400 px-6 py-2 hover:bg-green-200 hover:text-black text-white text-lg disabled:bg-gray-300 disabled:text-white'>Guardar resultado</button>
        <button onClick={() => navigate("/listado")} className='rounded-md  px-6 py-2 hover:bg-green-200 hover:text-black text-black text-lg border-2 border-green-400'>Ir a la lista</button>
      </div>
      <div className='flex flex-row justify-center w-full'>
        <span className='py-3 px-5 font-semibold text-base text-ellipsis w-full'>Actual: <span className='text-green-400 pl-2'> {data} </span></span>
      </div>
    </div>
  );
}
