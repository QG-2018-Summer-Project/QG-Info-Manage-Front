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
    window.prizeIndex = 0;

    (function initprizeContainer() {
        var prizeUl = document.getElementsByClassName('prize-container')[0].getElementsByTagName('ul')[0];

        window.URL = 'http://' + ip +':8080/qginfosystem/awardinfo/queryawardinfo',
            data = {
                page: 0, 
                awardTime: "",
                awardLevel: "",
                rank: ""
            };
        
        AjaxUtil.post(URL, data, 'json', 'application/json', successCallback, errorCallback);
            
        function successCallback(r) {
            if (r.status === '1') {
                console.log(r);
                var num = r.awardInfoList.length;
                // 清空ul
                prizeUl.innerHTML = '';
                createPrize(num, r.awardInfoList);

            }
        }
        function errorCallback() {
            alert();
        }
    })();

    
})();



function queryMorePrize() {
    AjaxUtil.post(URL, queryPrizeData, 'json', 'application/json', successCallback, errorCallback);
        
    function successCallback(r) {
        if (r.status === '1') {
            console.log(r);
            var num = r.awardInfoList.length;
            createPrize(num, r.awardInfoList);
            queryPrizeData.page++;
        }
    }
    function errorCallback() {
        alert();
    }
}

/**
 * 根据数量创建奖项模板
 * @param {int} num 
 */
function createPrize(num, data) {
    var prizeContainer = document.getElementsByClassName('prize-container')[0],
        prizeUl = prizeContainer.getElementsByTagName('ul')[0],
        prizeModel = `
                        <a href="javascript:">
                            <div class="prize-img-container">
                                <img src="" class="prize-img">
                            </div>
                            <div class="prize-info-container">
                                <h1 class="prize-name"></h1>
                                <p class="prize-time-container"><span class="prize-time"></span></p>
                                <p><span class="prize-people"></span></p>                                
                            </div>
                        </a>
                    `,
    docFragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {

        newNode = document.createElement('li');
        newNode.innerHTML = prizeModel;

        docFragment.appendChild(newNode);
    } 
    prizeUl.appendChild(docFragment);

    (function addPrize(data) {
        var prizeLi = prizeUl.getElementsByTagName('li'),
            prizeImg = prizeUl.getElementsByClassName('prize-img'),
            prizeName = prizeUl.getElementsByClassName('prize-name'),
            prizeTime = prizeUl.getElementsByClassName('prize-time'),
            prizePeople = prizeUl.getElementsByClassName('prize-people'),
            imgURL;

        for (let i = prizeIndex, j = 0; i <  prizeIndex + num; i++, j++) {
            imgURL = 'http://' + ip + ':8080/qginfosystem/img/' + data[j].url;
            prizeLi[i].setAttribute('data-id', data[j].awardId);
            prizeImg[i].setAttribute('src', imgURL);
            prizeName[i].innerHTML = data[j].awardName;
            prizeTime[i].innerHTML = data[j].awardTime;
            prizePeople[i].innerHTML = data[j].joinStudent;

        }

    })(data);
    prizeIndex += num;
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

    EventUtil.addHandler(commitButton, 'click', queryPrizeByOptions);

    // 发送请求
    function queryPrizeByOptions() {
        var prizeUl = document.getElementsByClassName('prize-container')[0].getElementsByTagName('ul')[0];
            optionsSpan = document.getElementsByClassName('option'),
            options = [];

        for (let i = 0; i < optionsSpan.length; i++) {
            if (optionsSpan[i].innerHTML === '所有') {
                options[i] = '';
            } else {
                options[i] = optionsSpan[i].innerHTML;
            }
        }

        queryPrizeData.page = 0;
        queryPrizeData.awardTime =  options[0];
        queryPrizeData.awardLevel = options[1];
        queryPrizeData.rank = options[2];
        prizeUl.innerHTML = '';
        queryMorePrize();
    }
})();

var queryPrizeData = {
    page: 0,
    awardTime:"",
    awardLevel:"",
    rank:""
};