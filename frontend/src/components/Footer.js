import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">Tcommerce.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Tcommerce focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C++, Java, HTML, CSS, Bootstrap, JavaScript, Python, Android, SQL and Algorithm.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="/">Contact Us</a></li>
              <li><a href="/">Contribute</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">
              Copyright &copy; 2023 All Rights Reserved by ThuanLee 
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="https://www.facebook.com/ThuanLee215"><i class="fa-brands fa-facebook-f"></i></a></li>
              <li><a class="instagram" href="https://www.instagram.com/__thuanlee__/"><i class="fa-brands fa-instagram fa-lg"></i></a></li>
              <li><a class="github" href="https://github.com/ThuanLee"><i class="fa-brands fa-github"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer