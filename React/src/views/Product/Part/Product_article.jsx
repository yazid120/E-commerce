import React, { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import {AiFillHeart} from "react-icons/ai";
import {BsCartPlusFill} from "react-icons/bs";
import SubHeader from "../components/SubHeader";
import DescriptionProducts from "../components/Description_Product";
import SpecificationsProducts from "../components/Specifications_Product";
import RelatedProducts from "../components/Related_Product";
import RatingsReviews from "../components/Ratings&Reviews";
import ProductInfos from "../components/sub-components/ProductInfos";


function GetProductArticle(link_api,SetproductID){
  useEffect(()=>{
    axios.get(link_api).then(response=>{
    SetproductID(response.data);
    })
  },[])
}

function ProductArticle(){
  const navigate  = useNavigate ();
  const {id} = useParams();
  const [ProductArticle, SetProductArticle] = useState([]);
  const [ProductArticleImages, SetProductArticleImages] = useState([]);
  const [article, SetArticle] = useState('');
  const [articleQte, SetarticleQte] = useState(1);
  const [CartItems, setCartItems] = useState([]);
  const GetProduct = GetProductArticle(`http://localhost:8000/api/product/${id}`,SetProductArticle);
  const GetProductImages = GetProductArticle(`http://localhost:8000/api/product/image/${id}`,SetProductArticleImages);

  const imgArticleUri = '../../src/assets/images/Products/articles/';
  const imgArticleMainUri = '../../src/assets/images/Products/';


  console.log(ProductArticle);
  const setValueArticle =(value, SetValue)=>{
    SetArticle(value);
  }

  useEffect(()=>{
    if (ProductArticle.length > 0) {
      setValueArticle(ProductArticle[0].image);
    }
  }, [ProductArticle]);

  const HandleIncreaseQte = ()=>{
    SetarticleQte(articleQte +1);
  }
  const HandleDecreaseQte = ()=>{
    if(articleQte >1){
      SetarticleQte(articleQte -1)
    }
  }

  const HandleAddToCart = async(e, item)=>{
    e.preventDefault();
    const FormData={
      'cart_id': localStorage.getItem('cart_id'),
      'product_id': ProductArticle[0]['id'],
      'product_qte': articleQte
    }
    setCartItems([...CartItems, item]);
    try{
      const response = await axios.post('http://localhost:8000/api/cart/add', FormData);
      if (response.data.response) {
        console.log(response.data.message); // Log success message
        window.location.replace('/cart');
      }
    }catch (error) {
      console.error('failed fetching data', error);
    }
  }

  const HandleWishlist = async(e)=>{
    e.preventDefault();
    const whishlistID = localStorage.getItem('wishlist_id');
    const productID = ProductArticle[0]['id'];
    const fromData ={
      'product_id': productID,
      'whishlist_id': parseInt(whishlistID)
    }
  try{
    const response = await axios.post('http://localhost:8000/api/wishlist/items/add',fromData);
    if (response.data.response) {
      console.log(response.data.message); // Log success message
      window.location.replace('/wishlist');
    }
  }catch(error){
    console.error(error);
  }

  }

  return(
    <>
  {/* breadcrumb */}
  <div className="container py-4 flex items-center gap-3">
    <a href="../index.html" className="text-primary text-base">
      <i className="fa-solid fa-house" />
    </a>
    <span className="text-sm text-gray-400">
      <i className="fa-solid fa-chevron-right" />
    </span>
    <p className="text-gray-600 font-medium">Product</p>
  </div>
  {/* ./breadcrumb */}
  {/* product-detail */}
  <div className="container p-6 grid grid-cols-2 gap-6">
    <div>
      <img
        src={imgArticleMainUri+ProductArticle.image}
        alt="product"
        className="w-full"
      />
      <div className="grid grid-cols-5 gap-4 mt-4" >
      {
      ProductArticleImages.map((article, key)=>(
      <>
      <div key={key}>
        <img
          src={imgArticleUri+article}
          alt="product2"
          className="w-full h-full cursor-pointer border border-primary"
        />
      </div>
      </>
      ))
      }</div>
    </div>

    <div>
    <ProductInfos
        ProductArticle={ProductArticle}
        HandleAddToCart={HandleAddToCart}
        HandleWishlist={HandleWishlist}
        HandleDecreaseQte={HandleDecreaseQte}
        HandleIncreaseQte={HandleIncreaseQte}
        articleQte={articleQte}
      />
    </div>
  </div>
  <hr aria-hidden="true" class="a-spacing-medium m-4"></hr>

  {/****  product-detail ****/}
  {/* description */}
  <div className="box-container m-2">
  <div className=" pb-16 bg-slate-200">
    <div className="container mx-auto">
        <SubHeader />
    </div>
    <h3 className="border-b m-2 border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
      Product details
    </h3>

    <div className="w-9/12 p-6">
      {/* description  */}
      <div className="container pb-16" id="description">
      <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <DescriptionProducts/>
      </div>

      {/* Specifications */}
      <div className="container pb-16" id="specifications">
        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
        <SpecificationsProducts />
      </div>
    </div>
    {/* Ratings & Reviews */}
    <div className="p-6 w-full bg-white" id="ratingsReviews">
      <h2 className="text-2xl font-semibold mb-4">Customer reviews</h2>
      <RatingsReviews/>
    </div>
  </div>
  {/* related product */}
  <h2 className="text-2xl font-semibold mb-4">Related products</h2>
  <div className="container pb-16" id="relatedproducts">
    <RelatedProducts/>
  </div>
  </div>
    </>
  )
}
export default ProductArticle;
