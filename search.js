// 搜索功能实现

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
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
});