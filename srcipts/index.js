/**
 * 初始化右操作面板功能
 */
var flag = true;
function showPartRight() {
    var showPanelButton = document.getElementById('show-panel-button'),
        text = showPanelButton.getElementsByTagName('span')[0],
        partRight = document.getElementsByClassName('part-right')[0],
        panel = document.getElementsByClassName('panel');

    if (flag === true) {
        EventUtil.addHandler(showPanelButton, 'click', fn);
        flag = null;
    } 

    function fn() {    
        if (ClassUtil.hasClass(partRight, 'part-right-animation')) {
            ClassUtil.removeClass(partRight, 'part-right-animation');
            text.innerHTML = '筛选条件';
        } else {
            ClassUtil.addClass(partRight, 'part-right-animation');
            text.innerHTML = '收起';
        }
    }


    var partLeft = document.getElementsByClassName('part-left-main')[0],
        thisPart =  partLeft.getElementsByClassName('show')[0],
        index = thisPart.getAttribute('data-index');

    if (typeof(thisPart) === 'undefined') {
        // 展示初始化的页面
        
    } else {
        // 只有两种页面需要展示右边栏
        if ( index == 1 || index == 0 ) {
            
            ClassUtil.addClass(partRight, 'show');

            ClassUtil.removeClass(panel[0], 'show');
            ClassUtil.removeClass(panel[1], 'show');
            ClassUtil.addClass(panel[index], 'show');    
        } 
    }
}

var PartIndex = {
    '所获奖项': 0,
    '成员信息': 1,
    '导入导出': 2,
    '编辑奖项': 3
};

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
            thisIndex = e.currentTarget.getAttribute('data-index');
            list = firstMenu.getElementsByTagName('li');

        // 判断已经是否存在这个list项
    
        for(let i = 0, index; i < list.length; i++) {
            index = list[i].getAttribute('data-index');
            if (index === thisIndex) {
                switchPartContainer(thisIndex);
                return;
            }
        } 

        // 创建一个菜单栏
        createLi(content);

        // 切换不同的面板
        switchPartContainer(thisIndex);
    }
    /**
     * 创建一个列表顶
     * @param {string} content 
     */
    window.MenuIndex = 3;
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
        // li.setAttribute('data-index', MenuIndex++);

        switch (content) {
            case '所获奖项': {
                li.setAttribute('data-index', 0);
                break;
            } case '成员信息': {
                li.setAttribute('data-index', 1);
                break;
            } case '导入导出': {
                li.setAttribute('data-index', 2);
                break;
            } default: {
                li.setAttribute('data-index', MenuIndex++);
            }
        }

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
        
        var index = e.currentTarget.getAttribute('data-index');

        switchPartContainer(index);
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
            thisPart = document.getElementsByClassName('show')[0],
            thisIndex = thisLi.getAttribute('data-index'),
            partLeft = document.getElementsByClassName('part-left-main')[0];
            // debugger

        // 关闭当前的part

        ClassUtil.removeClass(thisPart, 'show');

        // 判断前面是否还有菜单
        if (lastLi != null) {
            lastIndex = lastLi.getAttribute('data-index');
            switchPartContainer(lastIndex);
        }

        // 判断后面是否还是有菜单
        if (nextLi != null) {
            nextIndex = nextLi.getAttribute('data-index');
            switchPartContainer(nextIndex);
        }

        // 如果是详细容器，那么关闭的时候要把它移除
        if (thisIndex >= 3) {
            
            partLeft.removeChild(thisPart);
        }

        // 解除事件绑定
        EventUtil.removeHandler(e.target, 'click', closePartCallback);

        EventUtil.removeHandler(thisLi, 'click', Licallback);
        // 删除这个list
        firstMenu.removeChild(e.target.parentNode);
        MenuIndex--;
    }
    /**
     * 切换所有的面板函数
     * 通过添加或者删除一个类show来实现
     * @param {int} index 
     * 0 代表 奖项
     * 1 代表 成员信息
     * 2 代表 导入导出功能
     * >3 代表详细的奖项操作页面或成员操作页面
     */
    function switchPartContainer(index) { 
        

        var everyPart = document.getElementsByClassName('part'),
            li = firstMenu.getElementsByTagName('li'),
            thisIndex,
            partRight = document.getElementsByClassName('part-right')[0];
            
        for (let i = 0; i < everyPart.length; i++) {
            ClassUtil.removeClass(everyPart[i], 'show');
            thisIndex = everyPart[i].getAttribute('data-index');
            if (thisIndex === index) {
                // 切换到这个容器
                ClassUtil.addClass(everyPart[i], 'show');
            }
        }

             
        // 初始化容器
        switch(index) {
            case 0: {
                initprizeContainer();
                break;
            } case 1: {
                // 初始化成员容器
                break;
            } case 2: {
                //初始化导入导出容器

            }
        }

        for (let i = 0; i < li.length; i++) {

            thisIndex = li[i].getAttribute('data-index');

            ClassUtil.removeClass(li[i], 'first-menu-li-acitve');

            if (thisIndex === index) {
                ClassUtil.addClass(li[i], 'first-menu-li-acitve');
            }
        }
        //关闭操作面板
        ClassUtil.removeClass(partRight, 'part-right-animation');
        ClassUtil.removeClass(partRight, 'show');

        showPartRight();
    }
   
})();

/**
 * 初始化奖项容器
 */
window.prizeIndex = 0;

function initprizeContainer() {
    var prizeUl = document.getElementsByClassName('prize-container')[0].getElementsByTagName('ul')[0];
        data = {
            page: 0, 
            awardTime: "",
            awardLevel: "",
            rank: ""
        };
    
    window.prizeURL = 'http://' + ip +':8080/qginfosystem/awardinfo/queryawardinfo';
    
    
    AjaxUtil.post(prizeURL, data, 'json', 'application/json', successCallback, errorCallback);
        
    function successCallback(r) {
        if (r.status === '1') {
            console.log(r);
            var num = r.awardInfoList.length;
            // 清空ul
            prizeUl.innerHTML = '';
            createPrize(num, r.awardInfoList);

            // 监听每一个奖项
            li = prizeUl.getElementsByTagName('li');
            $('li').on('click', function(e) {
                var ID = e.target.getAttribute('data-id');
                viewPrizeDetail(ID);
            });
        }
    }
    function errorCallback() {
        alert("网络状况好像不太好~");
    }
}

var queryPrizeData = {
    page: 0,
    awardTime:"",
    awardLevel:"",
    rank:""
};

/**
 * 根据条件翻页请求
 */
function queryMorePrize() {
    AjaxUtil.post(prizeURL, queryPrizeData, 'json', 'application/json', successCallback, errorCallback);
        
    function successCallback(r) {
        if (r.status === '1') {
            console.log(r);
            var num = r.awardInfoList.length;
            createPrize(num, r.awardInfoList);
            queryPrizeData.page++;
        } else if (r.status === '10') {
            console.log('没有结果');

        }
    }
    function errorCallback() {
        alert("网络状态似乎不太好");
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
/**
 * 奖项的详细页面
 */
window.detailIndex = 4;
function viewPrizeDetail(ID) {
    var prizeDetailContainer = document.getElementsByClassName('prizeDetailContainer');
    var model = ` 
                 <div class="prizeDetailContainer-left">
                <div class="prize-detail-img-container">
                    <img src="" id="prize-detail-img">
                </div>
                <div class="introduction-container">
                    <textarea id="introduction" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="prizeDetailContainer-right">
                <ul>
                    <li>
                        <label for="">奖项名称</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                    <li>
                        <label for="">奖项编号</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                    <li>
                        <label for="">获奖时间</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                    <li>
                        <label for="">获奖项目</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                    <li>
                        <label for="">获奖部门</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                    <li>
                        <label for="">获奖级别</label>
                        <div class="prize-input-container" style="margin-right: 10px;">
                            <input type="text" style="width: 213px;">
                        </div>
                        <label for="">获奖等级</label>
                        <div class="prize-input-container" >
                            <input type="text" style="width: 213px;">
                        </div>
                    </li>
                    <li>
                        <label for="">指导老师</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                    <li>
                        <label for="">参赛学生</label>
                        <div class="prize-input-container">
                            <input type="text">
                        </div>
                    </li>
                </ul>
                <div class="prize-button-container">
                    <button>修改</button>
                    <button>删除</button>
                </div>
            </div>
        `;
    var newDiv = document.createElement('div');

    newDiv.setAttribute('class', 'part prizeDetailContainer');
    newDiv.setAttribute('data-index', detailIndex++);

    newDiv.appendChild(model);


    AjaxUtil.post(prizeURL, {awardId: ID}, 'json', 'application/json', successCallback, errorCallback);

    function successCallback() {
        if (r.status === '1') {
            createLi(r.awardName);

        }
    }
    function errorCallback() {

    }   
}

/**
 * 下拉框插件
 */
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
            if (selectPlugin[i] != thisPlugin) {
                if (ClassUtil.hasClass(selectPlugin[i], 'show-option-container')) {
                    closeOption(selectPlugin[i]);
                }
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

