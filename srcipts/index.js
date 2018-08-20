/**
 * 初始化右操作面板功能
 */
(function() {
    var showPanelButton = document.getElementById('show-panel-button'),
        text = showPanelButton.getElementsByTagName('span')[0],
        partRight = document.getElementsByClassName('part-right')[0],
        panel = document.getElementsByClassName('panel');

    EventUtil.addHandler(showPanelButton, 'click', fn);

    function fn() {    
        if (ClassUtil.hasClass(partRight, 'show-part-right')) {
            ClassUtil.removeClass(partRight, 'show-part-right');
            text.innerHTML = '筛选条件';
        } else {
            ClassUtil.addClass(partRight, 'show-part-right');
            text.innerHTML = '收起';

            for (let i = 0; i < panel.length; i++) {
                ClassUtil.removeClass(panel[i], 'show');
            }
    
            var partLeft = document.getElementsByClassName('part-left-main')[0],
                thisPart =  partLeft.getElementsByClassName('show')[0],
                index;

            if (typeof(thisPart) === 'undefined') {
                // 展示初始化的页面
                
            } else {
                index = $(thisPart).index();
                ClassUtil.addClass(panel[index], 'show');
            }
        }
    }
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
        EventUtil.addHandler(li, 'click',Licallback);
    } 
    /**
     * 点击某个li的时的callback函数
     * @param {Event} e 
     */
    function Licallback(e) {
        e.stopPropagation();
        var content = e.target.innerHTML;
        switchPartContainer(content);
    }
    /**
     * 关闭某个菜单
     * @param {Event} e 
     */
    function closePartCallback(e) {
        // 阻止冒泡
        e.stopPropagation();

        var thisLi = e.target.parentNode,
            lastLi = thisLi.previousSibling,
            nextLi = thisLi.nextSibling,
            thisPart = document.getElementsByClassName('show')[0];
        
        // 关闭当前的part
        ClassUtil.removeClass(thisPart, 'show');
        // 判断前面是否还有菜单
        if (lastLi != null) {
            content = lastLi.getElementsByTagName('a')[0].innerHTML;
            switchPartContainer(content);
        }
        // 判断后面是否还是有菜单
        if (nextLi != null) {
            content = nextLi.getElementsByTagName('a')[0].innerHTML;
            switchPartContainer(content);
        }
        // 解除事件绑定
        EventUtil.removeHandler(e.target, 'click', closePartCallback);

        EventUtil.removeHandler(thisLi, 'click', Licallback);
        // 删除这个list
        firstMenu.removeChild(e.target.parentNode);
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

        var everyPart = document.getElementsByClassName('part'),
            li = firstMenu.getElementsByTagName('li'),
            partRight = document.getElementsByClassName('part-right')[0],
            thisContent; 
            

        for (let i = 0; i < everyPart.length; i++) {
            ClassUtil.removeClass(everyPart[i], 'show');
        }
        
        ClassUtil.addClass(everyPart[index[content]], 'show');

        for (let i = 0; i < li.length; i++) {
            thisContent = li[i].getElementsByTagName('a')[0].innerHTML;
            ClassUtil.removeClass(li[i], 'first-menu-li-acitve');
            if (thisContent === content) {
                ClassUtil.addClass(li[i], 'first-menu-li-acitve');
            }
        }
        //关闭操作面板
        ClassUtil.removeClass(partRight, 'show-part-right');
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

/**
 * @version 1.0
 * @description 打开查看成员信息时候显示多个成员信息的列表的函数，这个函数暂未命名
 */
(function(){
    // 初始化页数
    var page;

    /**
     * @description 对页面进行初始化并第一次发送请求
     */
    (function() {
        page = 0;
        $('.member-information-list-container')[0].innerHTML = '';
        informationListRequest('', '');
    })();

    /**
     * @description 对列表区进行添加元素
     * @param {JSON Object} jsonObj 传回的json对象
     */
    function informationListRenew(jsonObj) {
        var container = $('.member-information-list-container')[0],
            i,
            userinfoArr = jsonObj.userInfoList;
        console.log(userinfoArr.length)
        for (i = 0; i < userinfoArr.length; i++) {
            container.innerHTML += '<li userinfoId=' + userinfoArr[i].userinfoId + '>'
                                + '<img src="../images/logo/studio_logo_information.png" url='+ userinfoArr[i].url +'>'  
                                + '<div>'
                                + '<span>'+ userinfoArr[i].name +'</span>'
                                + '<span>' + userinfoArr[i].grade + userinfoArr[i].group + '</span>'
                                + '</div>'
                                + '</li>'
        }
    }


    /**
     * @description 成员列表展示的请求函数
     * @param {String} group 组别
     * @param {String} grade 年级
     * @param {String} page 页数
     */
    function informationListRequest(group, grade) {
        var jsonObj = {};

        jsonObj.grade = grade;
        jsonObj.group = group;
        jsonObj.page = page;

        $.ajax({
            url: 'http://'+ window.ip +':8080/qginfosystem/userinfo/queryuserinfo',
            type: 'post',
            data: JSON.stringify(jsonObj),
            dataType: 'json',
            processData: false,
            contentType: 'application/json',
            success: function(responseObj) {
                
                switch(responseObj.status) {
                    case '1': {
                        // 请求完毕后统一加一页
                        informationListRenew(responseObj);
                        page++;
                        break;
                    }

                    case '2': {
                        
                        break;
                    }

                    case '7': {
                       
                        break;
                    }

                    case '9': {
                        
                        break;
                    }

                    case '10': {
                        break;
                    }
                }
                
            },
            error: function() {
                // 请求失败时要干什么
                
            }
        });
    }
})();

/**
 * @description 对成员列表添加事件监听，在页面渲染完毕后添加事件监听，一直到程序结束,这个区域的事件监听无论这个区域加载多少个子项，都能够进行，只需要调用一次。
 */
(function() {

    function filterClickListen(event) {
        switch(event.target) {
            case $('.info-button-container>span')[0]:
            case $('.info-button-container .info-button-layer')[0]: {
                // 筛选后执行
                break;
            }
        }
        inforListHidden();
    }
    // 筛选框的事件监听
    EventUtil.addHandler(document, 'click', filterClickListen);

    /**
     * @description 对下拉列表的展示
     * @param {object} target 传入的节点
     */
    function infoListAnimate(target) {
        event.stopPropagation();
        if (ClassUtil.hasClass(target, 'info-list-animate') == false) {
            $(target).css('display', 'block');
            setTimeout(function() {
                ClassUtil.addClass(target, 'info-list-animate')
            }, 10);
        }
    }
    // 展示下拉表的事件监听
    EventUtil.addHandler($('.grade-condition-container .swtich-select-container')[0], 'click', function() {
        var i = 0; 
        // 对下拉列表已经选择的进行初始化
        for (i = 0; i < $('.grade-select-list ul li').length; i++) {
            ClassUtil.removeClass($('.grade-select-list ul li')[i], 'info-list-active');
            if ($('.grade-select-list ul li')[i].innerText == $('.grade-select-list ul').attr('choice-text')) {
                ClassUtil.addClass($('.grade-select-list ul li')[i], 'info-list-active')
            }
        }
        infoListAnimate($('.grade-select-list')[0]);
    });
    EventUtil.addHandler($('.major-condition-container .swtich-select-container')[0], 'click', function() {
        var i = 0; 
        // 对下拉列表已经选择的进行初始化
        for (i = 0; i < $('.group-select-list ul li').length; i++) {
            ClassUtil.removeClass($('.group-select-list ul li')[i], 'info-list-active')
            if ($('.group-select-list ul li')[i].innerText == $('.group-select-list ul').attr('choice-text')) {
                ClassUtil.addClass($('.group-select-list ul li')[i], 'info-list-active')
            }
        }
        infoListAnimate($('.group-select-list')[0]);
    });

    /**
     * @description 下拉列表的隐藏
     */
    function inforListHidden() {
        for (i = 0; i < 2; i++) {
            ClassUtil.removeClass($('.info-select-list')[i], 'info-list-animate');
            setTimeout(function() {
                $('.info-select-list').css('display', 'none');
            }, 300);
        }
    }

    /**
     * 
     * @param {object} event 对下拉列表的点击事件监听
     */
    function downListClickListen(event) {
        // 阻止事件冒泡
        event.stopPropagation();
        // 选择的内容
        var text = event.target.innerText;
        if ($(event.target).parents('div:eq(0)').hasClass('grade-select-list') == true) {
            $('.grade-condition-container .swtich-select-container>span')[0].innerText = text;
            inforListHidden();

        }
        if ($(event.target).parents('div:eq(0)').hasClass('group-select-list') == true) {
            $('.major-condition-container .swtich-select-container>span')[0].innerText = text;
            inforListHidden();
        }
        // 赋值这个属性，下次会显示上次已经选择的属性
        $(event.target).parents('ul:eq(0)').attr('choice-text', text)
        console.log($(event.target).parents('ul:eq(0)')[0])
    }
    // 添加事件监听
    for (i = 0; i < 2; i++) {
        EventUtil.addHandler($('.info-select-list')[i], 'click', downListClickListen);
    }

    /**
     * @description 遮罩层的动画
     * @param {String} eventType 遮罩层的事件名称
     */
    function filterButtonMousemoveListen(event) {
        // 执行遮罩层动画
        if (event.type == 'mouseover' && ClassUtil.hasClass($('.info-button-layer')[0], 'info-button-layer-animate') == false) {
            ClassUtil.addClass($('.info-button-layer')[0], 'info-button-layer-animate');
        }

        // 取消遮罩层动画
        if (event.type == 'mouseleave' && ClassUtil.hasClass($('.info-button-layer')[0], 'info-button-layer-animate') == true) {
            ClassUtil.removeClass($('.info-button-layer')[0], 'info-button-layer-animate');
        }
    }
    // 添加事件监听
    $('.info-button-layer')[0].onmouseover = filterButtonMousemoveListen;
    $('.info-button-layer')[0].onmouseleave = filterButtonMousemoveListen
    $('.info-button-container>span')[0].onmouseover = filterButtonMousemoveListen;
    $('.info-button-container>span')[0].onmouseleave = filterButtonMousemoveListen;

    /**
     * @description 显示或者隐藏组员的组别
     */
    function showInformationGroup(eventType) {
        // 当鼠标在这个列表的上方的时候，显示组别
        if (eventType == 'mouseover') {
            if (ClassUtil.hasClass($(this).children('div')[0], 'show-member-group') == false) {
                ClassUtil.addClass($(this).children('div')[0], 'show-member-group')
            }
        } else {
            // 当鼠标在这个列表的某一项上方离开的时候，隐藏组别
            if (ClassUtil.hasClass($(this).children('div')[0], 'show-member-group') == true) {
                ClassUtil.removeClass($(this).children('div')[0], 'show-member-group')
            }
        }
        
    }

    /**
     * @description 鼠标移动到列表或者鼠标离开列表时候的监听事件函数
     * @param {object} event 鼠标监听事件对象
     */
    function infoListConMousemoveListen(event) {
        // 当鼠标事件为在这个块上边的时候
        if (event.type == 'mouseover') { 
            if (event.target.tagName == 'LI') {
                showInformationGroup.call(event.target, event.type);
            } else if (typeof $(event.target).parents('li')[0] != 'undefined'
                      && $(event.target).parents('li')[0].tagName == 'LI') {
                showInformationGroup.call($(event.target).parents('li')[0], event.type);
            }
        }

        // 当鼠标事件为离开的时候
        if (event.type == 'mouseout') {
            if (event.target.tagName == 'LI') {
                showInformationGroup.call(event.target, event.type);
            } else if (typeof $(event.target).parents('li')[0] != 'undefined' 
                      && $(event.target).parents('li')[0].tagName == 'LI') {
                showInformationGroup.call($(event.target).parents('li')[0], event.type);
            }
        }
    }

    /**
     * @description 对个人信息查看表的监听
     * @param {object} event 事件监听对象
     */
    function informationListClickListen(event) {
        var containerTag = null;
        if (event.target.tagName == 'LI') {
            containerTag = event.target;
        } else {
            containerTag = $(event.target).parents('li')[0];
        }
        informationDetailRequest(containerTag.getAttribute('userinfoId'));
    }
    EventUtil.addHandler($('.member-information-list-container')[0], 'click', informationListClickListen);
    EventUtil.addHandler($('.member-information-list-container')[0], 'mouseover', infoListConMousemoveListen);
    EventUtil.addHandler($('.member-information-list-container')[0], 'mouseout', infoListConMousemoveListen);
})();

/**
 * @description 查看成员的具体信息的请求函数
 */
function informationDetailRequest(userinfoId) {
    var jsonObj = {};

    jsonObj.userinfoId = userinfoId;

    $.ajax({
        url: 'http://'+ window.ip +':8080/qginfosystem/userinfo/getuserinfo',
        type: 'post',
        data: JSON.stringify(jsonObj),
        dataType: 'json',
        processData: false,
        contentType: 'application/json',
        success: function(responseObj) {
            switch(responseObj.status) {
                case '1': {
                    showMessage('注册成功');
                    break;
                }

                case '2': {
                    showMessage('该账户已经被注册了');
                    break;
                }

                case '7': {
                    showMessage('服务器发生内部错误');
                    break;
                }

                case '9': {
                    showMessage('发送数据格式错误');
                    break;
                }
            }
            
        },
        error: function() {
            // 请求失败时要干什么
            showMessage('请求失败')
        }
    });
}
(function() {
    var selectPlugin = document.getElementsByClassName('select-plugin'),
        selectButton = document.getElementsByClassName('prize-select-button'),
        commitButton = document.getElementById('commit-search-prize-button');

    for (let i = 0; i < selectButton.length; i++) {
        EventUtil.addHandler(selectButton[i], 'click', callback);
    }

    function callback(e) {
        e.stopPropagation();
        var thisPlugin = e.target.parentNode;
            li = thisPlugin.getElementsByTagName('li');
            option = thisPlugin.getElementsByTagName('span')[0];

        
        // 防止重复打开下拉项
        for (let i = 0; i < selectPlugin.length; i++) {
            if (ClassUtil.hasClass(selectPlugin[i], 'show-option-container')) {
                closeOption(selectPlugin[i]);
            }
        }

        ClassUtil.toggleClass(thisPlugin, 'show-option-container');

        $(li).on('click', function() {
            option.innerHTML = this.innerHTML;
            closeOption(thisPlugin);
        });
    }

    // 关闭下拉栏
    function closeOption(obj) {
        ClassUtil.removeClass(obj, 'show-option-container');
    }

    // 给日历下拉框添加年份
    (function addDateOptions() {
        var dataOptions = document.getElementById('date-options'),
        thisYear = new Date().getFullYear(),
        docFragment = document.createDocumentFragment(),
        li, text;

        for (let i = 2007; i <= thisYear; i++) {
            li = document.createElement('li');
            text = document.createTextNode(i);
            li.appendChild(text);
            docFragment.appendChild(li);
        }

        dataOptions.appendChild(docFragment);
    })();

    EventUtil.addHandler(commitButton, 'click', sendData);
    // 发送请求
    function sendData() {

    }
})();

