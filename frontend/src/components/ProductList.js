import { Link } from 'react-router-dom'
import '../styles/ProductList.css'

const ProductList = ({productList}) => {
  return (
    <div className="product-list">
      {productList.map((product, index) => (
        <Link to={`/product/${product.id}/`}>
        <div className="card">
            <div className="imgBox">
            </div>

            <div className="contentBox">
            <h3>{product.name}</h3>
            <h2 className="price">{product.price / 1000}<small>.000</small> VND</h2>
            </div>
            <p className="buy">Buy Now</p>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList