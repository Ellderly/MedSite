const blockBtn = document.querySelector('.left-menu_top-record')
const wrapperRecord = document.querySelector('.record_date');

blockBtn.addEventListener('click', (e)=>{
  const btn = document.querySelectorAll('.btn-record');
  const target = e.target
  if(e.target.closest('button')){

    btn.forEach(btn => {
      btn.classList.remove('_btn_active')
    })

    target.classList.add('_btn_active')
  }
  if(e.target.closest('.btn-js-1')){
    wrapperRecord.classList.remove('_none')
  }
  if(e.target.closest('.btn-js-2')){
    wrapperRecord.classList.add('_none')
  }
})



const  recordData = document.querySelector('.record__date')
const dataBlock = document.querySelector('.data-block')

function date_time(d) {
  let newDate = new Date()

  let day = newDate.getDate() + d;
  let month = newDate.getMonth()
  let year = newDate.getFullYear()

  return day +  '.' + month + '.' + year;
}
recordData.innerHTML = date_time(0);


let minDay = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 2).toLocaleDateString();
let maxDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleDateString();


// const leftArrow = document.querySelector('.left-arrow');
// const rightArrow = document.querySelector('.right-arrow');
let date_count = 0;

dataBlock.addEventListener('click', (e) =>{

  if (e.target.closest('.left-arrow')){
    if(minDay < recordData.innerHTML){
    date_count--;
    recordData.innerHTML = date_time(date_count);
    }
  }

  if (e.target.closest('.right-arrow')){
    if(maxDay > recordData.innerHTML) {
    date_count++;
    recordData.innerHTML = date_time(date_count);
  }
  }
})


const navList = document.querySelector('.nav-list')
const processClass = document.querySelector('.process')
const complaints = document.querySelector('.complaints')

navList.addEventListener('click', (e)=> {
  const tabsElemNavbar = document.querySelectorAll('.nav-list_elem');

  if (e.target.closest('.nav-list_elem')){

    tabsElemNavbar.forEach(btn => {
        btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }
  if(!e.target.closest('.nav-list_first_elem')){
    processClass.classList.add('_none')
    complaints.classList.add('_none')
  }
  if(e.target.closest('.nav-list_first_elem')){
    processClass.classList.remove('_none')
    complaints.classList.remove('_none')
  }
})

const complaintsAdd = document.querySelector('.complaints_add')


complaintsAdd.addEventListener('click', () =>{
  const complaintsAddWrapper = document.querySelector('.complaints_add_wrapper')

  complaintsAddWrapper.classList.remove('inactive')
})

const complaintsSearch = document.querySelector('.complaints_search');

complaintsSearch.addEventListener('keyup', (e) =>{
  if (e.keyCode == 13){
    console.log(complaintsSearch.value);
    complaintsList.insertAdjacentHTML(
      'beforeend',
      `   <li class="complaints-list_elem">${complaintsSearch.value}</li>`
    );
    complaintsSearch.value = ''
  }
})



// document.querySelector('.all_comment').classList.add('123')

const complaintsList = document.querySelector('.complaints-list');

complaintsList.addEventListener('click',(e) =>{
  e.target.classList.toggle('active');
})

const complaintsListElem = document.getElementsByClassName('complaints-list_elem');

const commentId = document.querySelector('#comment');
const trackCounter = document.querySelector('.track_counter');

commentId.oninput = function(){
  this.value = this.value.slice(0, 1800);
  trackCounter.innerHTML = commentId.value.length;
}



const btnCancel = document.querySelector('.btn_cancel');
  btnCancel.addEventListener('click', () =>{
    commentId.value = '';
  })

const listSymptoms = document.querySelector('.list_symptoms');
listSymptoms.addEventListener('click', (e)=>{
  if (e.target.closest('.symptom_btn')){
    e.target.classList.toggle('active');
  }

  let allComment = document.querySelectorAll('.all_comment');
  for (const allCommentElement of allComment) {
    console.log(e.target)
    if(e.target.closest('.num_1')){
      if(!allCommentElement.closest('.Кашель')){
        allCommentElement.classList.toggle('_none');
      }
    }
    if(e.target.closest('.num_2')){
      if(!allCommentElement.closest('.Головная-боль')){
        allCommentElement.classList.toggle('_none');
      }
    }
    if(e.target.closest('.num_3')){
      if(!allCommentElement.closest('.Головокружение')){
        allCommentElement.classList.toggle('_none');
      }
    }
  }
})


let comments = [];
let sympActive = [];
let sympClasses = [];
// loadComments();


document.querySelector('.btn_save').addEventListener('click', (e) => {
  e.preventDefault();

  sympActive = '';
  sympClasses = '';
  for (const complaintsListElemElement of complaintsListElem) {
    if(complaintsListElemElement.closest('.active')){
      sympActive += `<span class="symp_sub_elem">${complaintsListElemElement.innerHTML}</span>`;
      sympClasses += `${complaintsListElemElement.innerHTML.replace(/\s/g, '-') + ' '}`
    }
  }


  let commentText = commentId;
  let comment = {
    text: commentText.value,
    time: Math.floor(Date.now()/1000),
    symp: sympActive,
    classes: sympClasses
  }

  commentText.value = '';
  comments.push(comment);

  saveComments();
  showComments();
})

function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments));
}

// function loadComments() {
//   if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
//   showComments();
// }

function showComments(){
  let commentField = document.querySelector('.comment-field');
  let out = '';


  comments.forEach((item)=>{
    out += `<div class="all_comment ${(item.classes)}">
    <div class="symp_sub">${(item.symp)}</div>
    <div class = "comment-wrapper-create">
    <div class = "time-block">
    <p class = "time-elem timeD">${timeConverterD(item.time )}</p>
    <p class = "time-elem timeH">${timeConverterH(item.time )}</p>
    </div>
    <p class = "text-comment">${(item.text )}</p>
    <div class="comment_btns">
    <button class="comment_btn_change comment_btn"></button>
    <button class="comment_btn_close comment_btn"></button>
    </div>
    </div>
</div>`
  });

  commentField.innerHTML = out;

}

function timeConverterH(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = hour + ':' + min + ':' + sec;
  return time;
}
function timeConverterD(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = date + ':' + month + ':' + year;
  return time;
}


document.addEventListener('click', (e) =>{
  if(e.target.closest('.comment_btn_close')){
    e.target.closest('.all_comment').remove();
    comments.splice(e, 1);
  }
})

