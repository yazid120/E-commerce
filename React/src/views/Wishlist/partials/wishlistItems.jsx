import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";

const WishlistItem = ()=>{
  const image_path_uri = '../src/assets/images/Products/';
  const [WishItem, setWishItems] = useState([]);

  const deleteItemWishlist = (itemId) => {
    axios.delete(`http://127.0.0.1:8000/api/wishlist/items/delete/${itemId}`)
      .then((response) => {
        setWishItems(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Delete failed!!', error);
      });
  };


  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:8000/api/wishlist/items/index`)
        .then((response) => {
          setWishItems(response.data);
        })
        .catch((error) => {
          console.error('Connection failed!!', error);
        });
    } catch (error) {
      // error failed api connection
      console.error('Connection failed !!');
    }
  }, []);

  return(
    <>
    {Array.isArray(WishItem) && WishItem.length > 0 ? (
    WishItem.map((item) => (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={item.id}>
      <div className="w-28">
        <img src={image_path_uri + item.image} alt="product 6" className="w-full" />
      </div>
      <div className="w-1/3">
        <h2 className="text-gray-800 text-xl font-medium uppercase">
          {item.name}
        </h2>
        <p className="text-gray-500 text-sm">
          Availability: <span className="text-green-600">In Stock</span>
        </p>
      </div>
      <div className="text-primary text-lg font-semibold">{item.price_unit} $</div>
      <a href="#" className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
        add to cart
      </a>

      {/* delete item from wishlist button */}
      <div className="text-2xl text-red-500 cursor-pointer hover:bg-grey" onClick={() => deleteItemWishlist(item.id)}>
        <BsTrash />
      </div>

      <div className="text-gray-600 cursor-pointer hover:text-primary">
        <i className="fa-solid fa-trash" />
      </div>
    </div>
  ))
  ) : (
  <div className="text-gray-800 rounded p-4 bg-gray-100">No item added to wishlist</div>
  )}
    </>
  )
}
export default WishlistItem;
