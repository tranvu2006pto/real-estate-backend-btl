// TAB
function openTab(tabId, btn){
  document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");
}

// TẠO CARD DYNAMIC
function createDynamicCard(house){
  const card = document.createElement("div");
  card.className = "house-card dynamic-card";
  card.dataset.price = house.price;
  card.dataset.size  = house.size;
  card.innerHTML = `
    <div class="house-img">
      <img src="${house.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80'}" alt="Nhà">
    </div>
    <div class="house-title">${house.title}</div>
    <div class="house-info">${house.size}m² • ${house.price} Tỷ</div>
    <div class="seller-info">
      <p>Người đăng: <strong>Nguyễn Khắc Tuấn</strong></p>
      <div class="contact-actions">
        <a href="tel:0987654321" class="call-btn">📞 Gọi ngay</a>
        <a href="https://zalo.me/0987654321" target="_blank" class="zalo-btn">Zalo</a>
      </div>
    </div>
  `;
  return card;
}

// LOAD HOUSES TỪ MONGODB
function loadDynamicHouses(){
  fetch("/api/houses")
    .then(res=>res.json())
    .then(houses=>{
      const banGrid  = document.querySelector("#ban .house-grid");
      const thueGrid = document.querySelector("#thue .house-grid");
      banGrid.querySelectorAll(".dynamic-card").forEach(c=>c.remove());
      thueGrid.querySelectorAll(".dynamic-card").forEach(c=>c.remove());
      houses.forEach(h=>{
        const card = createDynamicCard(h);
        if(h.type==="ban") banGrid.appendChild(card);
        else if(h.type==="thue") thueGrid.appendChild(card);
      });
    })
    .catch(err=>console.error("Không thể load nhà:",err));
}

// VALIDATE FORM
function validateHouseForm(form){
  const title=form.title.value.trim();
  const price=Number(form.price.value);
  const size=Number(form.size.value);
  const type=form.type.value;
  const area=form.area.value.trim();
  if(!title||title.length<10){alert("Tiêu đề tối thiểu 10 ký tự");return false;}
  if(isNaN(price)||price<=0){alert("Giá không hợp lệ");return false;}
  if(isNaN(size)||size<=0){alert("Diện tích không hợp lệ");return false;}
  if(!type){alert("Chọn loại hình");return false;}
  if(!area||area.length<3){alert("Khu vực không hợp lệ");return false;}
  return true;
}

// DOM READY
window.addEventListener("DOMContentLoaded",function(){
  // FORM SUBMIT
  document.addEventListener("submit",function(e){
    const form=e.target;
    if(!form.classList.contains("house-form")) return;
    e.preventDefault();
    if(!validateHouseForm(form)) return;
    const submitBtn=form.querySelector("button[type='submit']");
    submitBtn.disabled=true;
    const data={
      title: form.title.value,
      price: Number(form.price.value),
      size: Number(form.size.value),
      type: form.type.value,
      area: form.area.value
    };
    fetch("/api/houses",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>{
      alert(res.message);
      form.reset();
      submitBtn.disabled=false;
      loadDynamicHouses();
    })
    .catch(()=>{
      alert("Lỗi server");
      submitBtn.disabled=false;
    });
  });

  // FILTER
  document.querySelector('.filter-submit').addEventListener('click',function(){
    const type=document.getElementById('filter-type').value;
    const priceRange=document.getElementById('filter-price').value;
    const sizeRange=document.getElementById('filter-size').value;
    if(type!=='all'){
      const targetBtn=document.querySelector(`.tab-btn[onclick*="${type}"]`);
      if(targetBtn) openTab(type,targetBtn);
    }
    const activeTab=document.querySelector('.tab-content.active');
    const cards=activeTab.querySelectorAll('.house-card');
    cards.forEach(card=>{
      const price=parseFloat(card.dataset.price);
      const size=parseFloat(card.dataset.size);
      let pMatch=true, sMatch=true;
      if(priceRange==='0-5') pMatch=price<5;
      else if(priceRange==='5-10') pMatch=price>=5&&price<=10;
      else if(priceRange==='10+') pMatch=price>10;
      if(sizeRange==='0-50') sMatch=size<50;
      else if(sizeRange==='50-100') sMatch=size>=50&&size<=100;
      else if(sizeRange==='100+') sMatch=size>100;
      card.style.display=(pMatch&&sMatch)?'block':'none';
    });
  });

  // INIT LOAD
  loadDynamicHouses();
});
