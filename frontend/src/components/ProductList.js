import { Link } from 'react-router-dom'
import '../styles/ProductList.css'
import { moneyFormat } from '../utils/money'

const ProductList = ({productList}) => {

  return (
    <div className="product-list container">
      <div className='row'>
        {productList.map((product) => (
          <Link to={`/product/${product.id}/`} className="col-md-6 col-lg-4 col-xl-3">
            <div className="product-card">
                <div className="image-box">
                  <img src={product.image_url} alt="product" />
                </div>

                <div className="contentBox">
                  <p className='product-name'>{product.name}</p>
                  <span>{moneyFormat(product.price)}</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList