// ==========================
// 🔍 LỌC SẢN PHẨM & TÌM KIẾM
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  updatePriceValueAndFilter();
  document.querySelectorAll(".filter-checkbox").forEach(input => {
    input.addEventListener("change", filterProducts);
  });
  document.getElementById("searchInput").addEventListener("keyup", filterProducts);
  
  // 📢 KHỞI TẠO MENU NGƯỜI DÙNG LẦN ĐẦU
  initializeUserMenu();
});

function updatePriceValueAndFilter() {
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  priceValue.textContent = priceRange.value;
  filterProducts();
}

function filterProducts() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const selectedBrands = Array.from(document.querySelectorAll(".brand:checked")).map(b => b.value);
  const selectedTypes = Array.from(document.querySelectorAll(".type:checked")).map(t => t.value);
  const priceLimit = parseInt(document.getElementById("priceRange").value);
  
  // 📢 CHỈ LỌC CÁC SẢN PHẨM TRONG KHU VỰC CHÍNH (#productList)
  const products = document.querySelectorAll("#productList .product"); 

  products.forEach(product => {
    const brand = product.getAttribute("data-brand");
    const type = product.getAttribute("data-type");
    const price = parseInt(product.getAttribute("data-price"));
    const name = product.querySelector("h3").textContent.toLowerCase();

    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
    const matchType = selectedTypes.length === 0 || selectedTypes.includes(type);
    const matchPrice = price <= priceLimit;
    const matchSearch = name.includes(searchInput);

    // Hiển thị hoặc ẩn sản phẩm
    // Giữ nguyên display: 'flex' vì #productList sử dụng grid
    product.style.display = (matchBrand && matchType && matchPrice && matchSearch) ? "flex" : "none";
  });
  
  // Kéo thanh cuộn lên đầu danh sách sản phẩm sau khi lọc
  document.getElementById("productList")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearFilters() {
  document.querySelectorAll(".filter-checkbox").forEach(input => input.checked = false);
  const priceRange = document.getElementById("priceRange");
  priceRange.value = priceRange.max;
  document.getElementById("searchInput").value = "";
  updatePriceValueAndFilter();
}


// ==========================
// 📱 MENU MOBILE
// ==========================
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("show");
}
document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("show");
  });
});

// ==========================
// 🚀 CAROUSEL SẢN PHẨM MỚI
// ==========================
const track = document.querySelector('.carousel-track');
// Lấy các sản phẩm trong track (chú ý: phải là .product-card trong .carousel-track)
const cards = document.querySelectorAll('.carousel-track .product-card'); 
// Tính toán chiều rộng thẻ sản phẩm: Chiều rộng + 2 lần margin (10px mỗi bên)
const cardWidth = cards.length > 0 ? cards[0].offsetWidth + 20 : 0; 
let currentIndex = 0;
const cardsPerView = 3; // Số thẻ hiển thị đồng thời
const slideInterval = 2000; // Tự động chuyển slide sau 2 giây (2000ms)
let autoSlideTimer;

function moveCarousel() {
  if (!track || cardWidth === 0) return;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function nextSlide() {
  if (!track || cards.length === 0) return;
  // Tính toán giới hạn index để không cuộn quá xa
  // maxIndex là vị trí cuối cùng có thể cuộn, đảm bảo ít nhất cardsPerView còn hiển thị
  const maxIndex = cards.length - Math.min(cardsPerView, cards.length); 
  
  // Logic chuyển slide
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    // Quay lại slide đầu tiên (Hiệu ứng Loop)
    currentIndex = 0; 
  }
  moveCarousel();
}

function prevSlide() {
  if (!track || cards.length === 0) return;
  const maxIndex = cards.length - Math.min(cardsPerView, cards.length);
  
  // Logic lùi slide
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    // Chuyển về slide cuối cùng (Hiệu ứng Loop)
    currentIndex = maxIndex; 
  }
  moveCarousel();
}

// 📢 BẮT ĐẦU TỰ ĐỘNG CHUYỂN SLIDE
function startAutoSlide() {
  // Dừng timer cũ nếu có để tránh chạy nhiều lần
  clearInterval(autoSlideTimer);
  // Thiết lập timer mới
  autoSlideTimer = setInterval(nextSlide, slideInterval);
}

// 📢 DỪNG TỰ ĐỘNG CHUYỂN KHI NGƯỜI DÙNG TƯƠNG TÁC
function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

// Gắn sự kiện cho nút điều hướng
document.getElementById('prevButton')?.addEventListener('click', () => {
  stopAutoSlide(); // Dừng tự động chuyển khi người dùng tương tác
  prevSlide();
  startAutoSlide(); // Chạy lại sau khi người dùng tương tác
});

document.getElementById('nextButton')?.addEventListener('click', () => {
  stopAutoSlide(); // Dừng tự động chuyển khi người dùng tương tác
  nextSlide();
  startAutoSlide(); // Chạy lại sau khi người dùng tương tác
});


// ==========================================================
// 🌐 TECHSHOP - KHỞI TẠO CHUNG
// ==========================================================

/* ... (Các hàm khác giữ nguyên) ... */

/* -------------------------------
   🚀 KHỞI ĐỘNG TRANG
--------------------------------*/
window.addEventListener("load", () => {
  // ... (Các hàm khởi tạo khác) ...
  
  // 📢 BẮT ĐẦU TỰ ĐỘNG CHUYỂN SLIDE KHI TẢI TRANG
  startAutoSlide(); 
  
  // 📢 THÊM SỰ KIỆN DỪNG/CHẠY KHI HOVER
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoSlide); // Dừng khi di chuột vào
      carouselWrapper.addEventListener('mouseleave', startAutoSlide); // Chạy lại khi di chuột ra
  }
});
// ==========================================================
// 🌐 TECHSHOP - MAIN SCRIPT
// ==========================================================

/* -------------------------------
   👤 QUẢN LÝ ĐĂNG NHẬP
--------------------------------*/
let currentUser = null;

// 📢 MỚI THÊM: Khởi tạo menu người dùng
function initializeUserMenu() {
    if (currentUser) {
        document.getElementById("userMenu").innerHTML = `
            <div class="dropdown">
              <a href="#" class="nav-item user-name" onclick="toggleUserMenu(event)">Xin chào, ${currentUser} ▼</a>
              <div id="userDropdown" class="dropdown-content">
                <a href="#">Hồ sơ</a>
                <a href="#">Cài đặt</a>
                <a href="#" onclick="logout()">Đăng xuất</a>
              </div>
            </div>`;
    } else {
        document.getElementById("userMenu").innerHTML = `
            <a href="#" class="nav-item login-btn" onclick="openLogin()">Đăng nhập</a>`;
    }
}

// 📢 MỚI THÊM: Hàm đóng mở dropdown user
function toggleUserMenu(event) {
    event.preventDefault();
    document.getElementById("userDropdown").classList.toggle("show");
}

function openLogin() {
  document.getElementById("loginSection").classList.add("show");
}

function closeLogin() {
  document.getElementById("loginSection").classList.remove("show");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
    return;
  }

  currentUser = username;
  alert(`Xin chào ${currentUser}!`);
  closeLogin();

  // 📢 CẬP NHẬT MENU SAU KHI ĐĂNG NHẬP
  initializeUserMenu();
}

function logout() {
  currentUser = null;
  alert("Bạn đã đăng xuất!");
  
  // 📢 CẬP NHẬT MENU SAU KHI ĐĂNG XUẤT
  initializeUserMenu();
}

// 📢 Đóng dropdown khi click bên ngoài (cho cả user menu và chat)
window.addEventListener('click', function(event) {
  if (currentUser) {
    const isUserMenuItem = event.target.closest('.dropdown') || event.target.matches('.user-name');
    if (!isUserMenuItem) {
      const dropdown = document.getElementById("userDropdown");
      if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  }
});

/* -------------------------------
   🛒 QUẢN LÝ GIỎ HÀNG
--------------------------------*/
let cart = []; // Mảng Giỏ hàng toàn cục

// 📢 HÀM ĐÓNG/MỞ GIỎ HÀNG
function toggleCart() {
    const cartPopup = document.getElementById("cartPopup");
    cartPopup.classList.toggle("show");
    updateCart(); 
}

// 📢 HÀM XÓA SẢN PHẨM KHỎI GIỎ HÀNG
function deleteCartItem(nameId) {
    // Lọc bỏ sản phẩm có tên (nameId) tương ứng
    cart = cart.filter(item => item.name !== nameId);
    updateCart();
}

// 📢 HÀM TĂNG/GIẢM SỐ LƯỢNG SẢN PHẨM
function changeQuantity(nameId, action) {
    const item = cart.find(i => i.name === nameId);

    if (item) {
        if (action === 'increase') {
            item.qty++;
        } else if (action === 'decrease') {
            item.qty--;
            if (item.qty <= 0) {
                // Xóa sản phẩm nếu số lượng về 0
                deleteCartItem(nameId);
                return;
            }
        }
        updateCart();
    }
}

// 📢 HÀM THÊM SẢN PHẨM VÀO GIỎ HÀNG (GIỮ NGUYÊN LOGIC CŨ)
function addToCart(name, price) {
  // Nếu chưa đăng nhập -> hiện popup đăng nhập
  if (!currentUser) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    openLogin();
    closeDetail(); 
    return;
  }

  // Sử dụng 'name' làm ID duy nhất
  const existing = cart.find((item) => item.name === name);
  if (existing) existing.qty++;
  else cart.push({ name, price, qty: 1 }); // price là giá trị tính bằng triệu

  updateCart();
  alert("✅ Đã thêm vào giỏ hàng!");
}

// 📢 HÀM CẬP NHẬT GIAO DIỆN GIỎ HÀNG (QUAN TRỌNG)
function updateCart() {
  const cartList = document.getElementById("cartList"); 
  const cartTotal = document.getElementById("totalPrice"); 
  const cartCount = document.getElementById("cartCount");
  cartList.innerHTML = "";

  let totalVND = 0; // Tổng tiền VND thực tế
  let count = 0; // Tổng số lượng sản phẩm
  
  cart.forEach((item) => {
    // Giá trị subtotal (tổng) của từng mặt hàng, tính bằng triệu
    const subtotalInMillion = item.qty * item.price; 
    
    const li = document.createElement("li");
    // Sử dụng item.name làm ID và escape ký tự ' để truyền vào onclick
    const itemId = item.name.replace(/'/g, "\\'");
    
    li.innerHTML = `
        <div class="cart-item-info">
            ${item.name}
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
        </div>
        <div class="quantity-control">
            <button class="qty-btn" onclick="changeQuantity('${itemId}', 'decrease')">-</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="changeQuantity('${itemId}', 'increase')">+</button>
        </div>
        <button onclick="deleteCartItem('${itemId}')">Xóa</button>
    `; 
    cartList.appendChild(li);
    
    // Cộng dồn tổng tiền VND thực tế
    totalVND += subtotalInMillion * 1000000; 
    count += item.qty;
  });

  // Hiển thị tổng tiền
  cartTotal.textContent = totalVND.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  cartCount.textContent = count;
}

// 📢 MỚI THÊM: Xóa giỏ hàng
function clearCart() {
  if (confirm("Bạn có chắc muốn xóa giỏ hàng không?")) {
    cart = [];
    updateCart();
  }
}

/* -------------------------------
   💻 CHI TIẾT SẢN PHẨM (POPUP)
--------------------------------*/

function formatCurrency(priceInMillion) {
  const priceInVND = priceInMillion * 1000000;
  return priceInVND.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function getProductSpecs(name) {
    return {
        // 🔹 5 sản phẩm mới
        "Acer Swift Go 14 OLED": { chip: "Intel Core i7-1355U", ram: "16GB LPDDR5", ssd: "512GB SSD", pin: "65Wh", weight: "1.25 kg", desc: "Sản phẩm mới với màn hình OLED 2.8K tuyệt đẹp, hiệu năng ổn định và thời lượng pin vượt trội. Thiết kế siêu mỏng nhẹ, là lựa chọn hoàn hảo cho người dùng thường xuyên di chuyển." },
        "MSI Modern 15 2024": { chip: "Intel Core i7-1360P", ram: "16GB DDR4", ssd: "512GB SSD", pin: "53Wh", weight: "1.7 kg", desc: "Laptop văn phòng hiện đại với chip Core i7 Gen 13 mạnh mẽ, bộ nhớ RAM lớn. Thiết kế tối giản, phù hợp với môi trường làm việc chuyên nghiệp." },
        "Gigabyte AERO 16 OLED": { chip: "Intel Core i9-13900H", ram: "32GB DDR5", ssd: "1TB SSD", pin: "99Wh", weight: "2.3 kg", desc: "Máy trạm di động hiệu năng cao, chuyên dùng cho thiết kế đồ họa, chỉnh sửa video và các tác vụ kỹ thuật nặng. Màn hình OLED cho màu sắc chuẩn xác tuyệt đối." },
        "Asus ROG Zephyrus G14": { chip: "AMD Ryzen 9 7940HS", ram: "32GB DDR5", ssd: "1TB SSD", pin: "76Wh", weight: "1.7 kg", desc: "Laptop Gaming cao cấp với chip Ryzen 9 và card đồ họa RTX 4060. Thiết kế nhỏ gọn, mạnh mẽ, đáp ứng mọi tựa game AAA." },
        "HP EliteBook 840 G10": { chip: "Intel Core i7-1355U", ram: "16GB LPDDR5", ssd: "1TB SSD", pin: "58Wh", weight: "1.36 kg", desc: "Dòng laptop doanh nhân siêu bền bỉ, bảo mật cao cấp, thời lượng pin cả ngày dài. Chất liệu kim loại sang trọng, đạt chuẩn quân đội." },

        // 🔹 Các sản phẩm cũ
        "Asus ROG Strix G15": { chip: "Ryzen 7 6800H", ram: "16GB DDR5", ssd: "512GB SSD", pin: "90Wh", weight: "2.3 kg", desc: "Gaming laptop với hiệu năng ổn định, tản nhiệt tốt, phù hợp cho người mới bắt đầu hoặc game thủ tầm trung." },
        "HP Spectre x360": { chip: "Core i7-1355U", ram: "16GB LPDDR4x", ssd: "1TB SSD", pin: "66Wh", weight: "1.36 kg", desc: "Thiết kế xoay gập 360 độ linh hoạt, màn hình cảm ứng sắc nét. Phù hợp cho công việc sáng tạo và doanh nhân." },
        "Dell Latitude 5420": { chip: "Core i5-1245U", ram: "16GB DDR4", ssd: "512GB SSD", pin: "63Wh", weight: "1.4 kg", desc: "Laptop văn phòng bền bỉ, cấu hình đủ dùng cho các tác vụ công sở hàng ngày, có khả năng nâng cấp tốt." },
        "Lenovo Legion 5 Pro": { chip: "Ryzen 7 6800H", ram: "16GB DDR5", ssd: "1TB SSD", pin: "80Wh", weight: "2.45 kg", desc: "Màn hình 16 inch QHD+ 165Hz, hiệu năng gaming mạnh mẽ trong tầm giá, là lựa chọn hàng đầu cho game thủ chuyên nghiệp." },
        "Asus ZenBook 14": { chip: "Core i7-1360P", ram: "16GB LPDDR5", ssd: "512GB SSD", pin: "75Wh", weight: "1.3 kg", desc: "Thiết kế cao cấp, mỏng nhẹ, pin trâu. Phù hợp với sinh viên và những người cần một chiếc laptop đẹp và di động." },
        "HP Omen 16": { chip: "Core i7-13700HX", ram: "16GB DDR5", ssd: "1TB SSD", pin: "83Wh", weight: "2.35 kg", desc: "Hiệu năng khủng, thiết kế tinh tế, không quá hầm hố. Đáp ứng tốt cả nhu cầu gaming và làm việc chuyên nghiệp." },
        "Dell G15 Gaming": { chip: "Core i7-12700H", ram: "16GB DDR5", ssd: "512GB SSD", pin: "86Wh", weight: "2.6 kg", desc: "Thiết kế lấy cảm hứng từ tàu không gian, tản nhiệt hiệu quả, là một lựa chọn gaming giá trị." }
    }[name] || { chip: "Đang cập nhật", ram: "Đang cập nhật", ssd: "Đang cập nhật", pin: "Đang cập nhật", weight: "Đang cập nhật", desc: "Thông tin chi tiết về sản phẩm đang được cập nhật." };
}

// 📢 HOÀN THIỆN HÀM openDetail
function openDetail(name, type, price, imgSrc) {
  const detailPopup = document.getElementById("productDetailPopup");
  const specs = getProductSpecs(name);
  
  // Gán giá trị vào các element
  document.getElementById("detailImg").src = imgSrc;
  document.getElementById("detailImg").alt = name;
  document.getElementById("detailName").textContent = name;
  document.getElementById("detailType").textContent = type;
  document.getElementById("detailPrice").textContent = formatCurrency(price);
  document.getElementById("specChip").textContent = specs.chip;
  document.getElementById("specRam").textContent = specs.ram;
  document.getElementById("specSsd").textContent = specs.ssd;
  document.getElementById("specPin").textContent = specs.pin;
  document.getElementById("specWeight").textContent = specs.weight;
  document.getElementById("detailDescription").textContent = specs.desc;
  
  // Gán hàm addToCart vào nút Thêm vào giỏ hàng
  document.getElementById("detailAddToCartBtn").onclick = () => {
    addToCart(name, price);
  };

  // Hiển thị popup
  detailPopup.style.display = "flex";
}

// 📢 MỚI THÊM: Hàm đóng popup chi tiết
function closeDetail() {
  document.getElementById("productDetailPopup").style.display = "none";
}

/* -------------------------------
   💬 CHAT BOT (GIỮ NGUYÊN)
--------------------------------*/
function initializeChat() {
  const chatBtn = document.getElementById("chatButton");
  const chatBox = document.getElementById("chatBox");

  chatBtn.onclick = () => {
    chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
  };

  document.getElementById("chatSend").onclick = () => {
    sendMessage(null); // Gọi sendMessage khi click Gửi
  };
}

function sendMessage(event) {
  const input = document.getElementById("chatInput");
  // Chỉ gửi khi nhấn Enter hoặc click nút Gửi (event là null khi click nút)
  if (event && event.key !== 'Enter' && event.type !== 'submit') return;

  const msgBox = document.getElementById("chatMessages");
  if (input.value.trim() !== "") {
    msgBox.innerHTML += `<div><b>Bạn:</b> ${input.value}</div>`;
    input.value = "";
    msgBox.scrollTop = msgBox.scrollHeight;
    setTimeout(() => {
      msgBox.innerHTML += `<div><b>Bot:</b> Cảm ơn bạn! Nhân viên sẽ phản hồi sớm.</div>`;
      msgBox.scrollTop = msgBox.scrollHeight;
    }, 800);
  }
}

/* -------------------------------
   🚀 KHỞI ĐỘNG TRANG
--------------------------------*/
window.addEventListener("load", () => {
  initializeChat();
  updateCart(); // Đảm bảo giỏ hàng được cập nhật khi tải trang
});

