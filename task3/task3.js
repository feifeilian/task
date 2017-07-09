window.onload = function() {
    //取相同类的第一个元素
    var getClass = function(cls) {
            return document.getElementsByClassName(cls)[0];
        }
        //添加侦听事件
    var addEvent = function(obj, event, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(event, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + event, fn);
        }
    }
    var clickIndex;
    var deleteIndex;
    var navsideViewHeight;
    var navside = getClass('nav-side');
    var navcon = getClass('nav-con');
    var mainMenu = getClass('mainmenu');
    var tablePop = getClass('table-pop');
    var deletePop = getClass('pop-delete');
    var shawdowBody = getClass('shawdow');
    var table = getClass('table-all');
    // 利用json数据动态生成二级菜单
    function getMenu() {
        for (var i in menus) {
            var li = document.createElement("li");
            var subMenuLength = menus[i].sub_menus.length;
            li.innerHTML = '<p>' + menus[i].name + '</p>';
            if (subMenuLength != 0) {
                var subUl = document.createElement("ul");
                subUl.className = "submenu";
                for (var j = 0; j < subMenuLength; j++) {
                    var subLi = document.createElement("li");
                    subLi.innerHTML = menus[i].sub_menus[j].name;
                    subUl.appendChild(subLi);
                }
                li.appendChild(subUl);
            }
            mainMenu.appendChild(li);
        }
    }
    //点击一级菜单
    function showSubmenu(e) {
        if (e.target && e.target.nodeName == "P") {
            if (e.target.nextSibling.style.display != "block") {
                console.log( e.target.nextSibling.style.display);
                e.target.nextSibling.style.display = "block";
            } else {
                e.target.nextSibling.style.display = "none";
            }
        }
    }
    //渲染表格数据
    function showTable() {
        table.innerHTML = '';
        for (var i in tabledata) {
            if (tabledata[i].id == 0) {
                var trHead = document.createElement("tr");
                trHead.className = "tablehead";
                trHead.innerHTML = '' 
                + '<th>' + tabledata[i].name + '</th>' 
                + '<th>' + tabledata[i].content + '</th>' 
                + '<th>' + tabledata[i].value + '</th>' 
                + '<th>' + tabledata[i].operate + '</th>';
                table.appendChild(trHead);
            } else {
                var trBody = document.createElement("tr");
                trBody.innerHTML =''
                + '<tr><td>' + tabledata[i].name + '</td>' 
                + '<td>' + tabledata[i].content + '</td>'
                + '<td>' + tabledata[i].value + '</td>' 
                + "<td class='operate-btn'><button class='edit' dataname='" 
                + tabledata[i].name + "' datacon='" 
                + tabledata[i].content + "' datavalue='" 
                + tabledata[i].value + "' dataid='" 
                + tabledata[i].id + "''>" 
                + "编辑</button><button class='delete'" + "dataid='"
                + tabledata[i].id + "''>删除</button></td></tr>";
                table.appendChild(trBody);
            }
        }
    }
    //表格编辑和删除函数
    function addEdit(e) {
        if (e.target && e.target.className == 'edit') {
            pop(tablePop,true);
            getClass('name').value = e.target.getAttribute('dataname');
            getClass('con').value = e.target.getAttribute('datacon');
            getClass('value').value = e.target.getAttribute('datavalue');
            clickIndex = e.target.getAttribute('dataid');
        }
    }

    function addDel(e) {
        if (e.target && e.target.className == 'delete') {
            pop(deletePop,true);
            deleteIndex = e.target.getAttribute('dataid');
        }
    }
    //弹框出现与消失函数
    function pop(obj,isPop) {
        if(isPop){
            obj.style.display = 'block';
            shawdowBody.style.display = "block";
            document.body.style = "overflow:hidden";
        } else {
            obj.style.display = "none";
            shawdowBody.style.display = "none";
            document.body.style = "overflow:scroll";
        }
       
    }

    //重新获得浏览器改变大小后的信息
    function getInfo() {
        var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
        navsideViewHeight = screenHeight - navcon.getBoundingClientRect().top;
        navside.style.height = navsideViewHeight + 'px';
    }
    //滚动过程
    function scrollWeb() {
        var tablehead = getClass('tablehead');
        var tableth = tablehead.getElementsByTagName('th');
        var col = document.getElementsByTagName('tr')[1].getElementsByTagName('td');
        var navsideOffsetHeight = navside.scrollHeight; //动态生成后获取navside的内容高度
        var sideTop = navcon.getBoundingClientRect().top;
        var navconScrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if ((navsideViewHeight + navconScrollHeight) >= navsideOffsetHeight) {

            navside.style.overflowY = "hidden";
            navside.style.height = 'fit-content';
        } else {
            navside.style.overflowY = "scroll";
            navside.style.height = navsideViewHeight + navconScrollHeight + 'px';
        }
        if (sideTop <= 0) {
            tablehead.style.position = 'fixed';
            tablehead.style.marginLeft = "-1px";
            for (var i = 0; i < tableth.length; i++) {
                tableth[i].style.width = col[i].offsetWidth + 'px';
            }
        } else {
            tablehead.style.position = 'static';
        }
    }

    //主函数
    getInfo();
    getMenu();
    showTable();
    addEvent(mainMenu, 'click', showSubmenu);
    addEvent(window, 'scroll', scrollWeb);
    addEvent(window, 'resize', getInfo);
    addEvent(table, 'click', addEdit);
    addEvent(table, 'click', addDel);
    addEvent(getClass('edit-confirm'), 'click', function() {
        tabledata[clickIndex].name = getClass('name').value;
        tabledata[clickIndex].content = getClass('con').value;
        tabledata[clickIndex].value = getClass('value').value;
        showTable();

        pop(tablePop,false);
    });
    addEvent(getClass('edit-cancel'), 'click', function() {
        pop(tablePop,false);
    });

    addEvent(getClass('del-confirm'), 'click', function() {
        delete tabledata[deleteIndex];
        showTable();
        pop(deletePop,false);
    });
    addEvent(getClass('del-cancel'), 'click', function() {
        pop(deletePop,false);
    });
}
