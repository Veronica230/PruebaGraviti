import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const List = () => {
  const [qrs, setQrs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const exist = localStorage.getItem('codes');
    const qr = exist ? exist.split(',') : [];
    setQrs(JSON.parse(qr));
  }, [])
  return (
    <div className='min-w-full bg-white min-h-screen flex flex-col items-center'>
      <div className='flex flex-row justify-between gap-5 items-center w-full p-5'>
        <span className='py-1 font-semibold text-2xl'>Lista de valores guardados</span>
        <button onClick={() => navigate('/')} className='rounded-md bg-green-400 px-6 py-2 hover:bg-green-200 hover:text-black text-white text-lg disabled:bg-gray-300 disabled:text-white'>Ir al scanner</button>
      </div>
      <div className='container justify-center w-full pt-14'>
        <ul>
          {
            qrs?.map((item, index) => (
              <li className='list-disc w-full font-light p-2' key={`${item}-${index + 1}`}>{item}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}