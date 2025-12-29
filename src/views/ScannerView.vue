<!-- src/views/ScannerView.vue -->
<template>
  <div class="scanner-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">智能识别</h1>
          <p class="page-subtitle">AI智能识别垃圾分类</p>
        </div>
        <div class="header-decoration">
          <div class="scan-icon">🔍</div>
        </div>
      </div>
    </header>

    <!-- 上传检测区域 -->
    <section class="upload-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">📤 上传图像检测</h2>
          <p class="section-subtitle">选择图片文件进行AI智能识别</p>
        </div>

        <div class="upload-area">
          <div class="upload-placeholder" @click="$refs.fileInput.click()">
            <div class="upload-icon">📷</div>
            <div class="upload-text">点击选择图片</div>
            <div class="upload-hint">支持 JPG、PNG 格式</div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none"
            >
          </div>
          <button
            class="detect-btn"
            :class="{ active: selectedImage }"
            @click="predictImage"
            :disabled="!selectedImage"
          >
            🚀 开始检测
          </button>
        </div>
      </div>
    </section>

    <!-- 分割线 -->
    <div class="section-divider">
      <span class="divider-text">或</span>
    </div>

    <!-- 摄像头实时检测区域 -->
    <section class="camera-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">📹 实时摄像头检测</h2>
          <p class="section-subtitle">开启摄像头进行实时识别</p>
        </div>

        <div class="camera-area">
          <div class="video-container">
            <video ref="videoElement" autoplay playsinline muted></video>
            <canvas ref="overlayCanvas" class="overlay-canvas"></canvas>
            <div v-if="!isScanning" class="video-placeholder">
              <div class="placeholder-icon">📹</div>
              <div class="placeholder-text">点击"启动摄像头"开始检测</div>
            </div>
          </div>

          <div class="camera-controls">
            <button
              class="camera-btn start-btn"
              @click="startCamera"
              :disabled="isScanning"
            >
              <span class="btn-icon">▶️</span>
              启动摄像头
            </button>
            <button
              class="camera-btn stop-btn"
              @click="stopCamera"
              :disabled="!isScanning"
            >
              <span class="btn-icon">⏹️</span>
              停止检测
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 结果展示区域 -->
    <section class="result-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">📊 检测结果</h2>
          <p class="section-subtitle">AI识别结果将在这里显示</p>
        </div>

        <div class="result-area">
          <div ref="resultContainer" class="result-content"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

// --- 状态定义 (替代原生JS的全局变量) ---
const videoElement = ref(null);
const overlayCanvas = ref(null);
const resultContainer = ref(null);
const selectedImage = ref(null); // 存储上传的图片文件
const isScanning = ref(false);   // 标记是否正在进行摄像头扫描
let stream = null;               // 摄像头流 (不需要响应式)
let intervalId = null;           // 定时器ID (不需要响应式)
let websocket = null;            // WebSocket连接 (不需要响应式)

// 后端API地址
const API_BASE_URL = 'http://192.168.3.110:8002';

// --- 生命周期钩子 ---

// 组件挂载后，初始化WebSocket连接
onMounted(() => {
  setupWebSocket();
});

// 组件卸载前，确保所有资源都被释放
onBeforeUnmount(() => {
  stopCamera();
  if (websocket) {
    websocket.close();
    console.log('WebSocket 连接已关闭');
  }
});

// --- 方法定义 ---

/**
 * 设置WebSocket连接，用于接收实时视频检测结果
 */
function setupWebSocket() {
  const baseUrl = API_BASE_URL.replace(/\/$/, ''); // 移除尾随斜杠
  const wsUrl = `${baseUrl.replace(/^http/, 'ws')}/ws/predict`;
  websocket = new WebSocket(wsUrl);

  websocket.onopen = () => {
    console.log('WebSocket 连接已建立');
  };

  websocket.onmessage = (event) => {
    const predictions = JSON.parse(event.data);
    displayVideoResult(predictions);
  };

  websocket.onclose = () => {
    console.log('WebSocket 连接已关闭');
  };

  websocket.onerror = (error) => {
    console.error('WebSocket 错误:', error);
  };
}

/**
 * 处理图片文件上传
 */
function handleImageUpload(event) {
  selectedImage.value = event.target.files[0];
}

/**
 * 图像检测 (调用 /predict 接口)
 */
async function predictImage() {
  if (!selectedImage.value) {
    alert('请先选择一个图像文件！');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedImage.value);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    displayResult(response.data);
  } catch (error) {
    console.error('图像检测失败:', error);
    alert('图像检测失败，请检查后端服务。');
  }
}

/**
 * 启动摄像头
 */
async function startCamera() {
  if (isScanning.value) return;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = stream;
    isScanning.value = true;

    // 等待视频元数据加载完成后调整Canvas大小
    videoElement.value.onloadedmetadata = () => {
      resizeCanvas();
    };

    // 每隔1秒捕获一帧并发送
    intervalId = setInterval(captureAndSendFrame, 1000);

  } catch (error) {
    console.error('无法访问摄像头:', error);
    alert('无法访问摄像头，请确保已授予权限。');
  }
}

/**
 * 停止摄像头
 */
function stopCamera() {
  if (!isScanning.value) return;

  isScanning.value = false;
  clearInterval(intervalId);

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    videoElement.value.srcObject = null;
  }

  // 清空Canvas
  if (overlayCanvas.value) {
    const ctx = overlayCanvas.value.getContext('2d');
    ctx.clearRect(0, 0, overlayCanvas.value.width, overlayCanvas.value.height);
  }
}

/**
 * 调整Canvas尺寸以匹配视频
 */
function resizeCanvas() {
  if (!videoElement.value || !overlayCanvas.value) return;

  overlayCanvas.value.width = videoElement.value.videoWidth;
  overlayCanvas.value.height = videoElement.value.videoHeight;
}

/**
 * 捕获视频帧并通过WebSocket发送
 */
function captureAndSendFrame() {
  if (!videoElement.value || !websocket || websocket.readyState !== WebSocket.OPEN) return;

  const canvas = document.createElement('canvas');
  canvas.width = videoElement.value.videoWidth;
  canvas.height = videoElement.value.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

  // 将Canvas转为base64字符串并发送
  const imageData = canvas.toDataURL('image/jpeg', 0.8);
  websocket.send(imageData);
}

/**
 * 显示图像检测结果
 */
function displayResult(data) {
  if (!resultContainer.value) return;

  const detections = data.detections || data;

  if (!detections || detections.length === 0) {
    resultContainer.value.innerHTML = '<p>未检测到任何对象。</p>';
    return;
  }

  let resultHtml = '<ul>';
  detections.forEach(pred => {
    resultHtml += `<li>类别: ${pred.class}, 置信度: ${(pred.confidence * 100).toFixed(2)}%, 边界框: [${pred.bbox.join(', ')}]</li>`;
  });
  resultHtml += '</ul>';
  resultContainer.value.innerHTML = resultHtml;
}

/**
 * 在视频上绘制实时检测结果
 */
function displayVideoResult(data) {
  if (!overlayCanvas.value) return;

  const ctx = overlayCanvas.value.getContext('2d');
  ctx.clearRect(0, 0, overlayCanvas.value.width, overlayCanvas.value.height);

  const detections = data.detections || data;

  if (!detections || detections.length === 0) return;

  // 计算缩放因子，将原始坐标转换为显示坐标
  const scaleX = overlayCanvas.value.clientWidth / overlayCanvas.value.width;

  detections.forEach(pred => {
    const [x1, y1, x2, y2] = (pred.bbox || pred.box).map(coord => coord * scaleX); // 假设宽高比相同，使用scaleX
    const label = `${pred.class} ${(pred.confidence * 100).toFixed(1)}%`;

    // 绘制边界框
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

    // 绘制标签背景
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(x1, y1 - 20, ctx.measureText(label).width + 10, 20);

    // 绘制标签文字
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Arial';
    ctx.fillText(label, x1 + 5, y1 - 5);
  });
}
</script>

<style scoped>
/* ===== 页面布局 ===== */
.scanner-page {
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

.header-decoration {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
}

.scan-icon {
  font-size: 2rem;
  opacity: 0.6;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* ===== 区块头部样式 ===== */
.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: clamp(var(--text-xl), 4vw, var(--text-2xl));
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--text-secondary);
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.5;
}

/* ===== 上传区域 ===== */
.upload-section {
  margin-bottom: var(--space-12);
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.upload-placeholder {
  width: 100%;
  max-width: 18.75rem;
  aspect-ratio: 4/3;
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  background: linear-gradient(135deg, var(--bg-primary), rgba(255, 255, 255, 0.8));
  position: relative;
  overflow: hidden;
}

.upload-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.03), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: var(--transition-normal);
}

.upload-placeholder:hover {
  border-color: var(--color-primary-300);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.upload-placeholder:hover::before {
  opacity: 1;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: var(--space-3);
  opacity: 0.7;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.upload-text {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.upload-hint {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.detect-btn {
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--border-radius-xl);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-neutral), var(--color-neutral-dark));
  color: var(--text-inverse);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
  opacity: 0.6;
  pointer-events: none;
}

.detect-btn.active {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  opacity: 1;
  pointer-events: auto;
}

.detect-btn.active:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
}

/* ===== 分割线 ===== */
.section-divider {
  display: flex;
  align-items: center;
  margin: var(--space-8) 0;
  opacity: 0.6;
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.divider-text {
  padding: 0 var(--space-5);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  background-color: var(--bg-secondary);
}

/* ===== 摄像头区域 ===== */
.camera-section {
  margin-bottom: var(--space-12);
}

.camera-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 25rem;
  aspect-ratio: 4/3;
  background-color: #000;
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #333, #555);
  color: var(--text-inverse);
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: var(--space-3);
  opacity: 0.8;
}

.placeholder-text {
  font-size: var(--text-base);
  text-align: center;
  opacity: 0.9;
}

.camera-controls {
  display: flex;
  gap: var(--space-4);
  width: 100%;
  max-width: 25rem;
}

.camera-btn {
  flex: 1;
  padding: var(--space-3) var(--space-5);
  border: none;
  border-radius: var(--border-radius-xl);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  box-shadow: var(--shadow-sm);
}

.start-btn {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
}

.stop-btn {
  background: linear-gradient(135deg, var(--color-error), var(--color-error-dark));
  color: var(--text-inverse);
}

.stop-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-error-dark), var(--color-error));
}

.camera-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow-sm);
}

.btn-icon {
  font-size: var(--text-lg);
}

/* ===== 结果区域 ===== */
.result-section {
  margin-bottom: var(--space-12);
}

.result-area {
  min-height: 7.5rem;
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--bg-primary), rgba(255, 255, 255, 0.8));
  transition: var(--transition-normal);
}

.result-content {
  font-family: 'Courier New', monospace;
  font-size: var(--text-sm);
  color: var(--text-primary);
  line-height: 1.6;
}

.result-content:empty::before {
  content: '等待检测结果...';
  color: var(--text-secondary);
  font-style: italic;
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .scanner-page {
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

  .header-decoration {
    top: var(--space-4);
    right: var(--space-4);
  }

  .scan-icon {
    font-size: 1.5rem;
  }

  .section-header {
    margin-bottom: var(--space-6);
  }

  .section-title {
    font-size: var(--text-lg);
  }

  .section-subtitle {
    font-size: var(--text-sm);
  }

  .upload-section {
    margin-bottom: var(--space-8);
  }

  .upload-area {
    gap: var(--space-4);
  }

  .upload-placeholder {
    max-width: 100%;
    aspect-ratio: 4/3;
  }

  .upload-icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-2);
  }

  .upload-text {
    font-size: var(--text-base);
  }

  .upload-hint {
    font-size: var(--text-xs);
  }

  .detect-btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }

  .section-divider {
    margin: var(--space-6) 0;
  }

  .camera-section {
    margin-bottom: var(--space-8);
  }

  .camera-area {
    gap: var(--space-4);
  }

  .video-container {
    max-width: 100%;
  }

  .camera-controls {
    flex-direction: column;
    gap: var(--space-3);
  }

  .camera-btn {
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
  }

  .result-section {
    margin-bottom: var(--space-8);
  }

  .result-area {
    min-height: 6rem;
    padding: var(--space-4);
  }

  .result-content {
    font-size: var(--text-xs);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .camera-area {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-6);
  }

  .video-container {
    flex: 1;
    max-width: 21.875rem;
  }

  .camera-controls {
    flex-direction: column;
    width: auto;
    min-width: 8.75rem;
  }

  .camera-btn {
    padding: var(--space-4) var(--space-5);
    font-size: var(--text-base);
  }

  .result-area {
    min-height: 6.875rem;
    padding: var(--space-5);
  }

  .result-content {
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

  .section-header {
    margin-bottom: var(--space-10);
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }

  .upload-section {
    margin-bottom: var(--space-16);
  }

  .upload-area {
    gap: var(--space-8);
  }

  .upload-placeholder {
    max-width: 25rem;
  }

  .upload-icon {
    font-size: 3.5rem;
    margin-bottom: var(--space-4);
  }

  .upload-text {
    font-size: var(--text-xl);
  }

  .upload-hint {
    font-size: var(--text-base);
  }

  .detect-btn {
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-lg);
  }

  .section-divider {
    margin: var(--space-10) 0;
  }

  .camera-section {
    margin-bottom: var(--space-16);
  }

  .camera-area {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-8);
  }

  .video-container {
    flex: 1;
    max-width: 25rem;
  }

  .camera-controls {
    flex-direction: column;
    width: auto;
    min-width: 10rem;
  }

  .camera-btn {
    padding: var(--space-5) var(--space-6);
    font-size: var(--text-lg);
  }

  .result-section {
    margin-bottom: var(--space-16);
  }

  .result-area {
    min-height: 9.375rem;
    padding: var(--space-6);
  }

  .result-content {
    font-size: var(--text-base);
  }
}
</style>
