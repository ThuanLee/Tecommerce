import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import PageList from '../components/PageList'
import { getProductList } from '../services/productService'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  let [params] = useSearchParams()
  let page = params.get('page') || '1'

  const [productList, setProductList] = useState([])
  const [lastPage, setLastPage] = useState(1)

  // Get product list from db and set to productList
  useEffect(() => {
    const callAPI = async () => {
      const res = await getProductList(page)
      setProductList(res.data)
      setLastPage(res.last_page)
    }
    callAPI()
  }, [page])

  const navigatePage = (page) => {
    window.scrollTo(0, 0);
    navigate(location.pathname + `?page=${page}`)
  }

  return (
    <div className='home-page'>
      <ProductList productList={productList} />
      <PageList page={parseInt(page)} last_page={lastPage} navigatePage={navigatePage} />
    </div>
  )
}

export default HomePage