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
        EventUtil.addHandler(headerLi[i], 'click', callback);
    }
    function callback(e) {
       createLi(e.target.innerHTML);
        
        // if (firstMenu.contains()) {
        //     alert();
        // }
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
        EventUtil.addHandler(button, 'click', deleteLi);
    } 
    /**
     * 删除菜单选项
     * @param {Event} e 
     */
    function deleteLi(e) {
        console.log(e.target.parentNode);
        firstMenu.removeChild(e.target.parentNode);
    }
})();

(function() {
    var i;
    /**
     * @description 显示成员的组别
     */
    function showInformationGroup(eventType) {
        console.log(event)
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
    for (i = 0; i < $('.member-information-list-container li').length; i++) {
        $('.member-information-list-container li')[i].onmouseover = function(event) {
            showInformationGroup.call(this, event.type);
        }
        $('.member-information-list-container li')[i].onmouseleave = function(event) {
            showInformationGroup.call(this, event.type);
        }
    }
})()