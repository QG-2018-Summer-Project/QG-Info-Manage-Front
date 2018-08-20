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

/**
 * @description 打开成员列表的块的时候启动函数，暂未命名
 */
(function(){
    var page = 0;

    function listPageInit() {
        $('.member-information-list-container')[0].innerHTML = '';
        informationListRequest('', '');
    }

    /**
     * @description 对列表区进行添加元素
     * @param {JSON Object} jsonObj 传回的json对象
     */
    function informationListRenew(jsonObj) {
        var container = $('.member-information-list-container')[0],
            i,
            userinfoArr = jsonObj.userInfo;
        
        for (i = 0; i < userinfoArr.length; i++) {
            container.innerHTML += '<li userinfoId=' + userinfoArr[i].userinfoId + '>'
                                + '<img src="../images/logo/studio_logo_information.png" url='+ userinfoArr[i].url +'>'  
                                + '<div>'
                                + '<span>'+ userinfoArr[i].name +'</span>'
                                + '<span>' + userinfoArr[i].grade + '级' + userinfoArr[i].group + '组</span>'
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
                        // 请求完毕后统一加一页
                        page++;
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
})();

/**
 * @description 对成员列表添加事件监听，在页面渲染完毕后添加事件监听，一直到程序结束
 */
(function() {
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