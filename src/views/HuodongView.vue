<template>
  <div class="activity-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">环保活动</h1>
          <p class="page-subtitle">参与活动，共同守护绿色家园</p>
        </div>
        <div class="header-decoration">
          <div class="leaf-icon">🍃</div>
        </div>
      </div>
    </header>

    <!-- 活动列表 -->
    <section class="activities-section">
      <div class="container">
        <div class="activities-grid">
          <!-- 垃圾大作战活动 -->
          <div class="activity-card green-theme" @click="openActivity('battle')">
            <div class="card-header">
              <div class="activity-icon">⚔️</div>
              <div class="activity-status">进行中</div>
            </div>
            <div class="card-content">
              <h2 class="activity-title">垃圾大作战</h2>
              <p class="activity-desc">快来和好友一起比拼吧，挑战垃圾分类知识，赢取环保积分！</p>
              <div class="activity-meta">
                <span class="participants">👥 1289人参与</span>
                <span class="reward">🎁 积分奖励</span>
              </div>
            </div>
            <div class="card-arrow">→</div>
          </div>

          <!-- 垃圾知识问答活动 -->
          <div class="activity-card blue-theme" @click="openActivity('quiz')">
            <div class="card-header">
              <div class="activity-icon">🧠</div>
              <div class="activity-status">热门</div>
            </div>
            <div class="card-content">
              <h2 class="activity-title">垃圾知识问答</h2>
              <p class="activity-desc">测测你的智商，挑战各类垃圾分类题目，知识改变命运！</p>
              <div class="activity-meta">
                <span class="participants">👥 2567人参与</span>
                <span class="reward">🏆 知识徽章</span>
              </div>
            </div>
            <div class="card-arrow">→</div>
          </div>

          <!-- 环保挑战活动 -->
          <div class="activity-card purple-theme" @click="openActivity('challenge')">
            <div class="card-header">
              <div class="activity-icon">🌱</div>
              <div class="activity-status">新活动</div>
            </div>
            <div class="card-content">
              <h2 class="activity-title">环保挑战赛</h2>
              <p class="activity-desc">坚持21天垃圾分类打卡，养成良好习惯，赢取环保大使称号！</p>
              <div class="activity-meta">
                <span class="participants">👥 892人参与</span>
                <span class="reward">👑 大使称号</span>
              </div>
            </div>
            <div class="card-arrow">→</div>
          </div>

          <!-- 社区回收活动 -->
          <div class="activity-card orange-theme" @click="openActivity('recycle')">
            <div class="card-header">
              <div class="activity-icon">♻️</div>
              <div class="activity-status">限时</div>
            </div>
            <div class="card-content">
              <h2 class="activity-title">社区回收日</h2>
              <p class="activity-desc">每周六上午9-11点，社区统一回收可回收物，参与就有积分！</p>
              <div class="activity-meta">
                <span class="participants">👥 456人参与</span>
                <span class="reward">💰 回收积分</span>
              </div>
            </div>
            <div class="card-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 活动统计 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-card">
          <div class="stat-item">
            <div class="stat-number">12,456</div>
            <div class="stat-label">总参与人数</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">89.2kg</div>
            <div class="stat-label">累计减排</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">156</div>
            <div class="stat-label">活动场次</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== 页面布局 ===== */
.activity-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 6rem;
  /* 为导航栏留出空间 */
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
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 12.5rem;
  height: 12.5rem;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.header-content {
  text-align: center;
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1;
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

.header-decoration {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  opacity: 0.6;
  z-index: 1;
}

.leaf-icon {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* ===== 活动区域 ===== */
.activities-section {
  margin-bottom: var(--space-12);
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

/* ===== 活动卡片 ===== */
.activity-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-left: 4px solid transparent;
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.activity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: var(--transition-normal);
}

.activity-card:hover::before {
  opacity: 1;
}

/* 不同主题的卡片样式 */
.green-theme {
  border-left-color: var(--color-primary-500);
}

.green-theme .card-header {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
}

.blue-theme {
  border-left-color: var(--color-recyclable);
}

.blue-theme .card-header {
  background: linear-gradient(135deg, var(--color-recyclable), var(--color-recyclable-dark));
}

.purple-theme {
  border-left-color: #9C27B0;
}

.purple-theme .card-header {
  background: linear-gradient(135deg, #9C27B0, #7B1FA2);
}

.orange-theme {
  border-left-color: #FF9800;
}

.orange-theme .card-header {
  background: linear-gradient(135deg, #FF9800, #F57C00);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-lg);
  color: var(--text-inverse);
  position: relative;
  z-index: 1;
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-status {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  background-color: rgba(255, 255, 255, 0.2);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--border-radius-full);
  backdrop-filter: blur(10px);
}

.card-content {
  position: relative;
  z-index: 1;
}

.activity-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  line-height: 1.3;
}

.activity-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-3);
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.participants,
.reward {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.card-arrow {
  position: absolute;
  top: 50%;
  right: var(--space-5);
  transform: translateY(-50%);
  font-size: var(--text-lg);
  color: var(--text-muted);
  transition: var(--transition-fast);
}

.activity-card:hover .card-arrow {
  right: var(--space-4);
  color: var(--color-primary-500);
}

/* ===== 统计区域 ===== */
.stats-section {
  margin-bottom: var(--space-12);
}

.stats-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  max-width: 37.5rem;
  margin: 0 auto;
}

.stat-item {
  flex: 1;
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
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background-color: var(--border-color);
  margin: 0 var(--space-4);
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .activity-page {
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

  .header-decoration {
    top: var(--space-4);
    right: var(--space-4);
  }

  .leaf-icon {
    font-size: 1.5rem;
  }

  .activities-section {
    margin-bottom: var(--space-8);
  }

  .activities-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .activity-card {
    padding: var(--space-5);
  }

  .activity-title {
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }

  .activity-desc {
    font-size: var(--text-xs);
    margin-bottom: var(--space-3);
  }

  .activity-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    font-size: var(--text-xs);
  }

  .card-arrow {
    right: var(--space-4);
  }

  .stats-section {
    margin-bottom: var(--space-8);
  }

  .stats-card {
    padding: var(--space-6);
    flex-direction: column;
    gap: var(--space-4);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: var(--text-xl);
    margin-bottom: var(--space-2);
  }

  .stat-label {
    font-size: var(--text-xs);
  }

  .stat-divider {
    width: 80%;
    height: 1px;
    margin: var(--space-3) 0;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .activities-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-5);
  }

  .activity-card {
    padding: var(--space-6);
  }

  .activity-title {
    font-size: var(--text-xl);
  }

  .activity-desc {
    font-size: var(--text-sm);
  }

  .activity-meta {
    font-size: var(--text-sm);
  }

  .stats-card {
    padding: var(--space-8);
  }

  .stat-number {
    font-size: var(--text-2xl);
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

  .activities-section {
    margin-bottom: var(--space-16);
  }

  .activities-grid {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: var(--space-8);
  }

  .activity-card {
    padding: var(--space-8);
  }

  .activity-title {
    font-size: var(--text-2xl);
  }

  .activity-desc {
    font-size: var(--text-base);
  }

  .activity-meta {
    font-size: var(--text-sm);
  }

  .stats-section {
    margin-bottom: var(--space-16);
  }

  .stats-card {
    padding: var(--space-10);
  }

  .stat-number {
    font-size: var(--text-3xl);
  }

  .stat-label {
    font-size: var(--text-base);
  }
}
</style>

<script setup>
// 活动点击处理函数
const openActivity = (activityType) => {
  const messages = {
    battle: '垃圾大作战活动即将开启！',
    quiz: '垃圾知识问答活动即将开启！',
    challenge: '环保挑战赛活动即将开启！',
    recycle: '社区回收日活动即将开启！'
  };

  alert(messages[activityType] || '活动即将开启，敬请期待！');
};
</script>
