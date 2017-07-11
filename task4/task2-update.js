window.onload = function() {
    // 导航栏下拉菜单
    var menu = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
    var childmenu = document.getElementsByClassName('child-menu');
    for (var i = 0; i < menu.length; i++) {
        (function(i) {
          menu[i].addEventListener("mouseover",function() {
                menu[i].style.backgroundColor = "#303030";
                childmenu[i].style.display = "block";

            });
            menu[i].onmouseout = function() {
                menu[i].style.backgroundColor = "#000000";
                childmenu[i].style.display = "none";
            }

        })(i)

    }

    //淡入淡出轮播图效果
    var piccontainer = document.getElementsByClassName("pic-container")[0];
    var picwidth = parseInt(piccontainer.offsetWidth);
    var imgs = piccontainer.getElementsByClassName("tab-pic");
    var tabbtn = document.getElementsByClassName("tab-btn")[0];
    var btn = tabbtn.getElementsByTagName("span");
    var picnum = imgs.length - 1; //图片数量
    //替换class达到淡入淡出效果
    function fadeIn(e) {
        e.className = "tab-pic fadein";
    }

    function fadeOut(e) {
        e.className = "tab-pic fadeout";
    }
    //图片轮播函数

    function turnImgs() {
        if (picnum == 0) {	
            fadeOut(imgs[picnum]);
            picnum = imgs.length - 1;
            fadeIn(imgs[picnum]);
            showbutton(picnum);
        } else {
            fadeOut(imgs[picnum]);
            fadeIn(imgs[picnum - 1]);
            picnum--;
            showbutton(picnum);
        }
    }
    showbutton(picnum);
    setInterval(turnImgs, 3000);
        //显示函数
    function showbutton(btnindex) {
        for (var i = 0; i < btn.length; i++) {
            btn[i].className = "";
        }
        btn[3-btnindex].className = "on";
    }


    var tabtitle = document.getElementsByClassName('tab-con-title')[0].getElementsByTagName('li');
    var tabbody = document.getElementsByClassName('tab-con-body')[0].getElementsByTagName('ul')[0];
    var tabbodylist = tabbody.getElementsByTagName('li');
    var conwidth = parseInt(tabbodylist.offsetWidth);

    for (var i = 0; i < tabtitle.length; i++) {
        (function(i) {
            tabtitle[i].onclick = function() {
                for (var j = 0; j < tabtitle.length; j++) {
                    tabtitle[j].className = "";
                }
                tabtitle[i].className = "active";
                tabbody.style.transitionDuration = 0 + 's';
                tabbody.style.transform = 'translateX(' + (i * picwidth) * (-1) + "px)";
            }
        })(i)
    }

    var country = document.getElementById('country');
    var city = document.getElementById('city');
    var cities = [
            ["无"],
            ["北京", "上海", "广州"],
            ["洛杉矶", "纽约", "旧金山"],
            ["伦敦", "利物浦", "曼彻斯特"]
        ]
        // 获得国家对应的城市数组
    country.onchange = function() {
        var countrycity = cities[country.selectedIndex - 1];
        city.length = 1; //清除城市下拉框
        for (var i = 0; i < countrycity.length; i++) {
            city[i + 1] = new Option(countrycity[i], countrycity[i])

        }

    }

}
