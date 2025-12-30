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
            :data-id="item.id"
          >
            <div class="item-icon">{{ item.emoji }}</div>
            <div class="item-content">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-desc">{{ getCategoryText(item.category) }}</div>
              <div class="item-detail">{{ item.example }}</div>
            </div>
            <!-- 删除收藏按钮 -->
            <button 
              class="delete-btn" 
              @click="showDeleteDialog(item.id, item.title)" 
              :aria-label="`删除${item.title}收藏`"
            >
              <span class="delete-icon">删除</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="delete-confirm-modal">
      <div class="modal-content">
        <h3 class="modal-title">取消收藏</h3>
        <p class="modal-message">确定要取消收藏"{{ deletingItemTitle }}"吗？</p>
        <div class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="cancelDelete">取消</button>
          <button class="modal-btn confirm-btn" @click="confirmDelete">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面基础样式 */
.favorites-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 6rem; /* 为底部导航留出空间 */
}

/* 页面头部样式 */
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

/* 收藏列表区域 */
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
  animation: fadeIn 0.3s ease-in-out;
}

/* 删除动画效果 */
.favorite-item.deleting {
  animation: fadeOut 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(10px); height: 0; padding: 0; margin: 0; overflow: hidden; }
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 删除按钮样式 */

.delete-btn {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
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

/* 删除确认对话框样式 */
.delete-confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
}

.modal-content {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  padding: var(--space-6);
  width: 90%;
  max-width: 300px;
  box-shadow: var(--shadow-xl);
  animation: scaleIn 0.2s ease-in-out;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  text-align: center;
}

.modal-message {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  text-align: center;
}

.modal-buttons {
  display: flex;
  gap: var(--space-3);
}

.modal-btn {
  flex: 1;
  padding: var(--space-3);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: var(--transition-normal);
  font-size: var(--text-base);
}

.cancel-btn {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.cancel-btn:hover {
  background-color: var(--bg-tertiary);
}

.confirm-btn {
  background-color: var(--color-harmful);
  color: var(--text-inverse);
  border: none;
}

.confirm-btn:hover {
  background-color: var(--color-harmful-dark);
}

/* 响应式设计 */
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 路由实例
const router = useRouter()

// 收藏列表数据
const favorites = ref([])
// 删除确认相关状态
const showDeleteConfirm = ref(false)
const deletingItemId = ref(null)
const deletingItemTitle = ref('')

// 返回上一页
const goBack = () => {
  window.history.back()
}

// 从本地存储加载收藏数据
const loadFavorites = () => {
  const saved = localStorage.getItem('garbageFavorites')
  if (saved) {
    try {
      favorites.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse favorites from localStorage:', e)
      favorites.value = []
    }
  }
}

// 保存收藏数据到本地存储
const saveFavorites = () => {
  try {
    localStorage.setItem('garbageFavorites', JSON.stringify(favorites.value))
  } catch (e) {
    console.error('Failed to save favorites to localStorage:', e)
  }
}

// 显示删除确认对话框
const showDeleteDialog = (id, title) => {
  deletingItemId.value = id
  deletingItemTitle.value = title
  showDeleteConfirm.value = true
}

// 取消删除
const cancelDelete = () => {
  showDeleteConfirm.value = false
  deletingItemId.value = null
  deletingItemTitle.value = ''
}

// 确认删除
const confirmDelete = () => {
  if (deletingItemId.value !== null) {
    // 找到要删除的项目索引
    const index = favorites.value.findIndex(item => item.id === deletingItemId.value)
    if (index !== -1) {
      // 添加删除动画类
      const itemElement = document.querySelector(`.favorite-item[data-id="${deletingItemId.value}"]`)
      if (itemElement) {
        itemElement.classList.add('deleting')
        
        // 等待动画完成后再从数据中移除
        setTimeout(() => {
          favorites.value.splice(index, 1)
          saveFavorites()
          
          // 重置删除状态
          showDeleteConfirm.value = false
          deletingItemId.value = null
          deletingItemTitle.value = ''
        }, 300) // 与动画持续时间一致
      } else {
        // 如果找不到元素，直接删除
        favorites.value.splice(index, 1)
        saveFavorites()
        showDeleteConfirm.value = false
        deletingItemId.value = null
        deletingItemTitle.value = ''
      }
    }
  }
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