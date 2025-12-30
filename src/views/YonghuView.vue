<template>
  <div class="user-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">用户中心</h1>
          <p class="page-subtitle">管理您的个人信息和设置</p>
        </div>
      </div>
    </header>

    <!-- 用户信息卡片 -->
    <section class="user-profile-section">
      <!-- ... (用户信息卡片内容保持不变) ... -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-section">
            <div class="avatar-placeholder">
              <div class="avatar-icon">👤</div>
            </div>
            <div class="user-info">
              <div class="username">环保小卫士</div>
              <div class="user-level">
                <span class="level-badge">Lv.8</span>
                <span class="level-desc">环保达人</span>
              </div>
            </div>
          </div>
          <button class="edit-btn" @click="editProfile">
            <span class="edit-icon">✏️</span>
            编辑
          </button>
        </div>
        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-value">1,234</div>
            <div class="stat-label">积分</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">89</div>
            <div class="stat-label">天数</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">12</div>
            <div class="stat-label">成就</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能菜单 -->
    <section class="menu-section">
      <div class="container">
        <div class="menu-list">
          <!-- 修改：点击直接跳转，不再调用 openFeature -->
          <div class="menu-item" @click="router.push('/shoucang')">
            <div class="menu-icon">❤️</div>
            <div class="menu-content">
              <div class="menu-title">我的收藏</div>
              <div class="menu-desc">查看收藏的垃圾分类知识</div>
            </div>
            <div class="menu-arrow">→</div>
          </div>

          <div class="menu-item" @click="openFeature('alarm')">
            <div class="menu-icon">⏰</div>
            <div class="menu-content">
              <div class="menu-title">倒垃圾闹钟</div>
              <div class="menu-desc">设置定时提醒，养成好习惯</div>
            </div>
            <div class="menu-arrow">→</div>
          </div>

          <div class="menu-item" @click="openFeature('map')">
            <div class="menu-icon">📍</div>
            <div class="menu-content">
              <div class="menu-title">垃圾地图定位</div>
              <div class="menu-desc">查找附近的垃圾投放点</div>
            </div>
            <div class="menu-arrow">→</div>
          </div>

          <div class="menu-item" @click="openFeature('share')">
            <div class="menu-icon">📤</div>
            <div class="menu-content">
              <div class="menu-title">分享给朋友</div>
              <div class="menu-desc">邀请好友一起参与环保</div>
            </div>
            <div class="menu-arrow">→</div>
          </div>

          <div class="menu-item" @click="openFeature('settings')">
            <div class="menu-icon">⚙️</div>
            <div class="menu-content">
              <div class="menu-title">系统设置</div>
              <div class="menu-desc">个性化设置和偏好</div>
            </div>
            <div class="menu-arrow">→</div>
          </div>

          <div class="menu-item" @click="openFeature('about')">
            <div class="menu-icon">ℹ️</div>
            <div class="menu-content">
              <div class="menu-title">关于我们</div>
              <div class="menu-desc">了解我们的使命和团队</div>
            </div>
            <div class="menu-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 退出登录按钮 -->
    <section class="logout-section">
      <div class="container">
        <button class="logout-btn" @click="logout">
          <span class="logout-icon">🚪</span>
          退出登录
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== 页面布局 ===== */
.user-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 6rem; /* 为导航栏留出空间 */
}

/* ===== 页面头部 ===== */
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

/* ===== 用户信息卡片 ===== */
.user-profile-section {
  margin-bottom: var(--space-12);
}

.profile-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.03), rgba(255, 255, 255, 0.05));
  pointer-events: none;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1;
}

.avatar-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-4);
  box-shadow: var(--shadow-lg);
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 1.5rem;
  color: var(--text-inverse);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.username {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
}

.user-level {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.level-badge {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  color: var(--text-inverse);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--border-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.025em;
}

.level-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
}

.edit-btn {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
  border: none;
  border-radius: var(--border-radius-xl);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-1);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.edit-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
}

.edit-btn:active {
  transform: translateY(0);
}

.edit-icon {
  font-size: var(--text-sm);
}

/* ===== 统计行 ===== */
.stats-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--border-color);
  margin-top: var(--space-6);
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
  flex: 1;
  padding: 0 var(--space-2);
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
  display: block;
  line-height: 1.2;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background-color: var(--border-color);
}

/* ===== 功能菜单 ===== */
.menu-section {
  margin-bottom: var(--space-12);
}

.menu-list {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  cursor: pointer;
  transition: var(--transition-normal);
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: var(--color-primary-50);
  transform: translateX(2px);
}

.menu-item:active {
  transform: translateX(0);
  transition: var(--transition-fast);
}

.menu-icon {
  font-size: 1.25rem;
  margin-right: var(--space-4);
  width: 2rem;
  text-align: center;
  flex-shrink: 0;
}

.menu-content {
  flex: 1;
  min-width: 0;
}

.menu-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
  line-height: 1.3;
}

.menu-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

.menu-arrow {
  font-size: var(--text-lg);
  color: var(--text-muted);
  transition: var(--transition-fast);
  margin-left: var(--space-3);
  flex-shrink: 0;
}

.menu-item:hover .menu-arrow {
  color: var(--color-primary-500);
  transform: translateX(2px);
}

/* ===== 退出登录区域 ===== */
.logout-section {
  margin-bottom: var(--space-12);
}

.logout-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--color-error), var(--color-error-dark));
  color: var(--text-inverse);
  border: none;
  border-radius: var(--border-radius-xl);
  padding: var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(239, 68, 68, 0.1);
}

.logout-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-error-dark), var(--color-error));
}

.logout-btn:active {
  transform: translateY(0);
}

.logout-icon {
  font-size: var(--text-lg);
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .user-page {
    padding-bottom: 5rem;
  }

  .page-header {
    margin-bottom: var(--space-6);
    padding: var(--space-6) 0;
  }

  .page-title {
    font-size: var(--text-2xl);
  }

  .page-subtitle {
    font-size: var(--text-sm);
  }

  .user-profile-section {
    margin-bottom: var(--space-8);
  }

  .profile-card {
    padding: var(--space-5);
  }

  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .avatar-section {
    width: 100%;
  }

  .avatar-placeholder {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: var(--space-3);
  }

  .avatar-icon {
    font-size: 1.25rem;
  }

  .username {
    font-size: var(--text-lg);
  }

  .user-level {
    gap: var(--space-1);
  }

  .level-badge {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-1);
  }

  .level-desc {
    font-size: var(--text-xs);
  }

  .edit-btn {
    align-self: flex-end;
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-xs);
  }

  .stats-row {
    padding: var(--space-3) 0;
    margin-top: var(--space-4);
  }

  .stat-value {
    font-size: var(--text-xl);
  }

  .stat-label {
    font-size: var(--text-xs);
  }

  .menu-section {
    margin-bottom: var(--space-8);
  }

  .menu-item {
    padding: var(--space-3) var(--space-4);
  }

  .menu-icon {
    font-size: 1.125rem;
    margin-right: var(--space-3);
    width: 1.75rem;
  }

  .menu-title {
    font-size: var(--text-sm);
  }

  .menu-desc {
    font-size: var(--text-xs);
  }

  .menu-arrow {
    font-size: var(--text-base);
    margin-left: var(--space-2);
  }

  .logout-section {
    margin-bottom: var(--space-8);
  }

  .logout-btn {
    padding: var(--space-3);
    font-size: var(--text-sm);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .profile-card {
    padding: var(--space-6);
  }

  .avatar-placeholder {
    width: 4.5rem;
    height: 4.5rem;
  }

  .avatar-icon {
    font-size: 1.75rem;
  }

  .username {
    font-size: var(--text-xl);
  }

  .menu-item {
    padding: var(--space-4) var(--space-6);
  }

  .menu-icon {
    font-size: 1.375rem;
  }

  .menu-title {
    font-size: var(--text-base);
  }

  .menu-desc {
    font-size: var(--text-sm);
  }
}

@media (min-width: 1024px) {
  .page-header {
    margin-bottom: var(--space-10);
    padding: var(--space-12) 0;
  }

  .page-title {
    font-size: var(--text-4xl);
  }

  .page-subtitle {
    font-size: var(--text-lg);
  }

  .user-profile-section {
    margin-bottom: var(--space-16);
  }

  .profile-card {
    padding: var(--space-8);
  }

  .profile-header {
    margin-bottom: var(--space-8);
  }

  .avatar-placeholder {
    width: 5rem;
    height: 5rem;
    margin-right: var(--space-5);
  }

  .avatar-icon {
    font-size: 1.75rem;
  }

  .username {
    font-size: var(--text-2xl);
  }

  .user-level {
    gap: var(--space-3);
  }

  .level-badge {
    font-size: var(--text-sm);
    padding: var(--space-1) var(--space-3);
  }

  .level-desc {
    font-size: var(--text-base);
  }

  .edit-btn {
    padding: var(--space-3) var(--space-5);
    font-size: var(--text-base);
  }

  .stats-row {
    padding: var(--space-5) 0;
    margin-top: var(--space-8);
  }

  .stat-value {
    font-size: var(--text-3xl);
  }

  .stat-label {
    font-size: var(--text-base);
  }

  .menu-section {
    margin-bottom: var(--space-16);
  }

  .menu-item {
    padding: var(--space-5) var(--space-8);
  }

  .menu-icon {
    font-size: 1.5rem;
    margin-right: var(--space-5);
    width: 2.25rem;
  }

  .menu-title {
    font-size: var(--text-lg);
  }

  .menu-desc {
    font-size: var(--text-base);
  }

  .menu-arrow {
    font-size: var(--text-xl);
    margin-left: var(--space-4);
  }

  .logout-section {
    margin-bottom: var(--space-16);
  }

  .logout-btn {
    padding: var(--space-5);
    font-size: var(--text-lg);
  }
}
</style>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 编辑资料
const editProfile = () => {
  alert('编辑资料功能即将上线！');
};

// 打开功能
const openFeature = (feature) => {
  // 移除了 'favorites' 的处理逻辑，因为它现在直接跳转

  if (feature === 'share') {
    // 分享给朋友功能
    const shareText = `我正在使用校园垃圾分类助手，快来一起参与环保行动吧！\n${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: '校园垃圾分类助手',
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      // 降级到复制到剪贴板
      navigator.clipboard.writeText(shareText).then(() => {
        alert('分享链接已复制到剪贴板！');
      }).catch(() => {
        alert('分享失败，请手动复制链接');
      });
    }
    return;
  }
  
  // 其他功能保持"即将上线"提示
  const messages = {
    alarm: '倒垃圾闹钟功能即将上线！',
    map: '垃圾地图定位功能即将上线！',
    settings: '系统设置功能即将上线！',
    about: '关于我们页面即将上线！'
  };

  alert(messages[feature] || '功能即将上线，敬请期待！');
};

// 退出登录
const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    alert('已退出登录');
    // 这里可以添加实际的退出登录逻辑
  }
};
</script>