/* 统一的JavaScript文件 - 合并了script.js和search.js */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前页面导航激活状态
    setActiveNavigation();
    
    // 初始化页面特定功能
    initPageSpecificFeatures();
    
    // 初始化搜索功能
    initSearchFunctionality();
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
            (currentPage === '' && linkPage === 'index.html')) {
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

/**
 * 轮播图功能
 */
let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slideshow-slide");
    const dots = document.getElementsByClassName("slideshow-dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// 自动轮播
setInterval(function() {
    plusSlides(1);
}, 5000);

/**
 * 搜索功能实现
 */
function initSearchFunctionality() {
    // 获取搜索框和按钮元素
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    // 检查元素是否存在
    if (!searchInput || !searchButton) {
        console.log('搜索框或按钮元素未找到');
        return;
    }
    
    // 为搜索按钮添加点击事件监听
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    // 为搜索框添加回车事件监听
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // 清除之前的搜索高亮
    function clearPreviousHighlights() {
        // 移除所有mark标签，恢复原始文本
        const highlightedElements = document.querySelectorAll('.search-highlight');
        highlightedElements.forEach(span => {
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        });
    }
    
    // 搜索函数
    function performSearch() {
        // 获取搜索关键词
        const keyword = searchInput.value.trim().toLowerCase();
        
        // 检查关键词是否为空
        if (!keyword) {
            alert('请输入搜索关键词');
            return;
        }
        
        // 清除之前的搜索高亮
        clearPreviousHighlights();
        
        // 根据当前页面执行不同的搜索逻辑
        const currentPage = window.location.pathname.split('/').pop();
        
        switch(currentPage) {
            case 'index.html':
                searchHomePage(keyword);
                break;
            case 'research.html':
                searchResearchPage(keyword);
                break;
            case 'people.html':
                searchPeoplePage(keyword);
                break;
            case 'publications.html':
                searchPublicationsPage(keyword);
                break;
            case 'contact.html':
                searchContactPage(keyword);
                break;
            default:
                searchAllPages(keyword);
                break;
        }
    }
    
    // 搜索首页
    function searchHomePage(keyword) {
        const results = [];
        const newsItems = document.querySelectorAll('.news-item');
        
        newsItems.forEach((item, index) => {
            const content = item.textContent.toLowerCase();
            if (content.includes(keyword)) {
                results.push(index + 1); // 保存匹配的新闻项索引（从1开始）
                // 高亮显示匹配项
                highlightText(item, keyword);
            }
        });
        
        displaySearchResults(results, '新闻', keyword, '.news-item');
    }
    
    // 搜索研究页面
    function searchResearchPage(keyword) {
        const results = [];
        const researchItems = document.querySelectorAll('[class*="research-"]');
        
        researchItems.forEach((item, index) => {
            const content = item.textContent.toLowerCase();
            if (content.includes(keyword)) {
                results.push(index + 1);
                highlightText(item, keyword);
            }
        });
        
        displaySearchResults(results, '研究项目', keyword, '[class*="research-"]');
    }
    
    // 搜索人员页面
    function searchPeoplePage(keyword) {
        const results = [];
        const peopleItems = document.querySelectorAll('[class*="person-"]');
        
        peopleItems.forEach((item, index) => {
            const content = item.textContent.toLowerCase();
            if (content.includes(keyword)) {
                results.push(index + 1);
                highlightText(item, keyword);
            }
        });
        
        displaySearchResults(results, '人员', keyword, '[class*="person-"]');
    }
    
    // 搜索出版物页面
    function searchPublicationsPage(keyword) {
        const results = [];
        const paperItems = document.querySelectorAll('.paper-item');
        
        paperItems.forEach((item, index) => {
            const content = item.textContent.toLowerCase();
            if (content.includes(keyword)) {
                results.push(index + 1);
                highlightText(item, keyword);
            }
        });
        
        displaySearchResults(results, '出版物', keyword, '.paper-item');
    }
    
    // 搜索联系页面
    function searchContactPage(keyword) {
        const results = [];
        const contactContent = document.querySelector('.main-content');
        
        if (contactContent && contactContent.textContent.toLowerCase().includes(keyword)) {
            results.push(1);
            highlightText(contactContent, keyword);
        }
        
        displaySearchResults(results, '联系信息', keyword, '.main-content');
    }
    
    // 在所有页面中搜索
    function searchAllPages(keyword) {
        // 默认在当前页面搜索
        const pageContent = document.body.textContent.toLowerCase();
        
        if (pageContent.includes(keyword)) {
            // 高亮所有匹配的文本
            highlightAllText(document.body, keyword);
        }
    }
    
    // 高亮显示指定元素中的文本
    function highlightText(element, keyword) {
        const textNodes = getTextNodes(element);
        
        textNodes.forEach(node => {
            const text = node.textContent;
            const regex = new RegExp(`(${keyword})`, 'gi');
            const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            
            if (highlightedText !== text) {
                const newNode = document.createElement('span');
                newNode.innerHTML = highlightedText;
                node.parentNode.insertBefore(newNode, node);
                node.parentNode.removeChild(node);
            }
        });
    }
    
    // 获取元素中的所有文本节点
    function getTextNodes(element) {
        const textNodes = [];
        
        function traverse(node) {
            if (node.nodeType === 3 && node.textContent.trim()) {
                textNodes.push(node);
            } else if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'script' && node.tagName.toLowerCase() !== 'style') {
                for (let i = 0; i < node.childNodes.length; i++) {
                    traverse(node.childNodes[i]);
                }
            }
        }
        
        traverse(element);
        return textNodes;
    }
    
    // 高亮所有匹配的文本
    function highlightAllText(element, keyword) {
        const textNodes = getTextNodes(element);
        
        textNodes.forEach(node => {
            const text = node.textContent;
            const regex = new RegExp(`(${keyword})`, 'gi');
            const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            
            if (highlightedText !== text) {
                const newNode = document.createElement('span');
                newNode.innerHTML = highlightedText;
                node.parentNode.insertBefore(newNode, node);
                node.parentNode.removeChild(node);
            }
        });
    }
    
    // 显示搜索结果（直接定位到第一个匹配项）
    function displaySearchResults(results, contentType, keyword, selector) {
        if (results.length > 0) {
            // 直接滚动到第一个匹配项
            const firstMatch = document.querySelectorAll(selector)[results[0] - 1];
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}
