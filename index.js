let main = document.querySelector('.main');
let agenda = document.getElementById('agenda')
let action = document.getElementById('action')
let date = document.getElementById('date')
let saveMeetingBtn = document.querySelector('.save-meeting')

let meetings = JSON.parse(localStorage.getItem('meetings')) || []

function renderMeetings(meetings) {
    main.innerHTML = ''
    meetings.forEach((meeting, index) => {
        let containerDiv = document.createElement('div')
        containerDiv.classList.add('container')
        containerDiv.setAttribute('data-index', index)
        containerDiv.innerHTML = `
            <section class="title-date">
                <H1>Meeting Minute</H1>
                <p class="date">
                    ${new Date() .toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                    )}
                 </p>
            </section>
            <section>
                    <div class="write-agenda-wrapper">
                        <div >
                            <h2>Agenda</h2>
                            <textarea name="Agenda" class="agenda-text" cols="35" rows="4" readonly>${meeting.agenda}</textarea>
                        </div>
                        <div>
                            <h2>Action Items</h2>
                            <textarea name="Action" class="action-text" cols="35" rows="4" readonly>${meeting.action}
                            </textarea>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <button type="button" class="Edit btn">Edit</button>
                        <button type="button" class="Delete btn">Delete</button>
                    </div>
            </section>
            </div>

        <!--Attendance-->
        `   
        main.appendChild(containerDiv)
    })
}

function saveMeeting(e) {
    e.preventDefault()
    let meeting = {
        date: date,
        agenda: agenda.value,
        action: action.value,
    }
    meetings.push(meeting)
    localStorage.setItem('meetings', JSON.stringify(meetings))
    renderMeetings(meetings)
    agenda.value = ''
    action.value = ''
}
main.addEventListener('click', (event) => {
  if (event.target.matches('.Edit')) {
    editMeeting(event);
  }
    if (event.target.matches('.Delete')) {
        deleteMeeting(event);
    }
});

function editMeeting(event) {
    let editBtn = event.target
        let containerDiv = editBtn.closest('.container')
        let index = containerDiv.getAttribute('data-index')
        let agendaText = containerDiv.querySelector('.agenda-text')
        let actionText = containerDiv.querySelector('.action-text')
       if(editBtn.textContent === 'Edit') {
        console.log('edit')
        agendaText.readOnly = false
        actionText.readOnly = false
        editBtn.textContent = 'Save'
       }
         else {
            meetings[index].agenda = agendaText.value
            meetings[index].action = actionText.value
            localStorage.setItem('meetings', JSON.stringify(meetings))
            agendaText.readOnly = true
            actionText.readOnly = true
            editBtn.textContent = 'Edit'
       }
    }

function deleteMeeting(e) {
    let deleteBtn = e.target
    let containerDiv = deleteBtn.closest('.container')
    let index = containerDiv.getAttribute('data-index')
    meetings.splice(index, 1)
    localStorage.setItem('meetings', JSON.stringify(meetings))
    renderMeetings(meetings)
}


saveMeetingBtn.addEventListener('click', saveMeeting)

document.addEventListener('DOMContentLoaded', () => {   
    renderMeetings(meetings)
});
