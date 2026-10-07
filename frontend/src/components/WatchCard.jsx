import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function WatchCard({ watch }) {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col border border-zinc-800 hover:border-yellow-500/50">
            <Link to={`/product/${watch.id}`} className="overflow-hidden relative block">
                <img 
                    src={watch.image_url} 
                    alt={watch.name} 
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-yellow-500 border border-yellow-500/30 shadow-md">
                    {watch.brand}
                </div>
            </Link>
            
            <div className="p-6 flex flex-col flex-grow relative">
                <Link to={`/product/${watch.id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 hover:text-yellow-500 transition">{watch.name}</h3>
                </Link>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{watch.description}</p>
                
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-zinc-800">
                    <span className="text-2xl font-black text-white">${watch.price}</span>
                    <button 
                        onClick={() => addToCart(watch)}
                        className="bg-yellow-500 text-black px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-300 cursor-pointer shadow-[0_5px_15px_rgba(234,179,8,0.15)] hover:-translate-y-0.5"
                    >
                        أضف للسلة
                    </button>
                </div>
            </div>
        </div>
    );
}