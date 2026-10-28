import { useState, useEffect } from 'react';

type Product = {
  id: number; name: string; price: number; mrp: number;
  category: string; fabric: string; size: string[]; stock: number; rating: number; reviews: number; image: string;
}

const PRODUCTS: Product[] = [
  {id:1, name:"Classic White Formal Shirt", price:899, mrp:1499, category:"Shirts", fabric:"Cotton", size:["M","L","XL"], stock:12, rating:4.5, reviews:124, image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"},
  {id:2, name:"Denim Blue Jeans Slim Fit", price:1299, mrp:2199, category:"Jeans", fabric:"Denim", size:["30","32","34"], stock:3, rating:4.6, reviews:89, image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"},
  {id:3, name:"Black Party Wear Shirt", price:1099, mrp:1899, category:"Shirts", fabric:"Cotton Blend", size:["M","L"], stock:20, rating:4.4, reviews:210, image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"},
  {id:4, name:"Olive Cargo Pants", price:1399, mrp:2299, category:"Trousers", fabric:"Cotton", size:["30","32","34","36"], stock:2, rating:4.7, reviews:56, image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
  {id:5, name:"Navy Blue T-Shirt", price:499, mrp:899, category:"T-Shirts", fabric:"Cotton", size:["M","L","XL"], stock:25, rating:4.3, reviews:340, image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
  {id:6, name:"White Kurta Pajama", price:1599, mrp:2599, category:"Ethnic", fabric:"Cotton", size:["M","L","XL"], stock:8, rating:4.8, reviews:42, image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400"},
  {id:7, name:"Grey Formal Trouser", price:1199, mrp:1999, category:"Trousers", fabric:"Polyester", size:["32","34"], stock:15, rating:4.5, reviews:98, image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
  {id:8, name:"Checked Casual Shirt", price:799, mrp:1299, category:"Shirts", fabric:"Cotton", size:["L","XL"], stock:4, rating:4.2, reviews:167, image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"},
];

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>(()=>{
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("All");
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(()=>{ localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(()=>{ document.title="Somaiya Mens Wear - Wishlist + Rating Added"; },[]);

  const filtered = PRODUCTS.filter(p => 
    (filter==="All" || p.category===filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (p: Product) => {
    setCart([...cart, p]);
    alert(`${p.name} Added to Cart!`);
  };
  
  const toggleWishlist = (id: number) => {
    setWishlist(w => w.includes(id) ? w.filter(i=>i!==id) : [...w, id]);
  }

  const placeOrder = (type: string) => {
    if(cart.length===0) return alert("Cart Empty!");
    const total = cart.reduce((s,p)=>s+p.price,0);
    alert(`✅ Order Placed! \nType: ${type} \nItems: ${cart.length} \nTotal: ₹${total} \n\nInvoice: SOMAIYA-${Date.now()} \nThank You! Visit Bhandup Store.`);
    setCart([]);
  }

  const stars = (rating: number) => "⭐".repeat(Math.floor(rating)) + (rating%1>=0.5 ? "½" : "");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-black text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
        <h1 className="font-bold text-[15px] leading-tight">SOMAIYA <span className="text-yellow-400">MENS WEAR</span><span className="text-[9px] block font-normal">BHANDUP - SINCE 1995 | ONLY MENS</span></h1>
        <div className="flex gap-3 items-center text-[12px]">
          <span className="bg-white text-black px-2 py-1 rounded-full">❤️ {wishlist.length} Wishlist</span>
          <span className="bg-yellow-400 text-black px-2 py-1 rounded-full">🛒 {cart.length}</span>
          <button onClick={()=>setShowAdmin(!showAdmin)} className="border border-white px-2 py-1 rounded-full text-[10px]">Admin</button>
        </div>
      </header>

      <div className="bg-white p-2 m-3 rounded-2xl grid grid-cols-4 text-center text-[10px] shadow-sm">
        <div><b className="block text-sm">114+</b>Products</div>
        <div><b className="block text-sm">COD</b>Available</div>
        <div><b className="block text-sm">Since 1995</b>Bhandup</div>
        <div><b className="block text-sm">4.7⭐</b>Rated</div>
      </div>

      <div className="p-3">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search shirts, jeans..." className="w-full p-3 rounded-full border shadow-sm text-sm"/>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {["All","Shirts","Jeans","T-Shirts","Trousers","Ethnic"].map(c=>(
            <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap ${filter===c?'bg-black text-white':'bg-white border'}`}>{c}</button>
          ))}
        </div>
      </div>

      {showAdmin && (
        <div className="m-3 bg-yellow-50 border border-yellow-200 p-3 rounded-xl">
          <h2 className="font-bold text-sm">Admin - Inventory & Wishlist Report</h2>
          <p className="text-[11px]">Total Wishlist Items: {wishlist.length}</p>
          <div className="mt-2 text-xs">
            {PRODUCTS.filter(p=>p.stock<5).map(p=>(
              <div key={p.id} className="flex justify-between bg-white p-2 rounded mb-1"><span>{p.name}</span><span className="text-red-500 font-bold">Stock: {p.stock} ⚠️ Low</span></div>
            ))}
          </div>
          <a href="/admin.html" className="text-[11px] text-blue-600 underline">Go to Full Admin Portal (admin.html)</a>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 p-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="relative">
              <img src={p.image} className="h-40 w-full object-cover"/>
              {p.stock<5 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] px-2 py-1 rounded-full">Only {p.stock} Left!</span>}
              <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-2 py-1 rounded-full">{p.fabric}</span>
              <button onClick={()=>toggleWishlist(p.id)} className={`absolute bottom-2 right-2 rounded-full w-8 h-8 flex items-center justify-center shadow ${wishlist.includes(p.id)?'bg-red-500 text-white':'bg-white'}`}>{wishlist.includes(p.id)?'❤️':'🤍'}</button>
            </div>
            <div className="p-2.5">
              <p className="text-[11px] font-semibold line-clamp-2 h-7">{p.name}</p>
              <p className="text-[10px] text-gray-500">{p.category} • Size {p.size.join("/")}</p>
              
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                  <span className="text-[11px]">{stars(p.rating)}</span>
                  <span className="text-[10px] font-bold">{p.rating}</span>
                </div>
                <span className="text-[9px] text-gray-400">({p.reviews} reviews)</span>
              </div>

              <div className="flex gap-2 items-center mt-1">
                <span className="font-bold text-[13px]">₹{p.price}</span>
                <span className="text-[10px] line-through text-gray-400">₹{p.mrp}</span>
                <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{Math.round((1-p.price/p.mrp)*100)}% OFF</span>
              </div>
              <button onClick={()=>addToCart(p)} className="w-full mt-2 bg-black text-white text-[11px] py-2 rounded-full font-medium">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {cart.length>0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 z-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold">{cart.length} items • ₹{cart.reduce((s,p)=>s+p.price,0)}</span>
            <span className="text-[10px] text-gray-500">Free Delivery - Bhandup</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={()=>placeOrder("COD - Bhandup Store")} className="bg-black text-white py-2.5 rounded-full text-xs font-bold">COD Order 📦</button>
            <button onClick={()=>placeOrder("UPI Demo Payment")} className="bg-yellow-400 text-black py-2.5 rounded-full text-xs font-bold">Pay (Demo) - ₹{cart.reduce((s,p)=>s+p.price,0)} 💳</button>
          </div>
          <p className="text-[9px] text-center text-gray-400 mt-2">Payment Demo Mode - Real Razorpay will be added in Major Project</p>
        </div>
      )}

      <div className="h-32"></div>
      <div className="p-6 text-center text-[10px] text-gray-400">
        Somaiya Mens Wear - Bhandup West, Mumbai - Only Mens Collection<br/>Wishlist + Rating Added | Submission Ready 2026
      </div>
    </div>
  )
}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return <div></div>;
}
