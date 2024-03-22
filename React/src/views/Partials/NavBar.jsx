import React from "react";
import {VscAccount} from "react-icons/vsc";
import {BsBagPlusFill} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import { useState } from "react";


let logout = function(){
    sessionStorage.clear('user_id');
    document.cookie = 'Ecommerce_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirect to home page
    location.replace('/');
}

let NavBar = function(){
  const [WishlistItems, setWishlistItems] = useState([]);
  const userAuth  = document.cookie.split('; ').find(row => row.startsWith('Ecommerce_access_token='));

  const GetWishlistItems = function(){
    useEffect(() => {
      try {
        axios.get(`http://127.0.0.1:8000/api/wishlist/items/index`)
          .then((response) => {
            setWishlistItems(response.data);
          })
          .catch((error) => {
            console.error('Connection failed!!', error);
          });
      } catch (error) {
        // error failed api connection
        console.error('Connection failed !!');
      }
    }, []);
  }
  const mystyle={width:'auto', gap:'1rem'}
  return(
  <>
    <nav className="bg-gray-800">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white">Logo</a>
          </div>
          <div style={mystyle} className="navigation_items">
              <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="/services" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4" style={mystyle}>

        <div className="flex items-center space-x-4 gap-4">
        {/* Cart item */}
        <a href="/cart" className="item_ice text-center text-gray-700 hover:text-primary transition relative">
          <div className="text-2xl">
            <BsBagPlusFill className="fa-solid fa-bag-shopping" />
          </div>
          <div className="item_ice_text text-xs leading-3">Cart</div>
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center
          justify-center bg-primary text-white text-xs">
            2
          </div>
        </a>
        {/* wishlist item */}
        <a href="/wishlist" className="item_ice text-center text-gray-700 hover:text-primary transition relative">
          <div className="text-2xl">
            <AiOutlineHeart className="fa-regular fa-heart" />
          </div>
          <div className="item_ice_text text-xs leading-3">Wishlist</div>
            <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center
            bg-red-500 text-white text-xs">
              {WishlistItems.length}
            </div>
        </a>
        {/* account item */}
        {userAuth ?
          <a href="/profile" className="item_ice text-center text-gray-700 hover:text-primary transition relative">
          <div className="text-2xl">
            <VscAccount className="fa-regular fa-heart" />
          </div>
          <div className="item_ice_text text-xs leading-3">account</div>
        </a>
        :<></>
        }
        </div>

            <div>
            {!userAuth ?
            <>
              <a href="/SignUp" className="text-gray-300 hover:bg-gray-700
              hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signup</a>
              <a href="/login" className="text-gray-300 hover:bg-gray-700
               hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
            </>
               :
            <>
             <a onClick={logout} className="logout text-gray-300 hover:bg-gray-700 cursor-pointer
               hover:text-white px-3 py-2 rounded-md text-sm font-medium">logout</a>
            </>
            }
            </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </>
  )
}

export default NavBar
