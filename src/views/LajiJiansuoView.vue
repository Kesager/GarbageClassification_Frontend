<template>
  <div class="search-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">垃圾检索</h1>
          <p class="page-subtitle">快速查找垃圾分类信息</p>
        </div>
        <div class="search-section">
          <div class="search-box">
            <div class="search-icon">🔍</div>
            <input type="text" placeholder="输入垃圾名称或关键词" class="search-input" v-model="searchQuery"
              @keyup.enter="performSearch">
            <button class="search-btn" @click="performSearch">
              搜索
            </button>
          </div>
        </div>
      </div>
    </header>
    <!-- 结果展示区域 -->
    <section class="result-section">
      <div class="container">
        <div class="result-card">
          <div class="result-header">
            <div class="garbage-icon" :class="currentIconClass">
              <span class="icon-emoji">{{ getCurrentEmoji() }}</span>
            </div>
            <div class="result-actions">
              <button class="share-btn" @click="shareResult" title="分享结果">
                📤
              </button>
            </div>
          </div>
          <div class="result-content">
            <h3 class="result-title">{{ currentTitle }}</h3>
            <div class="result-details">
              <div class="detail-item">
                <div class="detail-label">投放要求</div>
                <div class="detail-text">{{ currentExample }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">注意事项</div>
                <div class="detail-text">{{ currentTips }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 热门搜索区域 -->
    <section class="hot-search-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门搜索</h2>
          <p class="section-subtitle">点击查看详细分类信息</p>
        </div>
        <div class="hot-grid">
          <div v-for="item in filteredHotItems" :key="item.id"
            :class="['hot-item', item.category, { active: activeItem === item.id }]" @click="selectItem(item.id)">
            <div class="hot-item-icon">{{ item.emoji }}</div>
            <div class="hot-item-content">
              <div class="hot-item-title">{{ item.title }}</div>
              <div class="hot-item-desc">{{ item.category === 'kitchen' ? '厨余垃圾' : item.category === 'recyclable' ?
                '可回收物' : item.category === 'harmful' ? '有害垃圾' : '其他垃圾' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
/* ===== 页面布局 ===== */
.search-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding-bottom: 6rem;
  /* 为导航栏留出空间 */
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

/* ===== 结果展示区域 ===== */
.result-section {
  margin-bottom: var(--space-12);
}

.result-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.03), rgba(255, 255, 255, 0.05));
  pointer-events: none;
}

.result-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1;
}

.garbage-icon {
  width: 5rem;
  height: 5rem;
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  flex-shrink: 0;
}

.icon-emoji {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* 不同类型的图标背景色 */
.garbage-icon.kitchen-waste {
  background: linear-gradient(135deg, var(--color-kitchen), var(--color-kitchen-dark));
}

.garbage-icon.harmful-waste {
  background: linear-gradient(135deg, var(--color-harmful), var(--color-harmful-dark));
}

.garbage-icon.recyclable-waste {
  background: linear-gradient(135deg, var(--color-recyclable), var(--color-recyclable-dark));
}

.garbage-icon.other-waste {
  background: linear-gradient(135deg, var(--color-other), var(--color-other-dark));
}

.result-actions {
  display: flex;
  gap: var(--space-2);
}

.share-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  font-size: var(--text-lg);
}

.share-btn:hover {
  background-color: var(--color-primary-200);
  transform: scale(1.05);
}

.share-btn:active {
  transform: scale(0.95);
}

.result-content {
  position: relative;
  z-index: 1;
}

.result-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  line-height: 1.3;
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-item {
  padding: var(--space-3);
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  border-left: 3px solid var(--color-primary-500);
}

.detail-label {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-text {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ===== 热门搜索区域 ===== */
.hot-search-section {
  margin-bottom: var(--space-12);
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

.section-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.5;
}

.hot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-4);
}

.hot-item {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  padding: var(--space-4);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  position: relative;
  overflow: hidden;
}

.hot-item::before {
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

.hot-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hot-item:hover::before {
  opacity: 1;
}

.hot-item.active {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
  background: linear-gradient(135deg, var(--color-primary-50), var(--bg-primary));
}

.hot-item-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.hot-item-content {
  flex: 1;
  min-width: 0;
}

.hot-item-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-item-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* 不同类型的边框颜色 */
.hot-item.kitchen {
  border-left: 3px solid var(--color-kitchen);
}

.hot-item.harmful {
  border-left: 3px solid var(--color-harmful);
}

.hot-item.recyclable {
  border-left: 3px solid var(--color-recyclable);
}

.hot-item.other {
  border-left: 3px solid var(--color-other);
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .search-page {
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

  .result-section {
    margin-bottom: var(--space-8);
  }

  .result-card {
    padding: var(--space-6);
  }

  .result-header {
    margin-bottom: var(--space-4);
  }

  .garbage-icon {
    width: 4rem;
    height: 4rem;
  }

  .icon-emoji {
    font-size: 2rem;
  }

  .result-title {
    font-size: var(--text-xl);
  }

  .result-details {
    gap: var(--space-3);
  }

  .detail-item {
    padding: var(--space-2);
  }

  .hot-search-section {
    margin-bottom: var(--space-8);
  }

  .section-header {
    margin-bottom: var(--space-6);
  }

  .section-title {
    font-size: var(--text-xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }

  .hot-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--space-3);
  }

  .hot-item {
    padding: var(--space-3);
    flex-direction: column;
    text-align: center;
    gap: var(--space-2);
  }

  .hot-item-icon {
    font-size: 1.5rem;
  }

  .hot-item-title {
    font-size: var(--text-sm);
  }

  .hot-item-desc {
    font-size: var(--text-xs);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .hot-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-4);
  }

  .result-card {
    padding: var(--space-8);
  }

  .garbage-icon {
    width: 5rem;
    height: 5rem;
  }

  .icon-emoji {
    font-size: 2.5rem;
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

  .result-section {
    margin-bottom: var(--space-16);
  }

  .result-card {
    padding: var(--space-10);
  }

  .result-header {
    margin-bottom: var(--space-8);
  }

  .garbage-icon {
    width: 6rem;
    height: 6rem;
  }

  .icon-emoji {
    font-size: 3rem;
  }

  .result-title {
    font-size: var(--text-3xl);
  }

  .hot-search-section {
    margin-bottom: var(--space-16);
  }

  .section-header {
    margin-bottom: var(--space-10);
  }

  .hot-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-6);
  }

  .hot-item {
    padding: var(--space-5);
  }

  .hot-item-icon {
    font-size: 2rem;
  }

  .hot-item-title {
    font-size: var(--text-lg);
  }

  .hot-item-desc {
    font-size: var(--text-base);
  }
}

/* 移动端适配补充（原重复代码整合） */
@media (max-width: 480px) {
  .search-page {
    padding-bottom: 70px;
  }

  .search-header {
    padding: 15px;
    margin-bottom: 15px;
  }

  .search-container {
    max-width: 100%;
  }

  .search-input-wrapper {
    margin-bottom: 12px;
  }

  .search-input {
    height: 42px;
    font-size: 0.95rem;
  }

  .search-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .result-section {
    padding: 0 12px 15px;
  }

  .result-card {
    padding: 16px;
    margin-bottom: 15px;
  }

  .garbage-icon {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
    margin-right: 16px;
  }

  .card-content {
    flex: 1;
  }

  .card-title {
    font-size: 1.2rem;
    margin-bottom: 6px;
  }

  .card-example,
  .card-tips {
    font-size: 0.8rem;
  }

  .hot-search-section {
    padding: 0 12px;
  }

  .section-header {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .section-subtitle {
    font-size: 0.85rem;
  }

  .hot-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  .hot-item {
    padding: 12px;
  }

  .hot-item-icon {
    font-size: 1.5rem;
    margin-right: 10px;
  }

  .hot-item-title {
    font-size: 0.9rem;
  }

  .hot-item-desc {
    font-size: 0.75rem;
  }
}

@media (min-width: 481px) and (max-width: 767px) {
  .search-page {
    padding-bottom: 75px;
  }

  .search-header {
    padding: 20px;
    margin-bottom: 20px;
  }

  .search-container {
    max-width: 600px;
  }

  .search-input-wrapper {
    margin-bottom: 15px;
  }

  .search-input {
    height: 46px;
    font-size: 1rem;
  }

  .search-btn {
    padding: 12px 24px;
    font-size: 0.95rem;
  }

  .result-section {
    padding: 0 15px 20px;
  }

  .result-card {
    padding: 20px;
    margin-bottom: 18px;
  }

  .garbage-icon {
    width: 75px;
    height: 75px;
    font-size: 1.9rem;
    margin-right: 18px;
  }

  .card-title {
    font-size: 1.3rem;
    margin-bottom: 8px;
  }

  .card-example,
  .card-tips {
    font-size: 0.85rem;
  }

  .hot-search-section {
    padding: 0 15px;
  }

  .section-header {
    margin-bottom: 25px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }

  .hot-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }

  .hot-item {
    padding: 14px;
  }

  .hot-item-icon {
    font-size: 1.6rem;
    margin-right: 12px;
  }

  .hot-item-title {
    font-size: 0.95rem;
  }

  .hot-item-desc {
    font-size: 0.8rem;
  }
}

@media (min-width: 768px) {
  .search-page {
    padding-bottom: 80px;
  }

  .search-header {
    padding: 25px;
    margin-bottom: 25px;
  }

  .search-container {
    max-width: 700px;
  }

  .search-input-wrapper {
    margin-bottom: 18px;
  }

  .search-input {
    height: 50px;
    font-size: 1.05rem;
  }

  .search-btn {
    padding: 14px 28px;
    font-size: 1rem;
  }

  .result-section {
    padding: 0 20px 25px;
  }

  .result-card {
    padding: 24px;
    margin-bottom: 20px;
  }

  .garbage-icon {
    width: 80px;
    height: 80px;
    font-size: 2rem;
    margin-right: 20px;
  }

  .card-title {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  .card-example,
  .card-tips {
    font-size: 0.9rem;
  }

  .hot-search-section {
    padding: 0 20px;
  }

  .section-header {
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .hot-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 18px;
  }

  .hot-item {
    padding: 16px;
  }

  .hot-item-icon {
    font-size: 1.8rem;
    margin-right: 14px;
  }

  .hot-item-title {
    font-size: 1rem;
  }

  .hot-item-desc {
    font-size: 0.85rem;
  }
}
</style>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
// 获取路由实例
const route = useRoute()
// 响应式数据
const searchQuery = ref('')
const activeItem = ref('')
const currentIconClass = ref('kitchen-waste')
const currentTitle = ref('厨余垃圾')
const currentExample = ref('示例：剩菜、骨头、果壳等')
const currentTips = ref('投放提示：沥干水分后投放')
// 垃圾分类数据
const garbageTypes = {
  'leftover-item': {
    iconClass: 'kitchen-waste',
    title: '厨余垃圾',
    example: '示例：剩菜、骨头、果壳等',
    tips: '投放提示：沥干水分后投放',
    emoji: '🥬',
    category: 'kitchen'
  },
  'carton-item': {
    iconClass: 'recyclable-waste',
    title: '可回收物',
    example: '示例：纸箱、报纸、塑料等',
    tips: '投放提示：压扁后投放',
    emoji: '📦',
    category: 'recyclable'
  },
  'toilet-paper-item': {
    iconClass: 'other-waste',
    title: '其他垃圾',
    example: '示例：卫生纸、餐巾纸等',
    tips: '投放提示：无特殊要求',
    emoji: '🧻',
    category: 'other'
  },
  'glass-jar-item': {
    iconClass: 'recyclable-waste',
    title: '可回收物',
    example: '示例：玻璃罐、瓶子等',
    tips: '投放提示：清洁干净后投放',
    emoji: '🍶',
    category: 'recyclable'
  },
  'tube-item': {
    iconClass: 'harmful-waste',
    title: '有害垃圾',
    example: '示例：废旧灯管、荧光灯等',
    tips: '投放提示：小心轻放',
    emoji: '💡',
    category: 'harmful'
  },
  'bone-item': {
    iconClass: 'kitchen-waste',
    title: '厨余垃圾',
    example: '示例：骨头、鱼刺等',
    tips: '投放提示：沥干水分后投放',
    emoji: '🦴',
    category: 'kitchen'
  },
  'can-item': {
    iconClass: 'recyclable-waste',
    title: '可回收物',
    example: '示例：易拉罐、金属罐等',
    tips: '投放提示：压扁后投放',
    emoji: '🥫',
    category: 'recyclable'
  },
  'ceramic-item': {
    iconClass: 'other-waste',
    title: '其他垃圾',
    example: '示例：陶瓷碗、盘子等',
    tips: '投放提示：破碎后投放',
    emoji: '🏺',
    category: 'other'
  },
  'cosmetic-item': {
    iconClass: 'harmful-waste',
    title: '有害垃圾',
    example: '示例：过期化妆品、指甲油等',
    tips: '投放提示：请勿混合投放',
    emoji: '💄',
    category: 'harmful'
  },
  'clothes-item': {
    iconClass: 'recyclable-waste',
    title: '可回收物',
    example: '示例：旧衣服、布料等',
    tips: '投放提示：清洁干净后投放',
    emoji: '👕',
    category: 'recyclable'
  }
}
// 计算属性：过滤后的热门搜索项
const filteredHotItems = computed(() => {
  if (!searchQuery.value.trim()) {
    return Object.keys(garbageTypes).map(key => ({
      id: key,
      ...garbageTypes[key]
    }))
  }
  const query = searchQuery.value.toLowerCase()
  return Object.keys(garbageTypes)
    .filter(key => {
      const item = garbageTypes[key]
      return item.title.toLowerCase().includes(query) ||
        item.example.toLowerCase().includes(query) ||
        item.emoji.includes(query)
    })
    .map(key => ({
      id: key,
      ...garbageTypes[key]
    }))
})
// 搜索方法
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    // 如果搜索框为空，显示默认结果
    selectItem('leftover-item')
    return
  }
  const query = searchQuery.value.toLowerCase()
  const matchedItem = Object.keys(garbageTypes).find(key => {
    const item = garbageTypes[key]
    return item.title.toLowerCase().includes(query) ||
      item.example.toLowerCase().includes(query)
  })
  if (matchedItem) {
    selectItem(matchedItem)
  } else {
    // 如果没有找到匹配项，显示提示信息
    currentIconClass.value = 'other-waste'
    currentTitle.value = '未找到相关垃圾分类'
    currentExample.value = '请尝试其他关键词或选择热门搜索'
    currentTips.value = '提示：输入垃圾名称或查看热门搜索'
    activeItem.value = ''
  }
}
// 选择垃圾类型的方法
const selectItem = (itemId) => {
  const type = garbageTypes[itemId]
  if (type) {
    currentIconClass.value = type.iconClass
    currentTitle.value = type.title
    currentExample.value = type.example
    currentTips.value = type.tips
    activeItem.value = itemId
    // 清空搜索框
    searchQuery.value = ''
  }
}
// 分享功能
const shareResult = () => {
  const shareText = `${currentTitle.value}\n${currentExample.value}\n${currentTips.value}\n\n来自校园垃圾分类助手`
  if (navigator.share) {
    navigator.share({
      title: '垃圾分类查询结果',
      text: shareText,
      url: window.location.href
    }).catch(console.error)
  } else {
    // 降级到复制到剪贴板
    navigator.clipboard.writeText(shareText).then(() => {
      alert('结果已复制到剪贴板！')
    }).catch(() => {
      alert('分享失败，请手动复制结果')
    })
  }
}
// 获取当前显示的emoji
const getCurrentEmoji = () => {
  if (activeItem.value && garbageTypes[activeItem.value]) {
    return garbageTypes[activeItem.value].emoji
  }
  return '🗑️' // 默认垃圾桶图标
}
// 组件挂载时处理URL查询参数
onMounted(() => {
  const category = route.query.category
  if (category) {
    // 根据category参数找到对应的第一个项目
    const matchedItem = Object.keys(garbageTypes).find(key => {
      return garbageTypes[key].category === category
    })
    if (matchedItem) {
      selectItem(matchedItem)
    }
  } else {
    // 如果没有category参数，默认选择第一个厨余垃圾项目
    selectItem('leftover-item')
  }
})
</script>
