// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    let currentSlide = 0;
    let slideInterval;
    
    // 初始化轮播图
    function initSlider() {
        if (slides.length === 0) return;
        
        // 设置自动轮播
        slideInterval = setInterval(nextSlide, 3000);
        
        // 添加事件监听器
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // 为指示点添加事件监听器
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        
        // 鼠标悬停时暂停自动轮播
        const bannerContainer = document.querySelector('.carousel-container');
        bannerContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        bannerContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 3000);
        });
    }
    
    // 切换到下一张幻灯片
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }
    
    // 切换到上一张幻灯片
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
    
    // 跳转到指定幻灯片
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = n;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 初始化轮播图
    initSlider();
  
    // 统一的初始化函数
    function initComponent(selector, callback) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(callback);
    }
  
    // 统一的事件绑定函数
    function bindEvents() {
      // 品牌轮播
      initComponent('.jiantou .left, .jiantou .right', element => {
        element.addEventListener('click', handleBrandNav);
      });
  
      // 分类切换
      initComponent('.fresh .title ul a, .goods .title ul a', link => {
        link.addEventListener('click', handleCategorySwitch);
      });
  
      // 商品悬停
      initComponent('.goods ul li, .fresh .content .right li, .topic li', item => {
        item.addEventListener('mouseenter', () => item.style.zIndex = '10');
        item.addEventListener('mouseleave', () => item.style.zIndex = '1');
      });
  
      // 搜索功能
      const searchInput = document.querySelector('.search input');
      if (searchInput) {
        searchInput.addEventListener('keypress', handleSearch);
      }
    }
  
    // 事件处理函数
    function handleBrandNav(e) {
      console.log(e.target.classList.contains('left') ? '向左滚动品牌' : '向右滚动品牌');
    }
  
    function handleCategorySwitch(e) {
      e.preventDefault();
      const parentUl = this.closest('ul');
      if (parentUl) {
        parentUl.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      }
      this.classList.add('active');
      console.log('切换到分类:', this.textContent);
    }
  
    function handleSearch(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        console.log('搜索:', this.value);
      }
    }
  
    bindEvents();
  });