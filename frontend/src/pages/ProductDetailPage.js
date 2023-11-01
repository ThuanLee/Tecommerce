import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import '../styles/ProductDetailPage.css'
import { CartContext } from '../contexts/cartContext'
import { addCartItem } from '../services/cartSevice'
import { moneyFormat } from '../utils/money'
import { addCartItemToast, loginFirstToast } from '../utils/toast'
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"


const ProductDetailPage = () => {
  // Get id from URL
  let params = useParams()
  let productId = params.id

  // Use to sync data with header
  const cartContext = useContext(CartContext)

  const [product, setProduct] = useState([])

  // Load product data when enter detail page
  useEffect(() => {
    const callAPI = async () => {
      let data = await getProduct(productId)
      setProduct(data)
    }
    callAPI()
  }, [productId])

  const addToCart = async () => {
    try {
      let quantity = parseInt(document.getElementById('buy-quantity').value)
      if (quantity < 1) {
        quantity = 1
      } else if (quantity > 100) {
        quantity = 100
      }
      let response = await addCartItem(productId, quantity)
      cartContext.setCart(response)
      addCartItemToast(product.name)
    } catch (error) {
      cartContext.setCart([])
      loginFirstToast()
    }
  }

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  return (
    <div className="product-detail container">
      <div className="row">
        <div className='col'>
          <a href={product.image_url} data-fancybox data-caption={product.name}>
            <img src={product.image_url} alt="product" width="600px" />
          </a>
        </div>
          
        <div className="detail col">
          <h2 className='pt-4 pb-2'>{product.name}</h2>
          <div className='buy-block'>
            <h5 className='price text-primary'>{moneyFormat(product.price)}</h5>
            <div className='add-btn'>
              <p>Thêm vào giỏ hàng</p>
              <input id='buy-quantity' type='number' min='1' max='100' defaultValue={1}></input>
              <i class="fa-solid fa-cart-plus fa-xl" onClick={addToCart}></i>
            </div>
          </div>
          <p className='product-description' dangerouslySetInnerHTML={{__html: product.description}}></p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage