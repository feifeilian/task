window.onload = function() {
    var getClass = function(cls) {
        return document.getElementsByClassName(cls)[0];
    }
    var addEvent = function(obj, event, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(event, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + event, fn);
        }
    }
    var clickindex;
    var deleteindex;
    var viewh;
    var navside = getClass('nav-side');
    var navcon = getClass('nav-con');
    var mainmenu = getClass('mainmenu');
    var tablepop = getClass('table-pop');
    var deletepop = getClass('pop-delete');
    var shawdow = getClass('shawdow');
    var table = getClass('table-all');
    // 利用json数据动态生成二级菜单
    function getMenu() {
        for (var i in menus) {
            var li = document.createElement("li");
            li.innerHTML = '<p>' + menus[i].name + '</p>';
            if (menus[i].sub_menus.lenght != 0) {
                var subul = document.createElement("ul");
                subul.className = "submenu";
                for (var j = 0; j < menus[i].sub_menus.length; j++) {
                    var subli = document.createElement("li");
                    subli.innerHTML = menus[i].sub_menus[j].name;
                    subul.appendChild(subli);
                }
                li.appendChild(subul);
            }
            mainmenu.appendChild(li);
        }
    }
    //点击一级菜单
    function showsubmenu(e) {
        if (e.target && e.target.nodeName == "P") {
            if (e.target.nextSibling.style.display != "block") {
                e.target.nextSibling.style.display = "block";
            } else {
                e.target.nextSibling.style.display = "none";
            }
        }
    }
    //渲染表格数据
    function showtable() {
        table.innerHTML = '';
        for (var i in tabledata) {
            if (tabledata[i].id == 0) {
                var trhead = document.createElement("tr");
                trhead.className = "tablehead";
                trhead.innerHTML = '<th>' + tabledata[i].name + '</th>' + '<th>' + tabledata[i].content + '</th>' + '<th>' + tabledata[i].value + '</th>' + '<th>' + tabledata[i].operate + '</th>';
                table.appendChild(trhead);
            } else {
                var trbody = document.createElement("tr");
                trbody.innerHTML = '<tr><td>' + tabledata[i].name + '</td>' + '<td>' + tabledata[i].content + '</td>' + '<td>' + tabledata[i].value + '</td>' + "<td class='operate-btn'><button class='edit' dataname='" + tabledata[i].name + "' datacon='" + tabledata[i].content + "' datavalue='" + tabledata[i].value + "' dataid='" + tabledata[i].id + "''>" + "编辑</button><button class='delete'" + "dataid='" + tabledata[i].id + "''>删除</button></td></tr>";
                table.appendChild(trbody);
            }
        }
    }
    //表格编辑和删除函数
    function addEdit(e) {
        var edits = document.getElementsByClassName('edit');
        if (e.target && e.target.className == 'edit') {
            pop(tablepop);
            getClass('name').value = e.target.getAttribute('dataname');
            getClass('con').value = e.target.getAttribute('datacon');
            getClass('value').value = e.target.getAttribute('datavalue');
            clickindex = e.target.getAttribute('dataid');
        }
    }
    function adddel(e) {
        var deletes = document.getElementsByClassName('delete');
        if (e.target && e.target.className == 'delete') {
            pop(deletepop);
            deleteindex = e.target.getAttribute('dataid');
        }
    }
    //弹框出现与消失函数
    function pop(obj) {
        obj.style.display = 'block';
        shawdow.style.display = "block";
        document.body.style = "overflow:hidden";
    }

    function reset(obj) {
        obj.style.display = "none";
        shawdow.style.display = "none";
        document.body.style = "overflow:scroll";
    }
    
    //重新获得浏览器改变大小后的信息
    function getInfo() {
        var screenw = document.documentElement.clientWidth || document.body.clientWidth;
        var screenh = document.documentElement.clientHeight || document.body.clientHeight;
        viewh = screenh - navcon.getBoundingClientRect().top;
        navside.style.height = viewh + 'px';
    }
    //滚动过程
    function scrollweb() {
        var tablehead = getClass('tablehead');
        var tableth = tablehead.getElementsByTagName('th');
        var col = document.getElementsByTagName('tr')[1].getElementsByTagName('td');
        var offseth = navside.scrollHeight; //动态生成后获取navside的内容高度
        var sidetop = navcon.getBoundingClientRect().top;
        var scrollh = document.documentElement.scrollTop || document.body.scrollTop;
        if ((viewh + scrollh) >= offseth) {

            navside.style.overflowY = "hidden";
            navside.style.height = 'fit-content';
        } else {
            navside.style.overflowY = "scroll";
            navside.style.height = viewh + scrollh + 'px';
        }
        if (sidetop <= 0) {
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
    showtable();
    addEvent(mainmenu, 'click', showsubmenu);
    addEvent(window, 'scroll', scrollweb);
    addEvent(window, 'resize', getInfo);
    addEvent(table, 'click', addEdit);
    addEvent(table, 'click', adddel);
    addEvent(getClass('edit-confirm'), 'click', function() {
        tabledata[clickindex].name = getClass('name').value;
        tabledata[clickindex].content = getClass('con').value;
        tabledata[clickindex].value = getClass('value').value;
        showtable();
        reset(tablepop);
    });
    addEvent(getClass('edit-cancel'), 'click', function() {
        reset(tablepop);
    });

    addEvent(getClass('del-confirm'), 'click', function() {
        delete tabledata[deleteindex];
        showtable();
        reset(deletepop);
    });
    addEvent(getClass('del-cancel'), 'click', function() {
        reset(deletepop);
    });
}
