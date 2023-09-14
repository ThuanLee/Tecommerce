import React from 'react'

const NotFoundPage = () => {
  return (
    <div class="d-flex align-items-center justify-content-center mt-5">
        <div class="text-center mt-5">
            <h1 class="display-1 fw-bold mt-5">404</h1>
            <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
            <p class="lead">
                The page you’re looking for doesn’t exist.
            </p>
        </div>
    </div>
  )
}

export default NotFoundPage