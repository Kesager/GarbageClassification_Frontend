<template>
  <div class="favorites-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <!-- 返回按钮 -->
        <button class="back-button" @click="goBack">
          <span class="back-icon">←</span>
        </button>
        <div class="header-content">
          <h1 class="page-title">我的收藏</h1>
          <p class="page-subtitle">查看和管理您收藏的垃圾分类信息</p>
        </div>
      </div>
    </header>

    <!-- 收藏列表区域 -->
    <section class="favorites-section">
      <div class="container">
        <!-- 空状态提示 -->
        <div v-if="favorites.length === 0" class="empty-state">
          <div class="empty-icon">⭐</div>
          <div class="empty-text">您还没有收藏任何内容</div>
          <p class="empty-desc">在垃圾分类详情页点击收藏按钮添加内容</p>
          <button class="empty-btn" @click="goToSearch">去检索垃圾</button>
        </div>

        <!-- 收藏列表 -->
        <div v-else class="favorites-list">
          <div 
            v-for="(item, index) in favorites" 
            :key="item.id" 
            :class="['favorite-item', item.category]"
          >
            <div class="item-icon">{{ item.emoji }}</div>
            <div class="item-content">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-desc">{{ getCategoryText(item.category) }}</div>
              <div class="item-detail">{{ item.example }}</div>
            </div>
            <div class="item-actions">
              <!-- 引入删除收藏组件 -->
              <DeleteFavoriteButton 
                @confirm-delete="removeFavorite(index)" 
                :aria-label="`删除${item.title}收藏`"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 删除收藏按钮组件模板 -->
    <template id="DeleteFavoriteButton">
      <button 
        class="delete-btn" 
        @click="handleClick" 
        :aria-label="ariaLabel"
      >
        <span class="delete-icon">🗑️</span>
      </button>
    </template>
  </div>
</template>

<style scoped>
/* 原有样式保持不变 */
/* ===== 页面基础样式 ===== */
.favorites-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 6rem; /* 为底部导航留出空间 */
}

/* ===== 页面头部样式 ===== */
.page-header {
  background: linear-gradient(135deg, var(--color-primary-50), var(--bg-primary));
  border-bottom-left-radius: var(--border-radius-3xl);
  border-bottom-right-radius: var(--border-radius-3xl);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-8);
  padding: var(--space-8) 0;
  position: relative;
}

.back-button {
  position: absolute;
  top: 50%;
  left: var(--space-4);
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  font-size: var(--text-lg);
  font-weight: bold;
  z-index: 10;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.05);
}

.back-button:active {
  transform: translateY(-50%) scale(0.95);
}

.header-content {
  text-align: center;
  padding-left: 3rem;
  padding-right: 3rem;
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

/* ===== 收藏列表区域 ===== */
.favorites-section {
  margin-bottom: var(--space-12);
}

.empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-4);
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--space-4);
  color: var(--color-primary-300);
}

.empty-text {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;
}

.empty-btn {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
  border: none;
  border-radius: var(--border-radius-xl);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.empty-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
}

.empty-btn:active {
  transform: translateY(0);
}

.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}

.favorite-item {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  padding: var(--space-4);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  position: relative;
  overflow: hidden;
}

.favorite-item::before {
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

.favorite-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.favorite-item:hover::before {
  opacity: 1;
}

/* 不同类型的边框标识 */
.favorite-item.kitchen { border-left: 3px solid var(--color-kitchen); }
.favorite-item.harmful { border-left: 3px solid var(--color-harmful); }
.favorite-item.recyclable { border-left: 3px solid var(--color-recyclable); }
.favorite-item.other { border-left: 3px solid var(--color-other); }

.item-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: var(--space-1);
}

.item-detail {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: 1.4;
  /* 标准属性（现代浏览器支持） */
  display: -webkit-box; /* WebKit私有：弹性盒模型 */
  display: box; /* 早期标准写法 */
  -webkit-line-clamp: 2; /* WebKit私有：限制显示行数 */
  line-clamp: 2; /* 标准属性：限制显示行数 */
  -webkit-box-orient: vertical; /* WebKit私有：设置弹性盒方向为垂直 */
  box-orient: vertical; /* 早期标准写法 */
  overflow: hidden; /* 隐藏溢出内容 */
}

/* ===== 删除按钮样式 ===== */
.item-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.delete-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-error-100);
  color: var(--color-error);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  font-size: var(--text-sm);
  pointer-events: auto;
}

.delete-btn:hover {
  background-color: var(--color-error-200);
  transform: scale(1.05);
}

.delete-btn:active {
  transform: scale(0.9);
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .favorites-page { padding-bottom: 5rem; }
  .page-header { margin-bottom: var(--space-6); padding: var(--space-6) 0; }
  .back-button { width: 2.5rem; height: 2.5rem; font-size: var(--text-base); }
  .header-content { padding-left: 2.5rem; padding-right: 2.5rem; }
  .page-title { font-size: var(--text-2xl); }
  .page-subtitle { font-size: var(--text-sm); }
  .favorites-section { margin-bottom: var(--space-8); padding: 0 var(--space-4); }
  .empty-state { padding: var(--space-8) var(--space-3); }
  .empty-icon { font-size: 3rem; }
  .empty-text { font-size: var(--text-lg); }
  .empty-desc { font-size: var(--text-sm); }
  .favorites-list { grid-template-columns: 1fr; gap: var(--space-3); }
  .favorite-item { padding: var(--space-3); }
  .item-icon { font-size: 1.5rem; }
  .item-title { font-size: var(--text-sm); }
  .item-desc { font-size: var(--text-xs); }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .favorites-list { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .page-header { margin-bottom: var(--space-10); padding: var(--space-12) 0; }
  .back-button { width: 3.5rem; height: 3.5rem; font-size: var(--text-xl); left: var(--space-8); }
  .header-content { padding-left: 3.5rem; padding-right: 3.5rem; }
  .favorites-section { margin-bottom: var(--space-16); }
  .favorites-list { grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
  .favorite-item { padding: var(--space-5); }
  .item-icon { font-size: 2rem; }
  .item-title { font-size: var(--text-lg); }
  .item-desc { font-size: var(--text-base); }
}
</style>

<script setup>
import { ref, onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// 定义删除收藏按钮组件（改用Vue模板写法，避免JSX编译错误）
const DeleteFavoriteButton = defineComponent({
  template: '#DeleteFavoriteButton', // 关联模板ID
  emits: ['confirm-delete'],
  props: {
    ariaLabel: {
      type: String,
      default: '删除此收藏'
    }
  },
  setup(props, { emit }) {
    const handleClick = () => {
      if (confirm('确定要取消收藏吗？')) {
        emit('confirm-delete')
      }
    }

    return {
      handleClick,
      props // 暴露props供模板使用
    }
  }
})

// 路由实例
const router = useRouter()

// 收藏列表数据
const favorites = ref([])

// 返回上一页
const goBack = () => {
  window.history.back()
}

// 从本地存储加载收藏数据
const loadFavorites = () => {
  const saved = localStorage.getItem('garbageFavorites')
  if (saved) {
    favorites.value = JSON.parse(saved)
  }
}

// 保存收藏数据到本地存储
const saveFavorites = () => {
  localStorage.setItem('garbageFavorites', JSON.stringify(favorites.value))
}

// 移除收藏
const removeFavorite = (index) => {
  // 从数组中移除该项，Vue的响应式系统会自动更新视图
  favorites.value.splice(index, 1)
  // 将更新后的数组保存到本地存储
  saveFavorites()
}

// 跳转到搜索页
const goToSearch = () => {
  router.push('/search') // 假设垃圾检索页面的路由是 '/search'
}

// 转换分类文本
const getCategoryText = (category) => {
  const categoryMap = {
    kitchen: '厨余垃圾',
    recyclable: '可回收物',
    harmful: '有害垃圾',
    other: '其他垃圾'
  }
  return categoryMap[category] || '未知分类'
}

// 组件挂载时加载数据
onMounted(() => {
  loadFavorites()
})
</script>