/**
 * 显示右面板功能
 */
(function() {
    var showPanelButton = document.getElementById('show-panel-button'),
        text = showPanelButton.getElementsByTagName('span')[0],
        partRight = document.getElementsByClassName('part-right')[0];

    EventUtil.addHandler(showPanelButton, 'click', function() {
        if (ClassUtil.hasClass(partRight, 'show-part-right')) {
            ClassUtil.removeClass(partRight, 'show-part-right');
            text.innerHTML = '筛选条件';
        } else {
            ClassUtil.addClass(partRight, 'show-part-right');
            text.innerHTML = '收起';
        }
    });
})();

/**
 * 点击顶部导航栏
 */
(function() {
    var headerLi = document.getElementsByClassName('header-ul')[0].getElementsByTagName('li');
        firstMenu = document.getElementsByClassName('first-menu')[0];

    for (let i = 0; i < headerLi.length; i++) {
        EventUtil.addHandler(headerLi[i], 'click', headerLicallback);
    }
    function headerLicallback(e) {
        var content = e.target.innerHTML,
            list = firstMenu.getElementsByTagName('a');

        // 判断已经是否存在这个list项
        for(let i = 0; i < list.length; i++) {
            if (content === list[i].innerHTML) {
                switchPartContainer(content);
                return;
            }
        } 
        // 创建一个菜单栏
        createLi(content);

        // 切换不同的面板
        switchPartContainer(content);
    }
    /**
     * 创建一个列表顶
     * @param {string} content 
     */
    function createLi(content) {
        var docFragment = document.createDocumentFragment(),
            li = document.createElement('li'),
            a = document.createElement('a'),
            button = document.createElement('button'),
            text = document.createTextNode(content);

        a.setAttribute('href', 'javascript:');
        button.setAttribute('class', 'close-button');
        a.appendChild(text);
        li.appendChild(a);
        li.appendChild(button);
        docFragment.appendChild(li);
        firstMenu.appendChild(docFragment);
        EventUtil.addHandler(button, 'click', closePartCallback);
        EventUtil.addHandler(li, 'click', selectPart);
    } 
    /**
     * 关闭某个菜单
     * @param {Event} e 
     */
    function closePartCallback(e) {
        var thisLi = e.target.parentNode,
            lastLi = thisLi.previousSibling,
            thisPart = document.getElementsByClassName('show')[0];
            
        if (lastLi != null) {
            content = lastLi.getElementsByTagName('a')[0].innerHTML;
            print(content);
            switchPartContainer(content);
        }
        // 关闭当前的部分
        ClassUtil.removeClass(thisPart, 'show');
        // 解除事件绑定
        EventUtil.removeHandler(e.target, 'click', closePartCallback);
        firstMenu.removeChild(e.target.parentNode);
        // 阻止冒泡
        e.stopPropagation();
    }
    /**
     * 点击导航栏显示某个菜单
     * @param {Event} e 
     */
    function selectPart(e) {
        var content = e.target.innerHTML;
        switchPartContainer(content);
        print(e.currentTarget);
        // ClassUtil.addClass(li, 'first-menu-li-acitve');
        EventUtil.removeHandler(e.target, 'click', selectPart);
    }

    /**
     * 切换所有的面板函数
     * 通过添加或者删除一个类show来实现
     * @param {int} index 
     * 0 代表 奖项
     * 1 代表 成员信息
     * 2 代表 导入导出功能
     */
    function switchPartContainer(content) { 
        var index = {
            '所获奖项': 0,
            '成员信息': 1,
            '导入导出': 2,
            '编辑奖项': 3
        };
        
        var everyPart = document.getElementsByClassName('part');

        for (let i = 0; i < everyPart.length; i++) {
            ClassUtil.removeClass(everyPart[i], 'show');
        }
        ClassUtil.addClass(everyPart[index[content]], 'show');
    }
    /**
     * 隐藏某个容器
     */
    function hidePartContainer(index) {
        
    }
    /**
     * 初始化奖项容器
     */
    function initprizeContainer() {
        var prizeContainer = document.getElementsByClassName('prize-container')[0],

        prizeModel = `<li>
                        <a href="javascript:">
                            <div class="prize-img-container">
                                <img src="" class="prize-img">
                            </div>
                            <div class="prize-info-container">
                                <h1 class="prize-name"></h1>
                                <p class="prize-time-container"><span class="prize-time">2018-02-02</span></p>
                                <p><span class="prize-people"></span></p>                                
                            </div>
                        </a>
                    </li>`;
        //请求后
        
    }
    /**
     * 点击某一个选项时
     */
    function selectPrize() {

    }
})();


(function() {
    var i;
    /**
     * @description 显示成员的组别
     */
    function showInformationGroup(eventType) {
        if (eventType == 'mouseover') {
            if (ClassUtil.hasClass($(this).children('div')[0], 'show-member-group') == false) {
                ClassUtil.addClass($(this).children('div')[0], 'show-member-group')
            }
        } else {
            if (ClassUtil.hasClass($(this).children('div')[0], 'show-member-group') == true) {
                ClassUtil.removeClass($(this).children('div')[0], 'show-member-group')
            }
        }
        
    }
    // 添加鼠标事件的监听
    for (i = 0; i < $('.member-information-list-container li').length; i++) {
        $('.member-information-list-container li')[i].onmouseover = function(event) {
            showInformationGroup.call(this, event.type);
        }
        $('.member-information-list-container li')[i].onmouseleave = function(event) {
            showInformationGroup.call(this, event.type);
        }
    }
    /**
     * @description 对个人信息查看表的监听
     * @param {object} event 事件监听对象
     */
    function informationListClickListen(event) {

    }
})()

function informationDetailRequest()