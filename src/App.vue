<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>

  <!-- 底部导航栏 -->
  <nav class="nav-bar">
    <div class="nav-item">
      <RouterLink to="/home" class="nav-link" active-class="active">
        <div class="nav-icon nav-icon-home">
          <svg class="nav-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <span class="nav-text">首页</span>
      </RouterLink>
    </div>
    <div class="nav-item">
      <RouterLink to="/lajijiansuo" class="nav-link" active-class="active">
        <div class="nav-icon nav-icon-search">
          <svg class="nav-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <span class="nav-text">检索</span>
      </RouterLink>
    </div>
    <div class="nav-item nav-item-scan">
      <RouterLink to="/scanner" class="nav-link nav-link-scan" active-class="active">
        <div class="nav-icon nav-icon-scan">
          <img src="/扫码.png" alt="扫一扫" class="scan-img">
        </div>
      </RouterLink>
    </div>
    <div class="nav-item">
      <RouterLink to="/huodong" class="nav-link" active-class="active">
        <div class="nav-icon nav-icon-activity">
          <svg class="nav-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span class="nav-text">活动</span>
      </RouterLink>
    </div>
    <div class="nav-item">
      <RouterLink to="/yonghu" class="nav-link" active-class="active">
        <div class="nav-icon nav-icon-user">
          <svg class="nav-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span class="nav-text">我的</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style>
/* ===== 全局应用样式 ===== */
.app {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 5rem; /* 为导航栏留出空间 */
}

/* ===== 底部导航栏 ===== */
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background: var(--bg-primary);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 var(--space-2);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-fixed);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
  max-width: 4rem;
}

.nav-item-scan {
  margin-top: calc(var(--space-2) * -1); /* 让扫码按钮稍微突出 */
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  transition: var(--transition-normal);
  padding: var(--space-1);
  border-radius: var(--radius-lg);
  width: 100%;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--color-primary-600);
}

.nav-link.active .nav-icon {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.nav-link-scan {
  padding: 0;
}

.nav-link-scan .nav-icon {
  width: 3.75rem !important;
  height: 3.75rem !important;
  border-radius: var(--radius-full) !important;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600)) !important;
  box-shadow: 0 0.5rem 1.5rem rgba(34, 197, 94, 0.3);
  border: 3px solid var(--bg-primary);
}

.nav-link-scan.active .nav-icon {
  transform: scale(1.1);
  box-shadow: 0 0.75rem 2rem rgba(34, 197, 94, 0.4);
}

.nav-icon {
  width: 3.125rem;
  height: 2.1875rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-1);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.nav-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  opacity: 0;
  transition: var(--transition-normal);
}

.nav-link.active .nav-icon::before {
  opacity: 1;
}

.nav-svg {
  width: 1.25rem;
  height: 1.25rem;
  z-index: 1;
}

.nav-text {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-align: center;
  line-height: 1;
  letter-spacing: 0.025em;
}

.scan-img {
  width: 1.875rem;
  height: 1.875rem;
  object-fit: cover;
  z-index: 1;
}

/* ===== 响应式设计 ===== */
@media (max-width: 480px) {
  .app {
    padding-bottom: 4.5rem;
  }

  .nav-bar {
    height: 4.5rem;
    padding: 0 var(--space-1);
  }

  .nav-item {
    max-width: 3.5rem;
  }

  .nav-item-scan {
    margin-top: calc(var(--space-1) * -1);
  }

  .nav-icon {
    width: 2.8125rem;
    height: 2rem;
  }

  .nav-link-scan .nav-icon {
    width: 3.4375rem !important;
    height: 3.4375rem !important;
  }

  .nav-svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  .scan-img {
    width: 1.5625rem;
    height: 1.5625rem;
  }

  .nav-text {
    font-size: 0.6875rem;
  }
}

@media (min-width: 768px) {
  .nav-bar {
    height: 5.5rem;
  }

  .nav-icon {
    width: 3.5rem;
    height: 2.5rem;
  }

  .nav-link-scan .nav-icon {
    width: 4.5rem !important;
    height: 4.5rem !important;
  }

  .nav-svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .scan-img {
    width: 2.25rem;
    height: 2.25rem;
  }

  .nav-text {
    font-size: var(--text-sm);
  }
}
</style>
