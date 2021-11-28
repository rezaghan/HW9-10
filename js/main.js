// variable
let noteInput = document.querySelector('#noteInput')
let DescInput = document.querySelector('#DescInput')
let dueDate = document.querySelector('#dueDate')

let form = document.querySelector('form')
let ulTag = document.querySelector('ul')

let editItemId;

// eventListener

function eventListener() {
    form.addEventListener('submit', newNote)
    ulTag.addEventListener('click', removeNote)
    ulTag.addEventListener('click', editNote)
    ulTag.addEventListener('click', checknote)
    document.addEventListener('DOMContentLoaded', loadLs)
        // document.addEventListener('DOMContentLoaded', loadLsCh)
    document.querySelector('#edit').addEventListener('click', setNoteEdited)
}
eventListener()

// function


function newNote(e) {

    e.preventDefault()

    if (noteInput.value === '') {
        document.querySelector('p').style.visibility = 'visible'
        noteInput.style.boxShadow = '0 0 0 0.1rem #F44336'
    } else {
        noteInput.style.boxShadow = '0 0 0 0rem rgba(0, 0, 0, 0)'
        document.querySelector('p').style.visibility = 'hidden'
        let note = noteInput.value
        let desc = DescInput.value
        let due = dueDate.value
        fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: note,
                    description: desc,
                    dueDate: due,
                })
            }).then(res => res.json())
            .then((res) => {
                if (res) {
                    console.log('response send ========>', res)
                    ulTag.innerHTML = "";
                    loadLs()
                    noteInput.value = "";
                    DescInput.value = "";
                    dueDate.value = "";
                } else {

                }





            });



        // let newNote = `
        //         <div class="contentBox d-flex align-items-center">
        //             <input type="checkbox" class="align-middle" aria-label="Checkbox for following text input" style="margin-right: 20px;">
        //             <h2>${note}</h2>
        //         </div>
        //         <div class="iconBox">
        //             <a class="pencilBtn" href="#"><i class="fas fa-pencil-alt"></i></a>
        //             <a class="trashBtn" href="#"><i class="fas fa-trash-alt ml-auto"></i></a>
        //         </div>`

        // let li = document.createElement('li')
        // li.classList = 'd-flex align-items-center justify-content-between'
        // li.innerHTML = newNote

        // ulTag.appendChild(li)

        // noteInput.value = ''
        // addNoteToLS(note)
    }
    // console.log(numId);
}

function loadLs() {

    fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }

        }).then(res => res.json())
        .then((res) => {

            console.log(res)
            let notes = res
            $(function() {
                let container = $('#pagination');
                container.pagination({
                    dataSource: res,
                    pageSize: 5,
                    callback: function(data, pagination) {
                        var dataHtml = '<ul class="ulData">';

                        $.each(data, function(index, item) {
                            let newNote = `
                            <div class="contentBox d-flex align-items-center">
                                <input id= "checkBox" class="checkBox" type="checkbox" class="align-middle" aria-label="Checkbox for following text input" style="margin-right: 20px;">
                                <h2 for="checkBox">${item.title}</h2>
                            </div>
                            <div class="iconBox">
                                <a class="pencilBtn" ><i id=${item.id} class="fas fa-pencil-alt"></i></a>
                                <a class="trashBtn"><i id=${item.id} class="fas fa-trash-alt ml-auto"></i></a>
                            </div>`
                                // dataHtml += '<li class="d-flex align-items-center justify-content-between">' + newNote + '</li>';
                            let li = document.createElement('li')
                            li.classList = 'd-flex align-items-center justify-content-between'
                            li.innerHTML = newNote
                            ulTag.prepend(li)
                        });

                        // dataHtml += '</ul>';




                        // $("#data-container").html(dataHtml);
                    }
                })
            })

        });



}

function addNoteToLS(note) {
    const notes = getNotesFromLocalStorage()

    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))
}


// function getNotesFromLocalStorage() {
//     let notes;
//     let getFromLS = localStorage.getItem('notes');

//     if (getFromLS === null) {
//         notes = []
//     } else {
//         notes = JSON.parse(getFromLS)
//     }
//     return notes
// }

function removeNote(e) {
    console.log('dfkgjdslfgjdfl===================');
    // if (e.target.classList.contains('fa-trash-alt')) {
    console.log(e.originalTarget.id);
    // if (confirm(`delet ${e.target.parentElement.parentElement.parentElement.querySelector('h2').innerText} ?`) === true) {

    //     e.target.parentElement.parentElement.parentElement.remove()
    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${e.originalTarget.id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((res) => {
            if (res) {
                console.log('response send ========>', res)
                ulTag.innerHTML = "";
                loadLs()
            } else {

            }

        });
    // removeFromLS(e.target.parentElement.parentElement.parentElement.querySelector('h2'))
    // }


    // if (confirm(`delet ${e.target.parentElement.parentElement.parentElement.querySelector('h2').innerText} ?`) === true) {

    //     e.target.parentElement.parentElement.parentElement.remove()
    //     removeFromLS(e.target.parentElement.parentElement.parentElement.querySelector('h2'))
    // }

    // }
}

function removeFromLS(noteC) {
    let note = noteC.innerText


    let notes = getNotesFromLocalStorage()


    if (notes.includes(note) === true) {
        let noteIndex = notes.indexOf(note)
        notes.splice(noteIndex, 1)
    }

    localStorage.setItem('notes', JSON.stringify(notes))
}



function editNote(e) {
    let note;
    if (e.target.classList.contains('fa-pencil-alt')) {
        // note = e.target.parentElement.parentElement.parentElement.querySelector('h2')
        console.log(e.originalTarget.id);
        fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${e.originalTarget.id}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then((res) => {
                if (res) {
                    console.log('response get ========>', res)
                    let submit = document.querySelector('#submit')
                    let edit = document.querySelector('#edit')
                    submit.style.display = 'none'
                    edit.style.display = 'block'
                    noteInput.value = res.title
                    DescInput.value = res.description
                    dueDate.value = res.dueDate
                    editItemId = res.id

                } else {

                }

            });

        // noteInput.focus()
        // DescInput.focus()
        // dueDate.focus()
        // noteInput.value = 
        // DescInput.value = 
        // dueDate.value = 
        // note.classList = 'classEdit'
    }
}

function setNoteEdited(e) {
    e.preventDefault()
    console.log(e);
    console.log(editItemId);
    let note = noteInput.value
    let desc = DescInput.value
    let due = dueDate.value
    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${editItemId}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: note,
                description: desc,
                dueDate: due,
            })
        }).then(res => res.json())
        .then((res) => {
            if (res) {
                console.log('response send ========>', res)
                ulTag.innerHTML = "";
                loadLs()
                noteInput.value = "";
                DescInput.value = "";
                dueDate.value = "";
            } else {

            }





        });
    // let note = document.querySelector('.classEdit')
    // console.log(note);

    // let notes = getNotesFromLocalStorage()

    // let noteDelet = notes.indexOf(note.innerText)
    // notes[noteDelet] = noteInput.value

    // console.log(note.innerText);
    // console.log(notes);
    // localStorage.setItem('notes', JSON.stringify(notes))

    // note.innerText = noteInput.value
    // document.querySelector('h2').classList = ' '



    let submit = document.querySelector('#submit')
    let edit = document.querySelector('#edit')

    submit.style.display = 'block'
    edit.style.display = 'none'
}





let notChecked;

function checknote(e) {
    if (e.target.classList.contains('checkBox')) {

        if (e.target.checked === true) {
            not = e.target.parentElement.querySelector('h2')
            not.style.color = '#7f8c8d'
            not.style.textDecoration = 'line-through'

            e.target.value = not.innerText

            console.log(e.target.parentElement.parentElement);


        } else if (e.target.checked === false) {

            let not = e.target.parentElement.querySelector('h2')
            not.style.textDecoration = 'none'
            not.style.color = '#2B2B2B'

        }

    }
}

// function text1() {
//     let test = ulTag.indexOf(li.input.checked)
//     console.log(test);
// }