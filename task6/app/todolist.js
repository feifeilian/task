import taskdata from "./taskdata.js"
import "./hammer.js"

let edit_id = -1;
let edit_text = 'this is a new task';
let edit_status = 'will';
let edit_priority = 'low';
let data = {};

window.onload = () => {
    edit_id = -1;
    edit_text = 'this is a new task';
    edit_status = 'will';
    edit_priority = 'low';

    // 加载json数据
    // 加载json数据
    const taskStorage = window.sessionStorage;

    //从seesionStorage中获取缓存
    let getData = taskStorage.getItem("taskdata");

    //如果seesionStorage没有缓存，则缓存数据
    if (!getData) {
        //将json数据转化为字符串
        let d = JSON.stringify(taskdata);

        //存入seesionStorage
        taskStorage.setItem("taskdata", d);
        getData = taskStorage.getItem("taskdata")
    }

    //将json字符串转化为对象
    data = JSON.parse(getData);

    //渲染列表
    showList(data);

    //创建一个新的hammer对象并且在初始化时指定要处理的dom元素
    let oneThing = new Hammer(getById("onething"));
    let allThing = new Hammer(getById("allthing"));
    let list = new Hammer(getByClass("list"));
    let add = new Hammer(getByClass('add'));
    let complete = new Hammer(getByClass('complete'));
    let cancel = new Hammer(getByClass('btn-cancel'));
    let choose = new Hammer(getByClass('choose'));

    //添加事件
    oneThing.on("tap", () => changeList('one'));
    allThing.on("tap", () => changeList('all'));
    list.on("tap", operateList);
    add.on("tap", toEdit);
    complete.on("tap", editData);
    cancel.on("tap", () => changeList('all'));
    choose.on("tap", chooseTag)
    list.on("swipeleft", () => swift(event, 'operate'));
    list.on("swiperight", () => swift(event, 'status'));
}

function getByClass(cls) {
    return document.getElementsByClassName(cls)[0];
}

function getById(id) {
    return document.getElementById(id);
}

function removeClass(ele, clsName) {
    let clsList = ele.className.split(' ');
    for (let i = 0; i < clsList.length; i++) {
        if (clsList[i].trim() == clsName) {
            clsList.splice(i, 1);
        }
    }
    let name = clsList.join(" ");
    ele.className = name;
}

function addClass(ele, clsName) {
    let clsList = ele.className.split(' ');
    clsList.push(clsName);
    let name = clsList.join(" ");
    ele.className = name;
}

function hasClass(ele, clsName) {
    let clsList = ele.className.split(' ');
    for (let i = 0; i < clsList.length; i++) {
        if (clsList[i].trim() == clsName) {
            return true
        }
    }
    return false;
}

function showList(data) {
    let listBox = getByClass("list");
    listBox.innerHTML = '';
    for (let i in data) {
        listBox.innerHTML = listBox.innerHTML + `<li class="list-item">
             <div class="status-icon">
             <span class="${data[i].status} ${data[i].priority}"></span></div>      
                   <p>${data[i].text} </p>
                    <div class="operate">
                        <span class="edit" data-id="${i}">编辑</span>
                        <span class="delete" data-id="${i}">删除</span>
                    </div>
                    <div class="status">
                        <span class="change-done" data-id="${i}">已完成</span>
                        <span class="change-willdo" data-id="${i}">待办</span>
                        <span class="change-doing" data-id="${i}">进行中</span>
                    </div> 
                    </li>`
    }
}

function changeList(type) {
    if (type == 'all') {
        showList(data);
        getByClass('prompt').style.display = 'none';
        getByClass('choose').style.display = 'block';
        getByClass('list').style.display = 'block';
        getByClass('btn-cancel').style.display = 'none';
        getByClass('complete').style.display = 'none';
        getByClass('add').style.display = 'inline-block';
        getByClass('text-input').style.display = 'none';
        let items = getByClass('choose').getElementsByClassName('item');
        for (let i = 0; i < items.length; i++) {
            items[i].className = "item type"
        }

    } else {
        let oneData = {}
        for (let i in data) {
            if (data[i].priority == 'high' && data[i].status == 'ing') {
                oneData[i] = data[i]
                break;
            }
        }
        showList(oneData);
        getByClass('prompt').style.display = 'block';
        getByClass('choose').style.display = 'none';
        getByClass('text-input').style.display = 'none';
    }
}
/*
 *左右滑动函数
 */
function swift(event, clsName) {
    if (event.target && event.target.nodeName == 'P') {
        event.target.parentNode.getElementsByClassName(clsName)[0].style.display = 'flex';
    }
}
/*
 *跳转到编辑页面
 */
function toEdit() {
    getByClass('list').style.display = 'none';
    getByClass('text-input').style.display = 'block';
    getByClass('btn-cancel').style.display = 'inline-block';
    getByClass('text-input').value = edit_text;
    getByClass('add').style.display = 'none';
    getByClass('complete').style.display = 'inline-block';
    let itemsPriotity = getByClass('priority').getElementsByTagName('div');
    let itemsStatus = getByClass('shedule').getElementsByTagName('div');
    for (let i = 0; i < itemsPriotity.length; i++) {
        itemsPriotity[i].className = "item priority-item";
        if (itemsPriotity[i].getElementsByTagName('span')[0].className == edit_priority) {
            showActive(itemsPriotity, itemsPriotity[i]);
        }
    }
    for (let i = 0; i < itemsStatus.length; i++) {
        itemsStatus[i].className = 'item status-item';
        if (itemsStatus[i].getElementsByTagName('span')[0].className == edit_status) {
            showActive(itemsStatus, itemsStatus[i]);
        }
    }

}

function refresh() {
    const taskStorage = window.sessionStorage;
    let d = JSON.stringify(data);
    taskStorage.setItem("taskdata", d);
    edit_id = -1;
    edit_text = 'this is a new task';
    edit_status = 'will';
    edit_priority = 'low';
}

function changeStatus(el, status) {
    let id = el.getAttribute('data-id');
    data[id].status = status
    el.parentNode.style.display = 'none';
}

function operateList(event) {
    let statusIcon = event.target.parentNode.parentNode.getElementsByTagName("span")[0];
    let cls = event.target.className
    let id = event.target.getAttribute('data-id');
    if (cls == 'edit') {
        edit_text = data[id].text;
        edit_id = id;
        edit_priority = data[id].priority;
        edit_status = data[id].status;
        toEdit();
        refresh();
        return;
    }
    if (cls == "change-done") {
        changeStatus(event.target, 'done');
    }
    if (cls == 'change-willdo') {
        changeStatus(event.target, 'will');
    }
    if (cls == 'change-doing') {
        changeStatus(event.target, 'ing');
    }
    if (cls == 'delete') {
        delete data[id];
        event.target.parentNode.style.display = 'none';
    }
    refresh();
    changeList('all');
}

function editData() {
    let changetext = getByClass('text-input').value;
    if (edit_id == -1) {
        edit_id = Date.now();
        data[edit_id] = {};
    }
    data[edit_id].text = changetext;
    data[edit_id].priority = edit_priority;
    data[edit_id].status = edit_status;
    refresh();
    changeList('all');
}

function chooseTag(e) {
    if (e.target && hasClass(e.target, 'priority-item')) {
        let items = document.getElementsByClassName('priority-item');
        showActive(items, e.target);
        edit_priority = e.target.getElementsByTagName('span')[0].className;

    }
    if (e.target && hasClass(e.target, 'status-item')) {
        let items = document.getElementsByClassName('status-item');
        showActive(items, e.target);
        edit_status = e.target.getElementsByTagName('span')[0].className;
    }
    if (e.target && hasClass(e.target, 'type')) {
        const selected_priority = {};
        const selected_status = {};
        const renderList={};
        if (hasClass(e.target, 'selected')) {
            removeClass(e.target, 'selected');
        } else {
            addClass(e.target, 'selected');
        }
        let prioSel=getByClass('priority').getElementsByClassName('selected');
        for (var i = 0; i < prioSel.length; i++) {
            let proCls=prioSel[i].getElementsByTagName('span')[0].className;
            selected_priority[proCls]=true;
        }

        let stSel=getByClass('shedule').getElementsByClassName('selected');
        for (var i = 0; i < stSel.length; i++) {
            let proCls=stSel[i].getElementsByTagName('span')[0].className;
            selected_status[proCls]=true;
        }
        
        let flag=false;
        for(let i in data){
            if(data[i].priority in selected_priority){
                flag=true;
                renderList[i]=data[i];
            }
        }
        const renderData={};
        if(!flag){   
            for(let i in data){
            if(data[i].status in selected_status){
                renderData[i]=data[i];
            }
          }
        }else{
        //const renderData={};
        let index=false;
        for(let i in renderList){
            if(renderList[i].status in selected_status){
                index=true;
                renderData[i]=data[i];
            }
        }
        if(!index){
            showList(renderList);
            return;
        }

    }
        showList(renderData)




    }
}

function showActive(eles, target) {
    Array.from(eles).forEach((ele) => {
        removeClass(ele, 'active');
    })
    addClass(target, 'active');
}