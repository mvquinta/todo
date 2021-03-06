(()=>{"use strict";const e=function(e){let t={projName:e};return Object.assign(t,function(e,t,a,n,s=!1){let d={id:Date.now(),title:e,comment:t,duedate:a,priority:n,done:s};return Object.assign(d)}())},t=document.querySelector(".home-h1"),a=document.querySelector(".add-task"),n=document.querySelector(".div-form-add-task"),s=document.querySelector(".task-list-li-container"),d=document.querySelector(".task-container"),i=document.querySelector(".project-name"),c=document.querySelector(".btn-add-proj"),o=document.querySelector(".div-for-add-proj"),l=document.querySelector(".ul-projects-list");function r(e){let t;t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),t.push(e),localStorage.setItem("tasks",JSON.stringify(t))}t.addEventListener("click",(()=>{location.reload()})),document.addEventListener("DOMContentLoaded",(()=>{!function(e){let t;t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),t.forEach((function(e){if(Object.keys(e).length<=3){const t=document.createElement("li");l.appendChild(t);const a=document.createElement("a");a.setAttribute("href","#"),a.classList.add("new-proj-name"),a.innerHTML=e.projName;const n=document.createElement("button");n.classList.add("btn-del-proj"),n.innerHTML='<i class="icons-task-items" data-feather="trash">',a.appendChild(n),t.appendChild(a),feather.replace()}else{if(!(Object.keys(e).length>=4))return 0;{const t=document.createElement("div");t.classList.add("myTodo"),s.appendChild(t);const a=document.createElement("li");a.classList.add("task-item"),a.innerHTML=e.title,t.appendChild(a);const n=document.createElement("button");n.innerHTML='<i class="icons-task-items" data-feather="trash">',n.classList.add("btn-trash"),t.appendChild(n);const d=document.createElement("button");d.innerHTML='<i class="icons-task-items" data-feather="check"></i>',d.classList.add("btn-check"),t.appendChild(d);const i=document.createElement("div");i.classList.add("div-task-info"),t.appendChild(i);const c=document.createElement("li");c.classList.add("task-comment"),c.innerHTML=e.comment,i.appendChild(c);const o=document.createElement("button");o.classList.add("disable-btn"),o.innerHTML='<i class="icons-task-info" data-feather="flag"></i>',"high"===e.priority?o.classList.add("highP"):"medium"===e.priority?o.classList.add("mediumP"):o.classList.add("lowP"),i.appendChild(o);const l=document.createElement("button");l.classList.add("disable-btn"),l.innerHTML=e.duedate+'<i class="icons-task-info" data-feather="calendar"></i>',i.appendChild(l),!0===e.done&&t.classList.add("checkTask")}}}))}(),feather.replace()})),a.addEventListener("click",(t=>{if("btn-add-task"===t.target.classList[0]&&!document.querySelector(".div-form")){const t=document.createElement("div");t.classList.add("div-form"),n.appendChild(t);const a=document.createElement("form");a.classList.add("form-add-task"),a.id="addTaskForm",t.appendChild(a);const d=document.createElement("input");d.classList.add("input-add-task"),d.setAttribute("type","text"),d.setAttribute("placeholder","Add a task"),a.appendChild(d),d.focus();const c=document.createElement("input");c.classList.add("dueDate-add-task"),c.setAttribute("type","date"),c.setAttribute("name","date"),c.setAttribute("placeholder",""),a.appendChild(c);const o=document.createElement("label");o.setAttribute("for","priority"),a.appendChild(o);const l=document.createElement("select");l.setAttribute("name","priority"),l.setAttribute("id","priority"),l.setAttribute("form","addTaskForm"),a.appendChild(l);const m=document.createElement("option");m.setAttribute("value","high"),m.innerHTML="High",l.appendChild(m);const u=document.createElement("option");u.setAttribute("value","medium"),u.innerHTML="Medium",l.appendChild(u);const p=document.createElement("option");p.setAttribute("value","low"),p.innerHTML="Low",l.appendChild(p);const h=document.createElement("div");h.classList.add("div-form-bottom"),t.appendChild(h);const L=document.createElement("input");L.classList.add("comment-add-task"),L.setAttribute("type","text"),L.setAttribute("placeholder","Add a comment"),h.appendChild(L);const f=document.createElement("button");f.classList.add("btn-add-task"),f.id="confirmAddTask",f.innerHTML="Add Task",h.appendChild(f),f.addEventListener("click",(t=>{if(!0===function(e){let t,a=!1;return t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),t.forEach((function(t){if(void 0===t.title)return 0;t.title.toLowerCase()===e.toLowerCase()&&(a=!0)})),a}(d.value)||""===d.value)alert("Task already exists or nothing was written. Please review your task.");else{let t;t="All Projects"===i.innerHTML?e("Inbox"):e(i.innerHTML),t.title=d.value,t.comment=L.value,t.duedate=c.value,t.priority=l.value,function(e){r(e);const t=document.createElement("div");t.classList.add("myTodo"),s.appendChild(t);const a=document.createElement("li");a.classList.add("task-item"),a.innerHTML=e.title,t.appendChild(a);const n=document.createElement("button");n.innerHTML='<i class="icons-task-items" data-feather="trash">',n.classList.add("btn-trash"),t.appendChild(n);const d=document.createElement("button");d.innerHTML='<i class="icons-task-items" data-feather="check"></i>',d.classList.add("btn-check"),t.appendChild(d);const i=document.createElement("div");i.classList.add("div-task-info"),t.appendChild(i);const c=document.createElement("li");c.classList.add("task-comment"),c.innerHTML=e.comment,i.appendChild(c);const o=document.createElement("button");o.classList.add("disable-btn"),o.innerHTML='<i class="icons-task-info" data-feather="flag"></i>',"high"===e.priority?o.classList.add("highP"):"medium"===e.priority?o.classList.add("mediumP"):o.classList.add("lowP"),i.appendChild(o);const l=document.createElement("button");l.classList.add("disable-btn"),l.innerHTML=e.duedate+'<i class="icons-task-info" data-feather="calendar"></i>',i.appendChild(l),document.querySelector(".div-form").remove()}(t),feather.replace()}}));const k=document.createElement("button");k.classList.add("btn-add-task"),k.id="cancelAddTask",k.innerHTML="Cancel",h.appendChild(k),k.addEventListener("click",(e=>{t.remove()}))}})),d.addEventListener("click",(function(e){const t=e.target;if("btn-trash"===t.classList[0]){const e=t.parentElement;!function(e){let t;t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks"));const a=e.children[0].innerText;let n=t.findIndex((e=>e.title===a));t.splice(n,1),localStorage.setItem("tasks",JSON.stringify(t))}(e),e.remove()}})),d.addEventListener("click",(function(e){const t=e.target;if("btn-check"===t.classList[0]){const e=t.parentElement;e.classList.toggle("checkTask"),function(e){let t;t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),t.forEach((function(a){a.title===e&&(!1===a.done?(a.done=!0,console.log("im here"),console.log(a.done),localStorage.setItem("tasks",JSON.stringify(t))):!0===a.done&&(console.log("im there"),a.done=!1,console.log(a.done),localStorage.setItem("tasks",JSON.stringify(t))))}))}(e.firstChild.innerText)}})),c.addEventListener("click",(function(){const t=document.createElement("div");t.classList.add("div-form-proj"),o.appendChild(t);const a=document.createElement("form");a.classList.add("form-add-proj"),a.id="addProjForm",t.appendChild(a);const n=document.createElement("input");n.classList.add("input-add-proj"),n.setAttribute("type","text"),a.appendChild(n),n.focus();const s=document.createElement("button");s.classList.add("btn-add-project"),s.id="confirmAddProj",s.innerHTML="Add Project",t.appendChild(s),s.addEventListener("click",(a=>{if(!0===function(e){let t,a=!1;return t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),t.forEach((function(t){t.projName.toLowerCase()===e.toLowerCase()&&(a=!0)})),a}(n.value)||""===n.value)alert("Task already exists or nothing was written. Please review your task.");else{let t=e(n.value);r(t);const a=document.createElement("li");l.appendChild(a);const s=document.createElement("a");s.setAttribute("href","#"),s.classList.add("new-proj-name"),s.innerHTML=t.projName;const d=document.createElement("button");d.classList.add("btn-del-proj"),d.innerHTML='<i class="icons-task-items" data-feather="trash">',s.appendChild(d),a.appendChild(s),feather.replace()}t.remove()}));const d=document.createElement("button");d.classList.add("btn-cancel-project"),d.id="cancelAddProj",d.innerHTML="Cancel",t.appendChild(d),d.addEventListener("click",(e=>{t.remove()}))})),document.addEventListener("click",(e=>{const t=e.target;"main-proj-name"!==t.classList[0]&&"new-proj-name"!==t.classList[0]||(i.innerText=t.innerText,function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(s),function(){let e;e=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),e.forEach((function(e){if(Object.keys(e).length<=3)return 0;if(e.projName===i.innerHTML){const t=document.createElement("div");t.classList.add("myTodo"),s.appendChild(t);const a=document.createElement("li");a.classList.add("task-item"),a.innerHTML=e.title,t.appendChild(a);const n=document.createElement("button");n.innerHTML='<i class="icons-task-items" data-feather="trash">',n.classList.add("btn-trash"),t.appendChild(n);const d=document.createElement("button");d.innerHTML='<i class="icons-task-items" data-feather="check"></i>',d.classList.add("btn-check"),t.appendChild(d);const i=document.createElement("div");i.classList.add("div-task-info"),t.appendChild(i);const c=document.createElement("li");c.classList.add("task-comment"),c.innerHTML=e.comment,i.appendChild(c);const o=document.createElement("button");o.classList.add("disable-btn"),o.innerHTML='<i class="icons-task-info" data-feather="flag"></i>',"high"===e.priority?o.classList.add("highP"):"medium"===e.priority?o.classList.add("mediumP"):o.classList.add("lowP"),i.appendChild(o);const l=document.createElement("button");l.classList.add("disable-btn"),l.innerHTML=e.duedate+'<i class="icons-task-info" data-feather="calendar"></i>',i.appendChild(l),!0===e.done&&t.classList.add("checkTask")}}))}(),feather.replace())})),document.addEventListener("click",(e=>{const t=e.target;"btn-del-proj"===t.classList[0]&&(function(e){let t,a=0;t=null===localStorage.getItem("tasks")?[]:JSON.parse(localStorage.getItem("tasks")),t.forEach((function(t){t.projName===e&&(a+=1)}));for(let n=0;n=a;n++)t.forEach((function(a){if(a.projName===e){let a=t.findIndex((t=>t.projName===e));t.splice(a,1),localStorage.setItem("tasks",JSON.stringify(t))}})),a-=1}(t.parentElement.innerText),function(e){const t=e.target;"btn-del-proj"===t.classList[0]&&t.parentElement.parentElement.remove()}(e))}))})();