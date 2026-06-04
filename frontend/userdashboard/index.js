document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        window.location.href = '../login.html';
        return;
    }

    // Update greeting
    const username = localStorage.getItem('username') || 'Student';
    document.getElementById('user-greeting').textContent = `Welcome, ${username}`;

    // 2. Dummy Data
    const weeklyMenu = {
        'Monday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Aloo Paratha', 'Curd', 'Tea/Coffee'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Rajma Chawal', 'Roti', 'Salad'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Samosa', 'Chai'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Mixed Veg', 'Dal Fry', 'Rice', 'Roti'] }
        ],
        'Tuesday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Poha', 'Sev', 'Tea/Coffee'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Kadhi Pakoda', 'Rice', 'Roti', 'Aloo Methi'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Biscuits', 'Coffee'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Paneer Bhurji', 'Dal Tadka', 'Roti'] }
        ],
        'Wednesday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Upma', 'Chutney', 'Tea/Coffee'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Chole Bhature', 'Lassi', 'Salad'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Vada Pav', 'Chai'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Chicken Curry / Mushroom', 'Jeera Rice', 'Roti'] }
        ],
        'Thursday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Idli Sambar', 'Coconut Chutney'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Dal Makhani', 'Shahi Paneer', 'Naan/Roti'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Bhel Puri', 'Chai'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Aloo Matar', 'Yellow Dal', 'Rice', 'Roti'] }
        ],
        'Friday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Bread Jam/Butter', 'Omelette', 'Milk'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Veg Biryani', 'Raita', 'Salad', 'Gulab Jamun'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Sandwich', 'Coffee'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Egg Curry / Kofta', 'Dal', 'Rice', 'Roti'] }
        ],
        'Saturday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Puri Bhaji', 'Halwa', 'Tea'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Pav Bhaji', 'Pulao', 'Curd'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Dhokla', 'Chai'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Special Thali', 'Seasonal Sweet'] }
        ],
        'Sunday': [
            { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Chole Kulche', 'Boiled Eggs', 'Tea/Coffee'] },
            { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Special Veg Pulao', 'Paneer Masala', 'Boondi Raita'] },
            { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Popcorn / Chips', 'Cold Drink'] },
            { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Aloo Gobhi', 'Dal', 'Rice', 'Roti'] }
        ]
    };

    const dummyData = {
        attendance: [
            { meal: 'Breakfast', status: 'present' },
            { meal: 'Lunch', status: 'present' },
            { meal: 'Snacks', status: 'absent' },
            { meal: 'Dinner', status: 'absent' }
        ],
        nutrition: {
            stats: [
                { label: 'Average Daily Calories', value: '2,400 kcal', icon: 'fa-fire' },
                { label: 'Daily Protein', value: '85g', icon: 'fa-dumbbell' },
                { label: 'Dietary Status', value: 'Balanced', icon: 'fa-chart-pie' }
            ],
            breakdown: [
                { nutrient: 'Carbohydrates', amount: '320g', dailyValue: '65%' },
                { nutrient: 'Proteins', amount: '85g', dailyValue: '20%' },
                { nutrient: 'Fats', amount: '55g', dailyValue: '15%' }
            ]
        }
    };

    // 3. Rendering Functions
    function renderMenu(day) {
        const container = document.getElementById('menu-container');
        const menu = weeklyMenu[day] || weeklyMenu['Monday'];
        
        container.innerHTML = menu.map(meal => `
            <div class="menu-card">
                <div class="card-header ${meal.type}">
                    <h3><i class="fas ${meal.icon}"></i> ${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</h3>
                    <span>${meal.time}</span>
                </div>
                <div class="card-body">
                    <ul>
                        ${meal.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <button class="view-detail-btn">View Details</button>
                </div>
            </div>
        `).join('');

        // Update active day button
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-day') === day);
        });
    }

    function renderAttendance() {
        const container = document.getElementById('attendance-list');
        container.innerHTML = dummyData.attendance.map(record => `
            <div class="meal-row">
                <span>${record.meal}</span>
                <button class="btn-check ${record.status === 'absent' ? 'outline' : ''}">
                    ${record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </button>
            </div>
        `).join('');
    }

    function renderNutrition() {
        const statsContainer = document.getElementById('nutrition-stats');
        statsContainer.innerHTML = dummyData.nutrition.stats.map(stat => `
            <div class="stat-card">
                <i class="fas ${stat.icon}"></i>
                <div class="stat-info">
                    <h3>${stat.value}</h3>
                    <p>${stat.label}</p>
                </div>
            </div>
        `).join('');

        const tableBody = document.getElementById('nutrition-table-body');
        tableBody.innerHTML = dummyData.nutrition.breakdown.map(row => `
            <tr>
                <td>${row.nutrient}</td>
                <td>${row.amount}</td>
                <td>${row.dailyValue}</td>
            </tr>
        `).join('');
    }

    // Get current day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];

    // Initial render
    renderMenu(currentDay);
    renderAttendance();
    renderNutrition();

    // 4. Event Listeners
    // Day Selection
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('day-btn')) {
            const selectedDay = e.target.getAttribute('data-day');
            renderMenu(selectedDay);
        }
    });
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const contentSections = document.querySelectorAll('.content-section');
    const sectionTitle = document.getElementById('section-title');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            contentSections.forEach(section => section.classList.remove('active'));
            const target = item.getAttribute('data-target');
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active');
                sectionTitle.textContent = item.textContent.trim();
            }
        });
    });

    // Handle logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        window.location.href = '../login.html';
    });

    // Handle dynamic attendance buttons
    document.getElementById('attendance-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-check')) {
            const btn = e.target;
            if (btn.classList.contains('outline')) {
                btn.classList.remove('outline');
                btn.textContent = 'Present';
                btn.style.background = 'var(--breakfast-color)';
                btn.style.border = 'none';
                btn.style.color = 'white';
            } else {
                btn.classList.add('outline');
                btn.textContent = 'Absent';
                btn.style.background = 'transparent';
                btn.style.border = '1px solid #e74c3c';
                btn.style.color = '#e74c3c';
            }
        }
    });

    // Feedback star rating
    const stars = document.querySelectorAll('#star-rating i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    // Handle feedback form submission
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your feedback! It has been submitted successfully.');
            feedbackForm.reset();
            // Reset stars
            stars.forEach((s, index) => {
                if (index < 4) { // Default 4 stars in original HTML
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    }
});