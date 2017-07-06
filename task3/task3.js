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
    var screenw;
    var screenh;
    var viewh;
    var navside = getClass('nav-side');
    var navcon = getClass('nav-con');

    var mainmenu = document.getElementsByClassName('mainmenu')[0];

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
    getMenu();
    var offseth = navside.scrollHeight; //动态生成后获取navside的内容高度
    //获得一级标签元素
    function getChildren(obj, tag) {
        var objChild = [];
        var objs = obj.getElementsByTagName(tag);
        for (var i = 0, j = objs.length; i < j; ++i) {
            if (objs[i].nodeType != 1) {
                alert(objs[i].nodeType);
                continue;
            }
            var temp = objs[i].parentNode;
            if (temp.nodeType == 1) {
                if (temp == obj) {
                    objChild.push(objs[i]);
                }
            }
        }
        return objChild;
    }
    //点击一级菜单
    function showsubmenu() {
        var lis = getChildren(mainmenu, "li");
        var subul = document.getElementsByClassName('submenu');
        addEvent(mainmenu, 'click', function(e) {

            if (e.target && e.target.nodeName == "P") {
                if (e.target.nextSibling.style.display != "block") {
                    e.target.nextSibling.style.display = "block";
                } else {
                    e.target.nextSibling.style.display = "none";
                }
            }
        });
        
    }
    showsubmenu();
    //渲染表格数据
    function showtable() {
        var table = getClass('table-all');
        table.innerHTML = '';
        for (var i in tabledata) {
            if (tabledata[i].id == 0) {
                var trhead = document.createElement("tr");
                trhead.className = "tablehead";
                trhead.innerHTML = '<th>' + tabledata[i].name + '</th>' + '<th>' + tabledata[i].content + '</th>' + '<th>' + tabledata[i].value + '</th>' + '<th>' + tabledata[i].operate + '</th>';
                table.appendChild(trhead);
            } else {
                var trbody = document.createElement("tr");
                trbody.innerHTML = '<tr><td>' + tabledata[i].name + '</td>' + '<td>' + tabledata[i].content + '</td>' + '<td>' + tabledata[i].value + '</td>' + "<td><button class='edit' dataname='" + tabledata[i].name + "' datacon='" + tabledata[i].content + "' datavalue='" + tabledata[i].value + "''>" + "编辑</button><button class='delete'>删除</button></td></tr>";
                table.appendChild(trbody);
            }
        }
        addOperationEvent();

    }
    showtable();
    //选然表格后在获取元素
    var col = document.getElementsByTagName('tr')[1].getElementsByTagName('td');
    var tablehead = getClass('tablehead');
    var tableth = tablehead.getElementsByTagName('th');
    var tablepop = getClass('table-pop');
    var deletepop = getClass('pop-delete');
    //点击编辑按钮


    var shawdow = getClass('shawdow');

    function addOperationEvent() {
        var edits = document.getElementsByClassName('edit');
        var deletes = document.getElementsByClassName('delete');
        for (let i = 0; i < edits.length; i++) {
            addEvent(edits[i], 'click', function(e) {
                tablepop.style.display = "block";
                shawdow.style.display = "block";
                document.body.style = "overflow:hidden";
                getClass('name').value = e.target.getAttribute('dataname');
                getClass('con').value = e.target.getAttribute('datacon');
                getClass('value').value = e.target.getAttribute('datavalue');
                clickindex = Object.keys(tabledata)[i + 1];
                console.log(clickindex)
            });
            addEvent(deletes[i], 'click', function(e) {
                deletepop.style.display = 'block';
                shawdow.style.display = "block";
                document.body.style = "overflow:hidden";
                deleteindex = Object.keys(tabledata)[i + 1];
            })
        }
    }
    //修改信息
    addEvent(getClass('btnconfirm'), 'click', function() {
        tabledata[clickindex].name = getClass('name').value;
        tabledata[clickindex].content = getClass('con').value;
        tabledata[clickindex].value = getClass('value').value;
        console.log(tabledata);
        showtable();
        tablepop.style.display = "none";
        shawdow.style.display = "none";
        document.body.style = "overflow:scroll";
    });
    addEvent(getClass('btncancel'), 'click', function() {
        tablepop.style.display = "none";
        shawdow.style.display = "none";
        document.body.style = "overflow:scroll";
    });

    addEvent(getClass('del-btn'), 'click', function() {
        delete tabledata[deleteindex];
        showtable();
        // deletes[deleteindex].parentNode.parentNode.innerHTML=null;
        deletepop.style.display = "none";
        shawdow.style.display = "none";
        document.body.style = "overflow:scroll";
    });
    addEvent(getClass('cancel-btn'), 'click', function() {
            deletepop.style.display = "none";
            shawdow.style.display = "none";
            document.body.style = "overflow:scroll";
        })
        //滚动过程
    var getInfo = function() {
        screenw = document.documentElement.clientWidth || document.body.clientWidth;
        screenh = document.documentElement.clientHeight || document.body.clientHeight;
        viewh = screenh - navcon.getBoundingClientRect().top;
        navside.style.height = viewh + 'px';
    }
    getInfo();

    addEvent(window, 'scroll', function() {
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
    })

    addEvent(window, 'resize', function() {
        getInfo();
    })


}
