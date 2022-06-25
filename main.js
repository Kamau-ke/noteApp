const noteContainer=document.querySelector('.app');
const addBtn=noteContainer.querySelector('.add-note');

getNote().forEach(note=>{
    const noteElement=createNote(note.id, note.content);

    noteContainer.insertBefore(noteElement, addBtn)
})

addBtn.addEventListener('click', ()=>addNote())

function getNote(){
return JSON.parse(localStorage.getItem('stickynotes-notes') || '[]' );  
}

function saveNote(notes){
localStorage.setItem('stickynotes-notes', JSON.stringify(notes))

}

function createNote(id, content){
const element=document.createElement('textarea')

element.classList.add('note');
element.value=content;
element.placeholder="Add new notes"


element.addEventListener('change', ()=>{
    updateNote(id, element.value)
});

element.addEventListener('dblclick', ()=>{
    const doDelete=confirm('Are you sure you want to delete');

    if(doDelete){
        deleteNote(id,element )
    }
})

return element;
}

function addNote(){
    const notes=getNote();

    const noteObject={
        id: Math.floor(Math.random()*100000),
        content: " "
    }

    const noteElement=createNote(noteObject.id, noteObject.content);
    noteContainer.insertBefore(noteElement, addBtn)

    notes.push(noteObject)
    saveNote(notes)

}

function updateNote(id, newContent ){
    const notes=getNote();

    const targetNote=notes.filter(note =>note.id ==id)[0];
    targetNote.content=newContent;

    saveNote(notes)
}

function deleteNote(id, element){
const note=getNote().filter(notes=>notes.id !=id )

    saveNote(note);
    noteContainer.removeChild(element)
}
