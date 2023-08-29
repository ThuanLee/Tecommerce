import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCategoryList, searchProduct } from '../services/productService'
import '../styles/SearchPage.css'
import ProductList from '../components/ProductList'

export const SearchPage = () => {
  // Get query string from url
  let [params] = useSearchParams()
  let query = params.get('query')

  const [searchResult, setSearchResult] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      let searchData = await searchProduct(query)
      let categoryData = await getCategoryList()
      setSearchResult(searchData)
      setProductList(searchData)

      for (let category of categoryData) {
        let count = 0
        for (let product of searchData) {
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
  }, [query])

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

        <ProductList productList={productList} />

      </div>

    </div>
  )
}

export default SearchPage
