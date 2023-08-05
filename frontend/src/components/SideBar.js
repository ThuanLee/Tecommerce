import '../styles/SideBar.css'

const Sidebar = ({filter}) => {
  let categoryList = JSON.parse(localStorage.getItem('categories') || "[]")

  return (
    <div className='sidebar'>
      <div className='filter'>
        <h2>Danh mục sản phẩm</h2>
        <div className='category-element'>
          <input type="radio" id="0" name="category_list" value="all" onChange={filter}/>
          <label for="0"><h3>All</h3></label>
        </div>
          {categoryList.map((category, index) => (
            <div className='category-element'>
              <input type="radio" id={category.id} name="category_list" value={category.id} onChange={filter}/>
              <label for={category.id}><h3>{category.name}</h3></label>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Sidebar