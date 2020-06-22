// 宣告變數
var taskInput = document.querySelector('#taskInput'); // 取得待辦事項輸入文字
var addBtn = document.querySelector('#addTask'); // 取得送出按鈕
var taskCount = document.querySelector('#taskCount'); // 取得待辦事項數量
var delAllBtn = document.querySelector('#delAllTasks'); // 取得刪除所有任務按鈕
var taskList = document.querySelector('#taskList'); // 取得待辦事項清單
var taskData = []; //宣告一個陣列放待辦事項資料

// 建立監聽
addBtn.addEventListener('click', addNewTask); // 按下送出按鈕，執行addNewTask function
delAllBtn.addEventListener('click', delAllTask); //按下清除所有任務按鈕，執行delAllTask function
taskList.addEventListener('click', takeAction);  // 參考範例解答，以監聽父元素的方式，減少對已存在的元素重複加上監聽事件


// 新增待辦事項
function addNewTask() {
    var newTask = taskInput.value.trim(); // 此處原本沒有加上"trim()"，參考範例解答發現有加，google後推測應是為了去除字串前的空格，故跟隨加上
    var timeStamp = Math.floor(Date.now()); // 此處參考範例解答，取現在的日期當作 task 的 id

    // 假如取得的字串不為空
    if (newTask !== '') {
        taskData.push({
            id: timeStamp,
            content: newTask,
            completed: false,
        })
        taskInput.value = ''; //清空輸入欄
        renderPage(taskData);

    } else {
        alert('待辦事項不得為空或空格，請重新輸入');
        taskInput.value = ''; //清空輸入欄
    }
}

//刪除所有待辦事項
function delAllTask(e) {
    e.preventDefault(); // 取消事件的默認行為
    taskData = []; // 清空待辦事項
    renderPage(taskData);
}

// 此處參考範例修改，定義待辦事項清單的動作，根據不同條件執行不同行為
function takeAction(e) {
    var action = e.target.dataset.action;
    var id = e.target.dataset.id;
    if (action == 'delete') {
        delTask(id)
    } else if (action === 'complete') {
        completeTask(id)
    }
}

// 呈現待辦事項清單
function renderPage(data) {
    var str = ``;
    // 將待辦事項條列成清單
    data.forEach((item) => {
        str += `<li class="taskEvent list-group-item">
        <div class="d-flex justify-content-between">
            <div class="form-check">
                <input id="item_${item.id}" class="form-check-input" type="checkbox" data-action="complete" data-id="${item.id}" ${item.completed ? 'checked' : ''}>
                <label class="form-check-label ${item.completed ? 'completed':''}" for="item_${item.id}">
                    ${item.content}
                </label>
            </div>
            <button class="delTask btn btn-outline-danger btn-sm" data-action ="delete" data-id="${item.id}">刪除</button>
        </div>
    </li>`;
    })
    taskList.innerHTML = str;
    taskCount.textContent = data.length; // 取得待辦事項筆數

    // 將刪除按鈕建立監聽，不過看到slack討論，這樣每新增一個新的button，就會重複將已存在的buton加上監聽事件，故應該改用監聽父元素
    // var removebtns = document.querySelectorAll('.delTask');
    // removebtns.forEach(function (removebtn) {
    //    removebtn.addEventListener('click', delTask);
    //})
}


// 刪除待辦事項，此處參考範例解答
//但是看不懂為什麼forEach要這樣寫，不是只要用id去刪除對應的資料就好嗎QQ? 程式碼看起來似乎是拿id去對，對到的刪掉?
function delTask(id) {
    var newIndex = 0;
    taskData.forEach((item, key) => {
        if (id == item.id) {
            newIndex = key;
        }
    })
    taskData.splice(newIndex, 1);
    renderPage(taskData);
}

// 更改待辦事件狀態，此處參考範例解答
function completeTask(id) {
    taskData.forEach((item) => {
        if (id == item.id) {
            item.completed = item.completed ? false : true; // 取得completed狀態，假如狀態為 false，則變更為 true，反之則更新為 false
        }
    })
    
    renderPage(taskData);
}