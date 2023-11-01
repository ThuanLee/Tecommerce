import React, { useEffect, useState } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { getCategoryList, searchProduct } from '../services/productService'
import '../styles/SearchPage.css'
import ProductList from '../components/ProductList'
import PageList from '../components/PageList'

export const SearchPage = () => {
  // Get query string from url
  const location = useLocation()
  const navigate = useNavigate()
  let [params] = useSearchParams()
  let query = params.get('query') || ''
  let page = params.get('page') || '1'

  const [searchResult, setSearchResult] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])
  const [lastPage, setLastPage] = useState(1)

  const navigatePage = (page) => {
    window.scrollTo(0, 0);
    navigate(location.pathname + `?query=${query}&page=${page}`)
  }

  useEffect(() => {
    const callAPI = async () => {
      const res = await searchProduct(query, page)
      const categoryData = await getCategoryList()
      setSearchResult(res.data)
      setProductList(res.data)
      setLastPage(res.last_page)

      for (let category of categoryData) {
        let count = 0
        for (let product of res.data) {
          if (product.category === category.id) {
            count++
          }
        }
        category.count = count
      }

      setCategoryList(categoryData)
    }
    document.querySelector('#default').style.color = '#337CCF'
    document.querySelector('#all').style.color = '#337CCF'
    callAPI()
  }, [query, page])

  const filterResult = (e) => {
    const categoryId = e.currentTarget.id

    for (let element of document.querySelectorAll(".type")) {
      element.style.color = 'gray'
    }
    e.currentTarget.style.color = '#337CCF'

    if (categoryId === "all") { 
      setProductList(searchResult)
      return
    }

    // Filter in search result
    let productListFiltered = []
    for (let product of searchResult) {
      if (product.category.toString() === categoryId) {
        productListFiltered.push(product)
      }
    }
    setProductList(productListFiltered)
  }

  const sortResult = (e) => {
    const sortOrder = e.currentTarget.id

    for (let element of document.querySelectorAll(".sort")) {
      element.style.color = 'gray'
    }
    e.currentTarget.style.color = '#337CCF'

    let sortedProductList = JSON.parse(JSON.stringify(productList))

    switch (sortOrder) {
      case "newest":
        sortedProductList.sort((a, b) => {
          if (a.arrival_time < b.arrival_time) {
            return 1
          } else {
            return -1
          }
        })
        break
      case "ascending":
        sortedProductList.sort((a, b) => {
          if (a.price > b.price) {
            return 1
          } else {
            return -1
          }
        })
        break
      case "descending":
        sortedProductList.sort((a, b) => {
          if (a.price < b.price) {
            return 1
          } else {
            return -1
          }
        })
        break
      default:
        sortedProductList.sort((a, b) => {
          if (a.id > b.id) {
            return 1
          } else {
            return -1
          }
        })
    }

    setProductList(sortedProductList)
  }

  const filterByPrice = (e) => {
    e.preventDefault()
    let from = parseInt(e.target.from.value || 0)
    let to = parseInt(e.target.to.value || 0)

    for (let element of document.querySelectorAll(".type")) {
      element.style.color = 'gray'
    }

    for (let element of document.querySelectorAll(".sort")) {
      element.style.color = 'gray'
    }

    document.querySelector('#default').style.color = '#337CCF'
    document.querySelector('#all').style.color = '#337CCF'

    if (from === 0 && to === 0) {
      setProductList(searchResult)
      return
    }

    if (from !== 0 && to === 0) {
      to = Number.POSITIVE_INFINITY
    }

    let productListFiltered = []
    for (let product of searchResult) {
      if (product.price >= from && product.price <= to) {
        productListFiltered.push(product)
      }
    }
    setProductList(productListFiltered)
  }

  return (
    <div className='search-page'>

      <div className='filter'>

        <p className='category'>Sắp xếp</p>

        <div>
          <div className='category-element sort' tabIndex="-1" id="default" onClick={sortResult}>
            <p>Mặc định</p>
            <i class="fa-solid fa-star-of-life"></i>
          </div>
          <div className='category-element sort' tabIndex="-1" id="newest" onClick={sortResult}>
            <p>Mới nhất</p>
            <i class="fa-solid fa-arrow-trend-up"></i>
          </div>
          <div className='category-element sort' tabIndex="-1" id="ascending" onClick={sortResult}>
            <p>Giá tăng dần</p>
            <i class="fa-solid fa-up-long"></i>
          </div>
          <div className='category-element sort' tabIndex="-1" id="descending" onClick={sortResult}>
            <p>Giá giảm dần</p>
            <i class="fa-solid fa-down-long"></i>
          </div>
        </div>

        <p className='category pt-4'>Loại</p>

        <div>
          <div className='category-element type' tabIndex="0" id="all" onClick={filterResult}>
            <p>Tất cả</p>
            <p className='category-count'>{searchResult.length}</p>
          </div>
          {categoryList.map((category) => (
            category.count > 0 &&
            <div className='category-element type' tabIndex={category.id} id={category.id} onClick={filterResult}>
              <p>{category.name}</p>
              <p className='category-count'>{category.count}</p>
            </div>
          ))}
        </div>

        <p className='category pt-4'>Khoảng tiền</p>

        <form onSubmit={filterByPrice} autoComplete='off' spellCheck={false}>
          <div className='category-element'>
            <input type="text" placeholder='Từ...' name='from'></input>
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
            <input type="text" placeholder='đến' name='to'></input>
          </div>
          <button type='submit' className='filter-by-price'>Áp dụng</button>
        </form>

      </div>

      <div className='search-result'>
        {query !== '' &&
          <p className='search-term'>Kết quả tìm kiếm cho: <i className='text-muted'>'{query}'</i></p>
        }
        <div className='result-block'>
          <ProductList productList={productList} />
          <PageList page={parseInt(page)} last_page={lastPage} navigatePage={navigatePage} />
        </div>
      </div>

    </div>
  )
}

export default SearchPage
