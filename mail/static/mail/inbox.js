// git commit -am ""
// git push origin main
// python manage.py runserver


document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
document.querySelector('#compose-form').addEventListener('submit', compose_submit);
 // Select all elements with both "btn" and "btn-success" classes and add click event listener
 

  // By default, load the inbox
  load_mailbox('inbox');

  

});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#individual').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Clear the content of the "mail" div
  const div = document.querySelector('#mail');
  div.innerHTML = '';

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(mails => {
      const emailList = document.createElement('ul');
      emailList.className = 'list-group';
      emailList.style = 'margin: 38px; border: 5px solid green; border-radius: 18px; ';

      mails.forEach(mail => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        // Handle read/unread status
        if (!mail.read) {
          listItem.style.backgroundColor = 'red'; // Unread mail
        } else {
          listItem.style.backgroundColor = 'blue'; // Read mail
        }

        const archiveButton = document.createElement('button');
        archiveButton.className = 'btn btn-success';
        archiveButton.innerHTML = mailbox === 'archive' ? 'Unarchive' : 'Archive';

        // Add click event listener to archive/unarchive button
        archiveButton.addEventListener('click', function (event) {
          event.stopPropagation();
          console.log("from archive button");
          const newArchiveStatus = mailbox === 'archive' ? false : true;
console.log(newArchiveStatus);
          // Update the archived status using the API
          fetch(`/emails/${mail.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              archived: newArchiveStatus
            })
          }).then(response => {
            // Handle the response accordingly (e.g., reload the mailbox)
            if (response.status === 204) {
              load_mailbox(mailbox); // Reload the mailbox after the action
            } else {
              // Handle errors if needed
              console.error('Failed to update archive status');
            }
          });
        });
        

        listItem.innerHTML = `
          <div class="list-group-item"><strong>From:</strong> ${mail.sender}<br></div>
          <div class="list-group-item"><strong>To:</strong> ${mail.recipients}<br></div>
          <div class="list-group-item"><strong>Subject:</strong> ${mail.subject}<br></div>
          <div class="list-group-item"><strong>Body:</strong> ${mail.body}<br></div>
          <div class="list-group-item"><strong>Timestamp:</strong> ${mail.timestamp}<hr><hr></div>
        `;

        // Append archive/unarchive button to the list item
        listItem.appendChild(archiveButton);

        emailList.appendChild(listItem);
      });

      div.appendChild(emailList);
    });
}

 function view_mail(id)

 {
  //1st clearing an previous values
  document.querySelector('#individual').innerHTML = ``;


   outline.addEventListener('click',mail);
   // Show the #mail and hide other views
   document.querySelector('#emails-view').style.display = 'none';
   document.querySelector('#compose-view').style.display = 'none';
   document.querySelector('#mail').style.display = 'none';
            //target div for showing
   document.querySelector('#individual').style.display = 'block';
    
     fetch(`/emails/${id}`)
      .then(response => response.json())
      .then(mail => {
          // Print email
         // console.log("inside the api and fetched")// -> passes it works
           //1>inside div create elem. ul , 2>
          div = document.querySelector('#individual');
          outline = document.createElement('ul');
          outline.className = 'list-group';
          //Settin style for outline through js 
          outline.style.padding = '28px';
          outline.style.borderRadius = '18px';
          outline.style.border = '5px solid rgba(255, 255, 0, 0.5)';
          //---styling end----
          div.innerHTML = ` <h1 style=" padding: 18px; margin: 20px; ">Mail:</h1>`
 
          
         outline.innerHTML=  `<li class="list-group-item"> <strong>from:</strong> ${mail.sender} </li><br>
          <li class="list-group-item" > <strong>to:</strong> ${mail.recipients} </li><br>
          <li class="list-group-item" > <strong>Subject:</strong> ${mail.subject} </li><br>
          <li class="list-group-item" > <strong>Body:</strong> ${mail.body} </li><br>
          <li class="list-group-item" > <strong>Timestamp:</strong> ${mail.timestamp}</li><hr><hr>`;
     
          div.appendChild(outline);   
         
        }); 
   //on pop  

   // marking email as read when opened
   fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  })

  console.log("from ->marking email as read when opened");

 }

function compose_submit() {
// Clear existing emails from the view
document.querySelector('#emails-view').innerHTML = '';

//var to strore 

    const to = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const    body = document.querySelector('#compose-body').value;

// sendin email to server

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: to,
            subject: subject,
            body: body
            //conole.log(body)
        })
    })
    .then(response => response.json())
    .then( () => {
      document.querySelector('#compose-recipients').value = '';
      document.querySelector('#compose-subject').value = '';
      document.querySelector('#compose-body').value = ''; 
        });
    // load_mailbox('sent');
}