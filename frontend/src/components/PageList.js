import React from 'react'
import '../styles/PageList.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PageList = ({page, last_page, navigatePage}) => {

  const changePage = (e) => {
    page = e.currentTarget.value
    console.log(page, typeof page)
    navigatePage(page)
  }

  let pageList = []
  
  let start = page - 2
  if (page === last_page) {
    start -= 1
  }
  if (start < 1) start = 1
  
  let end = page + 2
  if (page === 1) {
    end += 1
  }
  if (end > last_page) end = last_page

  if (start > 1) {
    pageList.push(<li value={1} onClick={changePage}>{1}</li>)
    if (start !== 2) {
      pageList.push(<li className='etc'>...</li>)
    }
  }
  for (let i = start; i <= end; i++) {
    if (i === page) {
      pageList.push(<li className='active' value={i} onClick={changePage}>{i}</li>)
    } else {
      pageList.push(<li value={i} onClick={changePage}>{i}</li>)
    }
  }
  if (end < last_page) {
    if (end !== last_page - 1) {
      pageList.push(<li className='etc'>...</li>)
    }
    pageList.push(<li value={last_page} onClick={changePage}>{last_page}</li>)
  }

  return (
    <div className='page-list'>
      <ul class="pagination">
        <li className='quick-page' value={1} onClick={changePage}><ArrowBackIosIcon fontSize='small' /></li>
        {pageList}
        <li className='quick-page' value={last_page} onClick={changePage}><ArrowForwardIosIcon fontSize='small' /></li>
      </ul>
    </div>
  )
}

export default PageList