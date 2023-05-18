let attendList = document.querySelector('.attend-list')
let attendContainer = document.querySelector('.attend-container')
let nameInput = document.querySelector('.name')
let time = document.querySelector('.time')
let attendDate = document.querySelector('.att-date')
let closeAttendance = document.querySelector('.close-attendance')
let addAttendance = document.querySelector('.add-attendance')
let saveAttendanceBtn = document.querySelector('.save-attendance')

let attendances = JSON.parse(localStorage.getItem('attendances')) || []

time.value = '12:00';
function renderAttendance(attendances) {
    attendList.innerHTML = ''
    attendances.forEach((attendance, index) => {
        let attendDiv = document.createElement('div')
        attendDiv.classList.add('attendance-wrapper')
        attendDiv.setAttribute('data-index', index)
        attendDiv.innerHTML = ` 
        <span class="att-date"> ${attendance.attendDate}</span>
        <span class="time-span"> ${attendance.time}</span>
        <p class="att-par">${attendance.name}
        </p>
        </div>
        <div class="button-wrapper-att">
        <button type="button" class="Edit-att btn">Edit</button>
        <button type="button" class="Delete-att btn">Delete</button>
        </div>
     ` 
    attendList.appendChild(attendDiv)
    })
}

function addAttendanceForm() {
    nameInput.hidden = false
    time.hidden = false;
    saveAttendanceBtn.hidden = false
    addAttendance.hidden = true;
    attendDate.hidden = false;
    let newAttendance = {
        name: nameInput.value,
        time: time.value,
        attendDate: attendDate.value,
    }
    let attendances = JSON.parse(localStorage.getItem('attendances')) || [];
    attendances.push(newAttendance)
    localStorage.setItem('attendances', JSON.stringify(attendances))
    renderAttendance(attendances)
    nameInput.value = ''
    time.value = '12:00';
    let attendate = document.querySelector('.att-date')
    attendate.hidden = false;

}


addAttendance.addEventListener('click', addAttendanceForm)

function saveAttendance(e) {
    e.preventDefault()
    let attendance = {
        attendDate: attendDate.value,
		time: time.value,
        name: nameInput.value,
    }
    attendances.push(attendance)
    localStorage.setItem('attendances', JSON.stringify(attendances))
    renderAttendance(attendances)
    nameInput.value = '' 
    time.value = '12:00';
    attendDate.hidden = true;
    attendDate.value = '';
}
saveAttendanceBtn.addEventListener('click', saveAttendance)

attendList.addEventListener('click', function(e) {
    if(e.target.classList.contains('Delete-att')) {
        let index = e.target.parentElement.parentElement.dataset.index
        attendances.splice(index, 1)
        localStorage.setItem('attendances', JSON.stringify(attendances))
        renderAttendance(attendances)
    }

    if(e.target.classList.contains('Edit-att')) {
        let editBtn = e.target
        let attendDiv = editBtn.closest('.attendance-wrapper')
        let index = attendDiv.getAttribute('data-index')
        let parText = attendDiv.querySelector('.att-par')
        if(editBtn.textContent === 'Edit') {
            parText.contentEditable = 'true'
            parText.focus()
            editBtn.textContent = 'Save'
        } else {
            parText.contentEditable = 'false'
            editBtn.textContent = 'Edit'
            let attendance = attendances[index]
            attendance.name = nameInput.value
            localStorage.setItem('attendances', JSON.stringify(attendances))
        }
    }
})

renderAttendance(attendances, attendList)


