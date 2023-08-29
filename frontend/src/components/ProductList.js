import { Link } from 'react-router-dom'
import '../styles/ProductList.css'
import { moneyFormat } from '../utils/money'

const ProductList = ({productList}) => {

  return (
    <div className="product-list container">
      <div className='row'>
        {productList.map((product) => (
          <Link to={`/product/${product.id}/`}>
            <div className="product-card col">
                <div className="image-box">
                  <img src={product.image_url} alt="product" />
                </div>

                <div className="contentBox">
                  <p className='product-name'>{product.name}</p>
                  <span className='text-info'>{moneyFormat(product.price)}</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList