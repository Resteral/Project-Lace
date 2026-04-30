// ===== AgentChip Platform — Main Application =====

// --- Mock Data ---
const devices = [
  { id: 1, name: 'Front Counter Agent', type: 'voice', location: 'Main Counter', status: 'online', template: 'Store Assistant', interactions: 847, uptime: '99.8%' },
  { id: 2, name: 'Entrance Greeter', type: 'display', location: 'Front Door', status: 'online', template: 'Greeter', interactions: 1203, uptime: '99.9%' },
  { id: 3, name: 'Aisle Monitor', type: 'vision', location: 'Aisle 2-3', status: 'online', template: 'Inventory Monitor', interactions: 324, uptime: '98.7%' },
  { id: 4, name: 'Back Office Helper', type: 'voice', location: 'Office', status: 'online', template: 'Store Assistant', interactions: 156, uptime: '99.5%' },
  { id: 5, name: 'Drive-Thru Agent', type: 'full', location: 'Drive-Thru Window', status: 'online', template: 'Order Taker', interactions: 567, uptime: '99.2%' },
  { id: 6, name: 'Warehouse Scanner', type: 'vision', location: 'Storage Room', status: 'offline', template: 'Inventory Monitor', interactions: 0, uptime: '0%' },
];

const activities = [
  { type: 'success', text: '<strong>Front Counter Agent</strong> resolved customer query about store hours', time: '2 min ago' },
  { type: 'info', text: '<strong>Entrance Greeter</strong> welcomed 14 customers in the last hour', time: '5 min ago' },
  { type: 'success', text: '<strong>Drive-Thru Agent</strong> completed order #4821 successfully', time: '8 min ago' },
  { type: 'warn', text: '<strong>Aisle Monitor</strong> detected low stock on energy drinks', time: '12 min ago' },
  { type: 'info', text: '<strong>Back Office Helper</strong> generated daily inventory report', time: '18 min ago' },
  { type: 'success', text: '<strong>Front Counter Agent</strong> processed price check for customer', time: '24 min ago' },
  { type: 'warn', text: '<strong>Warehouse Scanner</strong> went offline — connection lost', time: '1 hr ago' },
  { type: 'info', text: 'System update deployed to 5 devices successfully', time: '2 hr ago' },
];

const templates = [
  { id: 'store-assistant', icon: '🏪', name: 'Store Assistant', desc: 'General customer help' },
  { id: 'greeter', icon: '👋', name: 'Greeter', desc: 'Welcome & direct customers' },
  { id: 'order-taker', icon: '🍔', name: 'Order Taker', desc: 'Food & drink orders' },
  { id: 'inventory', icon: '📦', name: 'Inventory Monitor', desc: 'Stock tracking & alerts' },
  { id: 'receptionist', icon: '🏢', name: 'Receptionist', desc: 'Office check-in & scheduling' },
  { id: 'custom', icon: '⚙️', name: 'Custom Agent', desc: 'Build from scratch' },
];

const topQueries = [
  { text: 'What are your hours?', count: 342, pct: 100 },
  { text: 'Where is the bathroom?', count: 287, pct: 84 },
  { text: 'Do you have phone chargers?', count: 198, pct: 58 },
  { text: 'What\'s the WiFi password?', count: 176, pct: 51 },
  { text: 'Can I return this item?', count: 143, pct: 42 },
  { text: 'Do you have energy drinks?', count: 121, pct: 35 },
];

// --- Agent Response Engine ---
const agentKnowledge = {
  hours: 'Our store hours are Monday-Saturday 7am-11pm, and Sunday 8am-10pm.',
  wifi: 'The WiFi password is StoreGuest2026. Connect to the network "StoreWiFi".',
  returns: 'We accept returns within 30 days with a receipt. Items must be in original condition.',
  chargers: 'Yes! Phone chargers are in Aisle 3, near the electronics section. We have Lightning, USB-C, and Micro USB.',
  drinks: 'Energy drinks are in the cooler at the back of the store. We carry Monster, Red Bull, Celsius, and Ghost.',
  bathroom: 'The restroom is located at the back of the store, past Aisle 5 on the right.',
  location: 'We\'re located at 123 Main Street, Downtown. Right next to the post office!',
};

function generateAgentResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hour') || msg.includes('open') || msg.includes('close')) return agentKnowledge.hours;
  if (msg.includes('wifi') || msg.includes('password') || msg.includes('internet')) return agentKnowledge.wifi;
  if (msg.includes('return') || msg.includes('refund')) return agentKnowledge.returns;
  if (msg.includes('charger') || msg.includes('cable') || msg.includes('phone')) return agentKnowledge.chargers;
  if (msg.includes('energy') || msg.includes('drink') || msg.includes('monster') || msg.includes('red bull')) return agentKnowledge.drinks;
  if (msg.includes('bathroom') || msg.includes('restroom') || msg.includes('toilet')) return agentKnowledge.bathroom;
  if (msg.includes('where') || msg.includes('location') || msg.includes('address')) return agentKnowledge.location;
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return 'Hey there! 😊 Welcome to the store. How can I help you today?';
  if (msg.includes('thank')) return 'You\'re welcome! Let me know if you need anything else. Have a great day! 🙌';
  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) return 'I can help with that! Could you tell me which product you\'re looking at? You can also scan the barcode on our price-check station near the entrance.';
  return 'Great question! Let me look into that for you. In the meantime, feel free to ask about our store hours, product locations, WiFi access, or return policy. I\'m here to help! 😊';
}

// --- Navigation ---
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');
const pageTitles = { dashboard: 'Dashboard', devices: 'Devices', configure: 'Configure Agent', simulator: 'Live Agent', analytics: 'Analytics' };

function navigateTo(pageId) {
  navItems.forEach(n => n.classList.remove('active'));
  pages.forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
  document.getElementById(`page-${pageId}`).classList.add('active');
  pageTitle.textContent = pageTitles[pageId] || pageId;
}

navItems.forEach(item => {
  item.addEventListener('click', () => navigateTo(item.dataset.page));
});

// --- Mobile menu ---
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// --- Populate Dashboard ---
function renderActivities() {
  const list = document.getElementById('activity-list');
  list.innerHTML = activities.map(a => `
    <div class="activity-item">
      <span class="activity-dot ${a.type}"></span>
      <span class="activity-text">${a.text}</span>
      <span class="activity-time">${a.time}</span>
    </div>
  `).join('');
}

function renderDeviceMiniList() {
  const list = document.getElementById('device-mini-list');
  list.innerHTML = devices.map(d => `
    <div class="device-mini-item">
      <div class="device-mini-icon">${d.type === 'voice' ? '🎙' : d.type === 'display' ? '📺' : d.type === 'vision' ? '📷' : '🤖'}</div>
      <div class="device-mini-info">
        <span class="device-mini-name">${d.name}</span>
        <span class="device-mini-loc">${d.location}</span>
      </div>
      <span class="status-dot ${d.status}"></span>
    </div>
  `).join('');
}

// --- Populate Devices Page ---
function renderDevices(filter = 'all') {
  const grid = document.getElementById('devices-grid');
  const filtered = filter === 'all' ? devices : devices.filter(d => d.status === filter);
  grid.innerHTML = filtered.map(d => `
    <div class="device-card" data-id="${d.id}">
      <div class="device-card-top">
        <div class="device-card-icon">
          ${d.type === 'voice' ? '🎙' : d.type === 'display' ? '📺' : d.type === 'vision' ? '📷' : '🤖'}
        </div>
        <div class="device-card-status ${d.status}">
          <span class="status-dot ${d.status}"></span>
          ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}
        </div>
      </div>
      <h4>${d.name}</h4>
      <p>${d.location} — ${d.template}</p>
      <div class="device-card-meta">
        <span>💬 ${d.interactions.toLocaleString()}</span>
        <span>⚡ ${d.uptime}</span>
        <span>🔌 ${d.type}</span>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('#page-devices .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#page-devices .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDevices(btn.dataset.filter);
  });
});

// --- Populate Templates ---
function renderTemplates() {
  const list = document.getElementById('template-list');
  list.innerHTML = templates.map((t, i) => `
    <div class="template-item ${i === 0 ? 'active' : ''}" data-template="${t.id}">
      <span class="template-icon">${t.icon}</span>
      <div class="template-info">
        <span class="template-name">${t.name}</span>
        <span class="template-desc">${t.desc}</span>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.template-item').forEach(item => {
    item.addEventListener('click', () => {
      list.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// --- Token Range Slider ---
const tokenSlider = document.getElementById('max-tokens');
const tokenValue = document.getElementById('token-value');
if (tokenSlider) {
  tokenSlider.addEventListener('input', () => {
    tokenValue.textContent = `${tokenSlider.value} tokens`;
  });
}

// --- Chat Simulator ---
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const logEntries = document.getElementById('log-entries');
let msgCount = 0;

function addChatMessage(text, sender = 'agent') {
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  const avatar = sender === 'agent'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3"/></svg>'
    : 'S';
  div.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-bubble">
      <p>${text}</p>
      <span class="msg-time">Just now</span>
    </div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'chat-msg agent';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="msg-avatar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
    </div>
    <div class="msg-bubble">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function addLog(type, badge, msg) {
  const now = new Date();
  const time = now.toTimeString().split(' ')[0];
  const div = document.createElement('div');
  div.className = `log-entry ${type}`;
  div.innerHTML = `
    <span class="log-time">${time}</span>
    <span class="log-badge ${type}">${badge}</span>
    <span class="log-msg">${msg}</span>
  `;
  logEntries.appendChild(div);
  logEntries.scrollTop = logEntries.scrollHeight;
}

function handleSend() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  msgCount++;
  addChatMessage(text, 'user');
  addLog('info', 'INPUT', `User: "${text}"`);
  addTypingIndicator();
  const delay = 600 + Math.random() * 1000;
  setTimeout(() => {
    removeTypingIndicator();
    const response = generateAgentResponse(text);
    addChatMessage(response, 'agent');
    addLog('success', 'REPLY', `Agent responded (${response.length} chars)`);
    updateInteractionCount();
  }, delay);
}

function updateInteractionCount() {
  const el = document.getElementById('stat-interactions');
  const current = parseInt(el.textContent.replace(/,/g, ''));
  el.textContent = (current + 1).toLocaleString();
}

sendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

// --- Mic Button (visual only) ---
const micBtn = document.getElementById('mic-btn');
micBtn.addEventListener('click', () => {
  micBtn.classList.toggle('recording');
  if (micBtn.classList.contains('recording')) {
    addLog('info', 'MIC', 'Voice recording started...');
    setTimeout(() => {
      micBtn.classList.remove('recording');
      addLog('info', 'MIC', 'Voice recording stopped');
      chatInput.value = 'What are your store hours?';
      handleSend();
    }, 2500);
  }
});

// --- Modal ---
const modalOverlay = document.getElementById('modal-overlay');
const pairingArea = document.getElementById('pairing-area');
const pairingCode = document.getElementById('pairing-code');

function openModal() {
  modalOverlay.classList.add('visible');
  pairingArea.style.display = 'none';
  document.getElementById('btn-register-device').textContent = 'Generate Pairing Code';
}

function closeModal() {
  modalOverlay.classList.remove('visible');
}

document.getElementById('btn-add-device').addEventListener('click', openModal);
document.getElementById('btn-new-device').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('btn-cancel-device').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

document.getElementById('btn-register-device').addEventListener('click', () => {
  const nameInput = document.getElementById('device-name-input');
  if (!nameInput.value.trim()) { nameInput.focus(); return; }
  if (pairingArea.style.display === 'none') {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 7; i++) {
      if (i === 3) { code += '-'; continue; }
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    pairingCode.textContent = code;
    pairingArea.style.display = 'block';
    document.getElementById('btn-register-device').textContent = 'Done';
  } else {
    const newDevice = {
      id: devices.length + 1,
      name: nameInput.value.trim(),
      type: document.getElementById('device-type-input').value,
      location: document.getElementById('device-location-input').value || 'Unassigned',
      status: 'online',
      template: document.getElementById('device-template-input').selectedOptions[0].text,
      interactions: 0,
      uptime: '100%',
    };
    devices.push(newDevice);
    renderDevices();
    renderDeviceMiniList();
    document.getElementById('stat-devices').textContent = devices.filter(d => d.status === 'online').length;
    closeModal();
    nameInput.value = '';
    document.getElementById('device-location-input').value = '';
  }
});

// --- Save Config Toast ---
document.getElementById('btn-save-config').addEventListener('click', () => {
  const btn = document.getElementById('btn-save-config');
  const originalText = btn.textContent;
  btn.textContent = '✓ Deployed!';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 2000);
});

// --- Analytics Charts (Canvas) ---
function drawInteractionsChart() {
  const canvas = document.getElementById('chart-interactions');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 220 * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = '220px';
  ctx.scale(dpr, dpr);
  const w = rect.width, h = 220;
  const pad = { top: 20, right: 20, bottom: 30, left: 50 };
  const data = [1820, 2340, 1960, 2780, 3100, 2847, 3200];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...data) * 1.15;
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  // Grid lines
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
  }

  // Area gradient
  const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  gradient.addColorStop(0, 'rgba(99,102,241,.3)');
  gradient.addColorStop(1, 'rgba(99,102,241,.02)');
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad.left + (chartW / (data.length - 1)) * i;
    const y = pad.top + chartH - (v / max) * chartH;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.lineTo(pad.left + chartW, h - pad.bottom);
  ctx.lineTo(pad.left, h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  data.forEach((v, i) => {
    const x = pad.left + (chartW / (data.length - 1)) * i;
    const y = pad.top + chartH - (v / max) * chartH;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots
  data.forEach((v, i) => {
    const x = pad.left + (chartW / (data.length - 1)) * i;
    const y = pad.top + chartH - (v / max) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  });

  // Labels
  ctx.fillStyle = '#55556a';
  ctx.font = '11px Inter';
  ctx.textAlign = 'center';
  labels.forEach((l, i) => {
    const x = pad.left + (chartW / (data.length - 1)) * i;
    ctx.fillText(l, x, h - 8);
  });

  // Y-axis
  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH / 4) * i;
    const val = Math.round(max - (max / 4) * i);
    ctx.fillText(val.toLocaleString(), pad.left - 8, y + 4);
  }
}

function renderTopQueries() {
  const container = document.getElementById('top-queries');
  if (!container) return;
  container.innerHTML = topQueries.map(q => `
    <div class="query-item">
      <span class="query-text">${q.text}</span>
      <div class="query-bar"><div class="query-bar-fill" style="width:${q.pct}%"></div></div>
      <span class="query-count">${q.count}</span>
    </div>
  `).join('');
}

function renderSatisfaction() {
  const container = document.getElementById('satisfaction-chart');
  if (!container) return;
  container.innerHTML = `
    <div class="donut-container">
      <canvas id="donut-canvas" width="160" height="160"></canvas>
      <div class="donut-center">
        <div class="donut-value">94%</div>
        <div class="donut-label">Satisfied</div>
      </div>
    </div>
    <div class="sat-legend">
      <div class="sat-legend-item"><span class="sat-legend-dot" style="background:#10b981"></span> Positive (94%)</div>
      <div class="sat-legend-item"><span class="sat-legend-dot" style="background:#f59e0b"></span> Neutral (4%)</div>
      <div class="sat-legend-item"><span class="sat-legend-dot" style="background:#ef4444"></span> Negative (2%)</div>
    </div>
  `;
  const canvas = document.getElementById('donut-canvas');
  const ctx = canvas.getContext('2d');
  const cx = 80, cy = 80, r = 60, lw = 14;
  const segments = [
    { pct: .94, color: '#10b981' },
    { pct: .04, color: '#f59e0b' },
    { pct: .02, color: '#ef4444' },
  ];
  let start = -Math.PI / 2;
  segments.forEach(s => {
    const end = start + s.pct * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, end);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();
    start = end + 0.03;
  });
}

// --- Clear Logs ---
document.getElementById('btn-clear-logs').addEventListener('click', () => {
  logEntries.innerHTML = '';
  addLog('info', 'SYSTEM', 'Logs cleared');
});

// --- Init ---
function init() {
  renderActivities();
  renderDeviceMiniList();
  renderDevices();
  renderTemplates();
  renderTopQueries();
  renderSatisfaction();
  setTimeout(drawInteractionsChart, 100);
}

init();
window.addEventListener('resize', () => { setTimeout(drawInteractionsChart, 200); });
