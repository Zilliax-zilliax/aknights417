// 获取元素
const box = document.querySelector("#box");
const ul = box.querySelector(".box-ul");
const lis = ul.querySelectorAll(".box-li");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
const indicators = document.querySelectorAll(".indicator");

// 图片数量限制为9张
const maxIndex = lis.length - 1; // 根据实际图片数量计算
// 每张图片的宽度
const width = 500;
// 当前图片索引（从0开始）
let currentIndex = 0;
let autoPlayTimer;

// 更新指示器状态
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index <= maxIndex) {
      // 只处理有效的指示器
      indicator.classList.toggle("active", index === currentIndex);
    }
  });
}

// 切换到指定索引的图片
function slideTo(index) {
  // 确保索引在有效范围内
  if (index < 0) index = maxIndex;
  if (index > maxIndex) index = 0;

  currentIndex = index;
  ul.style.left = -currentIndex * width + "px";
  updateIndicators();
}

// 向左切换
leftBtn.addEventListener("click", () => {
  slideTo(currentIndex - 1);
});

// 向右切换
rightBtn.addEventListener("click", () => {
  slideTo(currentIndex + 1);
});

// 为每个指示器添加点击事件
indicators.forEach((indicator, index) => {
  if (index <= maxIndex) {
    // 只处理有效的指示器
    indicator.addEventListener("click", () => {
      slideTo(index);
    });
  }
});

// 自动播放
function startAutoPlay() {
  autoPlayTimer = setInterval(() => {
    slideTo(currentIndex + 1);
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayTimer);
}

// 鼠标进入停止轮播
box.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

// 鼠标离开继续轮播
box.addEventListener("mouseleave", () => {
  startAutoPlay();
});

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  // 确保所有元素都正确加载
  slideTo(0);
  // 开始自动播放
  startAutoPlay();
});
