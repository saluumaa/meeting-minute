
let attendHolder = document.querySelector('.attend-holder')
let nameInput = document.querySelector('.name')
let time = document.querySelector('.time')
let closeAttendance = document.querySelector('.close-attendance')
let saveAttendanceBtn = document.querySelector('.save-attendance')

let attendances = JSON.parse(localStorage.getItem('attendances')) || []

function renderAttendance(attendances) {
    attendHolder.innerHTML = ''
    attendances.forEach((attendance, index) => {
        let attendDiv = document.createElement('div')
        attendDiv.classList.add('attendance-wrapper')
        attendDiv.setAttribute('data-index', index)
        attendDiv.innerHTML = ` 
        <span class="time-span"> ${attendance.time}
        </span>
        <p class="att-par">${attendance.name}
        </p>
        </div>
        <div class="button-wrapper-att">
        <button type="button" class="Edit-att btn">Edit</button>
        <button type="button" class="Delete-att btn">Delete</button>
        </div>
     ` 
    attendHolder.appendChild(attendDiv)
    })
}

function saveAttendance(e) {
    e.preventDefault()
    let attendance = {
		time: time.value,
        name: nameInput.value,
    }
    attendances.push(attendance)
    localStorage.setItem('attendances', JSON.stringify(attendances))
    renderAttendance(attendances)
    nameInput.value = '' 
}
saveAttendanceBtn.addEventListener('click', saveAttendance)

attendHolder.addEventListener('click', function(e) {
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
            // renderAttendance(attendances)
        }
    }
})

// function editMeeting(e) {
//  let editBtn = e.target
//  let attendDiv = editBtn.closest('.attendance-wrapper')
//  let index = attendDiv.getAttribute('data-index')
//  let parText = attendDiv.querySelector('.att-par')
//  if(editBtn.textContent === 'Edit') {
//     parText.contentEditable = 'true'
//     parText.focus()
//     editBtn.textContent = 'Save'
//     } else {
//     parText.contentEditable = 'false'
//     editBtn.textContent = 'Edit'
//     let attendance = attendances[index]
//     attendance.name = nameInput.value
//     localStorage.setItem('attendances', JSON.stringify(attendances))
//     // renderAttendance(attendances)
//     }

