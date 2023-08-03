import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'

const ProductDetailPage = () => {
  // Get id from URL
  let params = useParams()
  let productId = params.id

  const [product, setProduct] = useState([])

  // Load product data when enter detail page
  useEffect(() => {
    const callAPI = async () => {
      let data = await getProduct(productId)
      setProduct(data)
    }
    callAPI()
  }, [productId])

  return (
    <div>
      <h2>ProductDetailPage</h2>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  )
}

export default ProductDetailPage