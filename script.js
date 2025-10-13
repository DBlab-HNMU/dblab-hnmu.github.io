/* 统一的JavaScript文件 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前页面导航激活状态
    setActiveNavigation();
});

/**
 * 设置当前页面的导航链接激活状态
 */
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === linkPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 出版物页面的年份切换功能
 */
function initPublicationYearNavigation() {
    const yearLinks = document.querySelectorAll('.year-link');
    if (yearLinks.length > 0) {
        const yearSections = document.querySelectorAll('.year-section');
        
        // 默认显示所有年份
        showYear('all');

        yearLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const year = this.getAttribute('data-year');
                showYear(year);
            });
        });

        function showYear(year) {
            // 移除所有激活状态
            yearLinks.forEach(link => {
                link.classList.remove('active');
            });

            // 设置对应链接为激活状态
            const targetLink = document.querySelector(`[data-year="${year}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }

            // 处理显示逻辑
            if (year === 'all') {
                // 显示所有年份
                yearSections.forEach(section => {
                    section.classList.remove('hidden');
                });
            } else {
                // 显示选中年份，隐藏其他年份
                yearSections.forEach(section => {
                    if (section.id === `year-${year}`) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }
        }
    }
}

/**
 * 联系页面的Font Awesome图标检查和备用方案
 */
function checkFontAwesomeIcons() {
    const contactAvatars = document.querySelectorAll('.contact-avatar');
    if (contactAvatars.length > 0) {
        setTimeout(function() {
            const icons = document.querySelectorAll('.fa-user');
            let iconsLoaded = true;
            
            icons.forEach(icon => {
                // 检查图标是否可见（Font Awesome加载后会将<i>元素转换为<svg>）
                if (icon.tagName === 'I') {
                    iconsLoaded = false;
                }
            });
            
            if (!iconsLoaded) {
                console.log('Font Awesome not loaded, using fallback');
                // 使用SVG作为备用方案
                const avatars = document.querySelectorAll('.contact-avatar');
                avatars.forEach(avatar => {
                    avatar.innerHTML = `
                        <svg class="avatar-svg" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    `;
                });
            }
        }, 1000);
    }
}

// 初始化页面特定功能
function initPageSpecificFeatures() {
    // 检查并初始化出版物页面的年份导航
    initPublicationYearNavigation();
    
    // 检查联系页面的Font Awesome图标
    checkFontAwesomeIcons();
}

// 等待DOM加载完成后初始化页面特定功能
document.addEventListener('DOMContentLoaded', function() {
    initPageSpecificFeatures();
});