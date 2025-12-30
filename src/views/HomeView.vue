<template>
  <div class="home-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">垃圾分类，从我做起</h1>
          <p class="page-subtitle">共建绿色家园，从正确分类开始</p>
        </div>

        <div class="search-section">
          <div class="search-box">
            <div class="search-icon">🔍</div>
            <input type="text" placeholder="搜索垃圾名称或类别" class="search-input" v-model="searchQuery"
              @keyup.enter="handleSearch">
            <button class="search-btn" @click="handleSearch">
              搜索
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 轮播图区域 -->
    <section class="banner-section">
      <div class="container">
        <div class="banner-swiper">
          <div class="swiper-inner">
            <div class="swiper-wrapper" ref="swiperWrapper">
              <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                <img :src="slide.image" alt="垃圾分类宣传图" class="slide-img">
                <div class="slide-overlay">
                  <div class="slide-content">
                    <h3 class="slide-title">{{ slide.title }}</h3>
                    <p class="slide-desc">{{ slide.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 轮播指示器 -->
            <div class="swiper-pagination">
              <div class="pagination-item" v-for="(slide, index) in slides" :key="index"
                :class="{ active: currentIndex === index }" @click="switchSlide(index)"></div>
            </div>

            <!-- 左右切换箭头 -->
            <button class="swiper-btn swiper-prev" @click="prevSlide" aria-label="上一张">
              ‹
            </button>
            <button class="swiper-btn swiper-next" @click="nextSlide" aria-label="下一张">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类区域 -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">垃圾分四类·投放不迷路</h2>
          <p class="section-desc">了解不同垃圾的分类标准和投放要求</p>
        </div>

        <div class="garbage-grid">
          <router-link to="/lajijiansuo?category=recyclable" class="garbage-card recyclable"
            :class="{ 'card-hover': hoveredCard === 'recyclable' }" @mouseenter="hoveredCard = 'recyclable'"
            @mouseleave="hoveredCard = null">
            <div class="card-icon">♻️</div>
            <div class="card-content">
              <h3 class="card-title">可回收物</h3>
              <p class="card-desc">纸张、塑料、玻璃、金属等可再利用的物品</p>
            </div>
            <div class="card-arrow">→</div>
          </router-link>

          <router-link to="/lajijiansuo?category=kitchen" class="garbage-card kitchen"
            :class="{ 'card-hover': hoveredCard === 'kitchen' }" @mouseenter="hoveredCard = 'kitchen'"
            @mouseleave="hoveredCard = null">
            <div class="card-icon">🥗</div>
            <div class="card-content">
              <h3 class="card-title">厨余垃圾</h3>
              <p class="card-desc">剩菜、果皮、骨头等易腐烂的食物废弃物</p>
            </div>
            <div class="card-arrow">→</div>
          </router-link>

          <router-link to="/lajijiansuo?category=harmful" class="garbage-card harmful"
            :class="{ 'card-hover': hoveredCard === 'harmful' }" @mouseenter="hoveredCard = 'harmful'"
            @mouseleave="hoveredCard = null">
            <div class="card-icon">⚠️</div>
            <div class="card-content">
              <h3 class="card-title">有害垃圾</h3>
              <p class="card-desc">电池、药品、灯管等对环境有害的物品</p>
            </div>
            <div class="card-arrow">→</div>
          </router-link>

          <router-link to="/lajijiansuo?category=other" class="garbage-card other"
            :class="{ 'card-hover': hoveredCard === 'other' }" @mouseenter="hoveredCard = 'other'"
            @mouseleave="hoveredCard = null">
            <div class="card-icon">🗑️</div>
            <div class="card-content">
              <h3 class="card-title">其他垃圾</h3>
              <p class="card-desc">除上述三类外的其他生活垃圾</p>
            </div>
            <div class="card-arrow">→</div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 环保小贴士 -->
    <section class="tips-section">
      <div class="container">
        <div class="tips-card">
          <div class="tips-header">
            <div class="tips-icon">💡</div>
            <h3 class="tips-title">环保小贴士</h3>
          </div>
          <p class="tips-content">
            垃圾分类可以减少环境污染，节约资源。记得将可回收物清洁后再投放哦！
            正确分类不仅保护环境，还能为资源再生创造条件。
          </p>
          <div class="tips-stats">
            <div class="stat-item">
              <div class="stat-number">85%</div>
              <div class="stat-label">可回收利用</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15%</div>
              <div class="stat-label">资源节约</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">90%</div>
              <div class="stat-label">减排效果</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== 页面布局 ===== */
.home-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 6rem;
  /* 为导航栏留出空间 */
}

/* ===== 容器样式 ===== */
.container {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}

/* ===== 页面头部 ===== */
.page-header {
  background: linear-gradient(135deg, var(--color-primary-50), var(--bg-primary));
  border-bottom-left-radius: var(--border-radius-3xl);
  border-bottom-right-radius: var(--border-radius-3xl);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-8);
  padding: var(--space-8) 0;
}

.header-content {
  text-align: center;
  margin-bottom: var(--space-6);
}

.page-title {
  font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.page-subtitle {
  font-size: clamp(var(--text-base), 3vw, var(--text-lg));
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  line-height: 1.4;
}

/* ===== 搜索区域 ===== */
.search-section {
  max-width: 32rem;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-3xl);
  padding: var(--space-1);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-normal);
}

.search-box:focus-within {
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary-300);
}

.search-icon {
  color: var(--text-muted);
  margin: 0 var(--space-3);
  font-size: var(--text-lg);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  height: 2.5rem;
  border: none;
  outline: none;
  font-size: clamp(var(--text-sm), 3vw, var(--text-base));
  color: var(--text-primary);
  background: transparent;
  border-radius: var(--border-radius-xl);
  padding: 0 var(--space-3);
  transition: var(--transition-fast);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  background-color: var(--color-primary-50);
}

.search-btn {
  padding: var(--space-2) var(--space-5);
  border: none;
  border-radius: var(--border-radius-xl);
  font-size: clamp(var(--text-sm), 3vw, var(--text-base));
  font-weight: var(--font-semibold);
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
  margin-left: var(--space-2);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
}

.search-btn:active {
  transform: translateY(0);
}

/* ===== 轮播图区域 ===== */
.banner-section {
  margin-bottom: var(--space-12);
}

.banner-swiper {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-2xl);
  aspect-ratio: 16/9;
  box-shadow: var(--shadow-xl);
  background: var(--color-primary-100);
}

@media (max-width: 767px) {
  .banner-swiper {
    aspect-ratio: 4/3;
  }
}

.swiper-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.swiper-slide {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
}

.slide-img {
  margin: auto;
  height: 100%;
  object-fit: cover;
}

.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: var(--space-6) var(--space-4) var(--space-4);
  color: var(--text-inverse);
}

.slide-content {
  max-width: 32rem;
}

.slide-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
  line-height: 1.3;
}

.slide-desc {
  font-size: var(--text-base);
  opacity: 0.9;
  line-height: 1.4;
}

/* ===== 轮播控制 ===== */
.swiper-pagination {
  position: absolute;
  bottom: var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-2);
  z-index: 10;
}

.pagination-item {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: var(--radius-full);
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: var(--transition-normal);
  border: none;
}

.pagination-item:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.pagination-item.active {
  background-color: var(--color-white);
  width: 1.5rem;
  border-radius: var(--radius-sm);
}

.swiper-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  z-index: 10;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.swiper-btn:hover {
  background-color: var(--color-white);
  transform: translateY(-50%) scale(1.1);
  box-shadow: var(--shadow-lg);
}

.swiper-prev {
  left: var(--space-4);
}

.swiper-next {
  right: var(--space-4);
}

@media (max-width: 767px) {
  .swiper-btn {
    width: 2.5rem;
    height: 2.5rem;
    font-size: var(--text-lg);
  }

  .swiper-prev {
    left: var(--space-2);
  }

  .swiper-next {
    right: var(--space-2);
  }
}

/* ===== 分类区域 ===== */
.category-section {
  margin-bottom: var(--space-16);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: clamp(var(--text-2xl), 4vw, var(--text-3xl));
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  line-height: 1.2;
}

.section-desc {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.5;
}

.garbage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-8);
}

.garbage-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  border: 2px solid transparent;
  transition: var(--transition-normal);
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
}

.garbage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: var(--transition-normal);
}

.garbage-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: currentColor;
}

.garbage-card:hover::before {
  opacity: 1;
}

.garbage-card.card-hover {
  animation: cardPulse 0.6s ease-out;
}

@keyframes cardPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}

/* 不同类型的卡片颜色 */
.garbage-card.recyclable {
  --card-color: var(--color-recyclable);
  border-left: 4px solid var(--color-recyclable);
}

.garbage-card.kitchen {
  --card-color: var(--color-kitchen);
  border-left: 4px solid var(--color-kitchen);
}

.garbage-card.harmful {
  --card-color: var(--color-harmful);
  border-left: 4px solid var(--color-harmful);
}

.garbage-card.other {
  --card-color: var(--color-other);
  border-left: 4px solid var(--color-other);
}

.card-icon {
  font-size: 3rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  line-height: 1.3;
}

.card-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

.card-arrow {
  font-size: var(--text-xl);
  color: var(--text-muted);
  transition: var(--transition-normal);
  margin-left: auto;
  flex-shrink: 0;
}

.garbage-card:hover .card-arrow {
  color: var(--text-primary);
  transform: translateX(4px);
}

/* ===== 环保小贴士 ===== */
.tips-section {
  margin-bottom: var(--space-12);
}

.tips-card {
  background: linear-gradient(135deg, var(--color-primary-50), var(--bg-primary));
  border-radius: var(--border-radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-primary-200);
  position: relative;
  overflow: hidden;
}

.tips-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
  border-radius: var(--radius-full);
}

.tips-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  position: relative;
  z-index: 1;
}

.tips-icon {
  font-size: var(--text-3xl);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tips-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin: 0;
}

.tips-content {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1;
}

.tips-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
  padding: var(--space-3);
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-primary-200);
}

.stat-number {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
  display: block;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .home-page {
    padding-bottom: 5rem;
  }

  .page-header {
    margin-bottom: var(--space-6);
    padding: var(--space-6) 0;
  }

  .header-content {
    margin-bottom: var(--space-4);
  }

  .page-title {
    font-size: var(--text-2xl);
  }

  .page-subtitle {
    font-size: var(--text-sm);
  }

  .search-section {
    max-width: 100%;
    padding: 0 var(--space-4);
  }

  .search-box {
    padding: var(--space-2);
  }

  .search-input {
    height: 2.25rem;
    font-size: var(--text-sm);
  }

  .search-btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    margin-left: var(--space-1);
  }

  .banner-section {
    margin-bottom: var(--space-8);
  }

  .banner-swiper {
    border-radius: var(--border-radius-xl);
  }

  .slide-overlay {
    padding: var(--space-4);
  }

  .slide-title {
    font-size: var(--text-lg);
  }

  .slide-desc {
    font-size: var(--text-sm);
  }

  .category-section {
    margin-bottom: var(--space-10);
  }

  .section-header {
    margin-bottom: var(--space-6);
  }

  .section-title {
    font-size: var(--text-xl);
  }

  .section-desc {
    font-size: var(--text-base);
  }

  .garbage-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .garbage-card {
    padding: var(--space-4);
    flex-direction: column;
    text-align: center;
    gap: var(--space-3);
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .card-title {
    font-size: var(--text-lg);
  }

  .card-desc {
    font-size: var(--text-sm);
  }

  .card-arrow {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    margin-left: 0;
  }

  .tips-card {
    padding: var(--space-6);
  }

  .tips-header {
    flex-direction: column;
    text-align: center;
    gap: var(--space-2);
  }

  .tips-title {
    font-size: var(--text-xl);
  }

  .tips-content {
    font-size: var(--text-sm);
    margin-bottom: var(--space-4);
  }

  .tips-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-2);
  }

  .stat-item {
    padding: var(--space-2);
  }

  .stat-number {
    font-size: var(--text-lg);
  }

  .stat-label {
    font-size: var(--text-xs);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .garbage-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }

  .garbage-card {
    padding: var(--space-5);
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .tips-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .page-header {
    margin-bottom: var(--space-10);
    padding: var(--space-12) 0;
  }

  .header-content {
    margin-bottom: var(--space-8);
  }

  .search-section {
    max-width: 40rem;
  }

  .banner-section {
    margin-bottom: var(--space-16);
  }

  .category-section {
    margin-bottom: var(--space-20);
  }

  .section-header {
    margin-bottom: var(--space-10);
  }

  .garbage-grid {
    grid-template-columns: repeat(2, 1fr);  /* 修改为最多显示3列，而不是4列 */
    gap: var(--space-8);
    margin-top: var(--space-10);
  }

  .garbage-card {
    padding: var(--space-8);
  }

  .card-icon {
    font-size: 3.5rem;
  }

  .card-title {
    font-size: var(--text-2xl);
  }

  .tips-section {
    margin-bottom: var(--space-16);
  }

  .tips-card {
    padding: var(--space-10);
  }

  .tips-stats {
    grid-template-columns: repeat(3, 1fr);
    max-width: 32rem;
    margin: 0 auto;
  }
}
</style>
opacity: 0;
visibility: hidden;
}

.banner-swiper:hover .swiper-btn {
opacity: 1;
visibility: visible;
}

.swiper-prev {
left: 15px;
}

.swiper-next {
right: 15px;
}

.swiper-btn:hover {
background-color: var(--white);
transform: translateY(-50%) scale(1.1);
}

/* 分类区域 */
.category-section {
width: 90%;
max-width: 1000px;
margin: 0 auto 30px;
}

.category-title {
text-align: center;
font-size: clamp(1.1rem, 4vw, 1.3rem);
font-weight: 600;
color: var(--text-dark);
margin-bottom: 20px;
position: relative;
padding-bottom: 10px;
}

.category-title::after {
content: '';
position: absolute;
bottom: 0;
left: 50%;
transform: translateX(-50%);
width: 60px;
height: 3px;
background-color: var(--primary-green);
border-radius: 3px;
}

/* 分类卡片优化 */
.garbage-cards {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
gap: 15px;
}

.card-link {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 160px;
border-radius: var(--radius);
padding: 15px;
color: var(--white);
text-decoration: none;
transition: var(--transition);
position: relative;
overflow: hidden;
box-shadow: var(--shadow);
}

.card-link::before {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.1);
opacity: 0;
transition: var(--transition);
}

.card-link:hover {
transform: translateY(-8px) scale(1.02);
}

.card-link:hover::before {
opacity: 1;
}

.card-icon {
font-size: 2rem;
margin-bottom: 15px;
transition: var(--transition);
}

.card-link:hover .card-icon {
transform: scale(1.2);
}

.card-label {
font-size: 1.1rem;
font-weight: bold;
margin-bottom: 8px;
}

.card-text {
font-size: 0.85rem;
text-align: center;
opacity: 0.9;
}

.card-recyclable {
background-color: var(--recyclable);
}

.card-other {
background-color: var(--other);
}

.card-kitchen {
background-color: var(--kitchen);
}

.card-harmful {
background-color: var(--harmful);
}

/* 环保小贴士 */
.tips-section {
width: 90%;
max-width: 1000px;
margin: 0 auto 20px;
}

.tips-card {
background-color: var(--white);
border-radius: var(--radius);
padding: 20px;
box-shadow: var(--shadow);
border-left: 4px solid var(--primary-green);
}

.tips-title {
font-size: 1.1rem;
color: var(--text-dark);
margin-bottom: 10px;
display: flex;
align-items: center;
}

.tips-title::before {
content: '💡';
margin-right: 8px;
}

.tips-content {
font-size: 0.9rem;
color: var(--text-light);
line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 480px) {
.home-container {
padding: 15px;
}

.banner-section {
margin-bottom: 20px;
}

.banner-swiper {
height: 180px;
border-radius: 16px;
}

.swiper-slide {
padding: 15px;
}

.banner-title {
font-size: 1.4rem;
margin-bottom: 8px;
}

.banner-desc {
font-size: 0.85rem;
line-height: 1.4;
}

.search-section {
margin-bottom: 25px;
}

.search-container {
padding: 20px 15px;
}

.search-title {
font-size: 1.3rem;
margin-bottom: 12px;
}

.search-input-wrapper {
margin-bottom: 15px;
}

.search-input {
height: 44px;
font-size: 1rem;
}

.search-btn {
padding: 12px 20px;
font-size: 0.95rem;
}

.garbage-cards {
grid-template-columns: repeat(2, 1fr);
gap: 12px;
margin-bottom: 20px;
}

.garbage-card {
padding: 16px;
min-height: 120px;
}

.card-icon {
width: 50px;
height: 50px;
font-size: 1.5rem;
margin-bottom: 12px;
}

.card-title {
font-size: 1rem;
margin-bottom: 6px;
}

.card-desc {
font-size: 0.8rem;
line-height: 1.3;
}

.quick-actions {
padding: 20px 15px;
}

.actions-title {
font-size: 1.2rem;
margin-bottom: 15px;
}

.actions-grid {
grid-template-columns: repeat(2, 1fr);
gap: 12px;
}

.action-btn {
padding: 16px 12px;
font-size: 0.9rem;
}

.action-icon {
font-size: 1.3rem;
margin-bottom: 8px;
}

.card-link {
height: 140px;
}

.tips-card {
padding: 15px;
}
}

@media (min-width: 481px) and (max-width: 767px) {
.home-container {
padding: 20px;
max-width: 700px;
margin: 0 auto;
}

.banner-section {
margin-bottom: 25px;
}

.banner-swiper {
height: 200px;
border-radius: 20px;
}

.swiper-slide {
padding: 20px;
}

.banner-title {
font-size: 1.6rem;
margin-bottom: 10px;
}

.banner-desc {
font-size: 0.9rem;
}

.search-section {
margin-bottom: 30px;
}

.search-container {
padding: 25px 20px;
}

.search-title {
font-size: 1.4rem;
margin-bottom: 15px;
}

.search-input-wrapper {
margin-bottom: 18px;
}

.search-input {
height: 48px;
font-size: 1.05rem;
}

.search-btn {
padding: 14px 24px;
font-size: 1rem;
}

.garbage-cards {
grid-template-columns: repeat(3, 1fr);
gap: 16px;
margin-bottom: 25px;
}

.garbage-card {
padding: 20px;
min-height: 140px;
}

.card-icon {
width: 55px;
height: 55px;
font-size: 1.6rem;
margin-bottom: 14px;
}

.card-title {
font-size: 1.1rem;
margin-bottom: 8px;
}

.card-desc {
font-size: 0.85rem;
}

.quick-actions {
padding: 25px 20px;
}

.actions-title {
font-size: 1.3rem;
margin-bottom: 18px;
}

.actions-grid {
grid-template-columns: repeat(3, 1fr);
gap: 16px;
}

.action-btn {
padding: 18px 14px;
font-size: 0.95rem;
}

.action-icon {
font-size: 1.4rem;
margin-bottom: 10px;
}
}

@media (min-width: 768px) {
.home-container {
padding: 30px;
max-width: 1200px;
margin: 0 auto;
}

.banner-section {
margin-bottom: 35px;
}

.banner-swiper {
height: 250px;
border-radius: 24px;
}

.swiper-slide {
padding: 30px;
}

.banner-title {
font-size: 2rem;
margin-bottom: 12px;
}

.banner-desc {
font-size: 1rem;
}

.search-section {
margin-bottom: 40px;
}

.search-container {
padding: 35px 30px;
}

.search-title {
font-size: 1.6rem;
margin-bottom: 20px;
}

.search-input-wrapper {
margin-bottom: 20px;
}

.search-input {
height: 52px;
font-size: 1.1rem;
}

.search-btn {
padding: 16px 28px;
font-size: 1.05rem;
}

.garbage-cards {
grid-template-columns: repeat(4, 1fr);
gap: 20px;
margin-bottom: 30px;
}

.garbage-card {
padding: 24px;
min-height: 160px;
}

.card-icon {
width: 60px;
height: 60px;
font-size: 1.8rem;
margin-bottom: 16px;
}

.card-title {
font-size: 1.2rem;
margin-bottom: 10px;
}

.card-desc {
font-size: 0.9rem;
}

.quick-actions {
padding: 30px;
}

.actions-title {
font-size: 1.4rem;
margin-bottom: 20px;
}

.actions-grid {
grid-template-columns: repeat(4, 1fr);
gap: 20px;
}

.action-btn {
padding: 20px 16px;
font-size: 1rem;
}

.action-icon {
font-size: 1.5rem;
margin-bottom: 12px;
}
}

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 响应式数据
const searchQuery = ref('');
const hoveredCard = ref(null);

// 轮播图数据
const slides = [
  {
    image: '/轮播图1.png',
    title: '环保从我做起',
    description: '正确分类垃圾，保护美丽家园'
  },
  {
    image: '/轮播图2.png',
    title: '垃圾分类新时尚',
    description: '让分类成为习惯，让环保成为生活方式'
  },
  {
    image: '/轮播图3.png',
    title: '绿色校园行动',
    description: '携手共创无废校园，共建美好未来'
  }
];

const swiperWrapper = ref(null);
const currentIndex = ref(0);
let autoPlayTimer = null;

// 轮播切换函数
const switchSlide = (index) => {
  if (!swiperWrapper.value) return;
  currentIndex.value = index;
  swiperWrapper.value.style.transform = `translateX(-${currentIndex.value * 100}%)`;
};

// 上一张/下一张
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
  switchSlide(currentIndex.value);
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
  switchSlide(currentIndex.value);
};

// 搜索功能
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 这里可以添加搜索逻辑，或者跳转到搜索页面
    console.log('搜索:', searchQuery.value);
    // 暂时跳转到垃圾检索页面
    // router.push(`/lajijiansuo?query=${encodeURIComponent(searchQuery.value)}`);
  }
};

// 自动轮播
const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    nextSlide();
  }, 5000); // 5秒切换一次
};

// 组件挂载时初始化
onMounted(() => {
  startAutoPlay();

  // 窗口大小变化时重新计算布局
  window.addEventListener('resize', () => {
    // 重置轮播位置，避免响应式布局错乱
    switchSlide(currentIndex.value);
  });
});

// 组件卸载时清理
onUnmounted(() => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
  }
  window.removeEventListener('resize', () => { });
});
</script>
