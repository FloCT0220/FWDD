// document.addEventListener("DOMContentLoaded", () => {
//     const formEl = document.querySelector("form");
//     const tbodyEl = document.querySelector("tbody");
//     const tableEl = document.querySelector("table");

//     formEl.addEventListener("submit", onSubmitForm); // Handle form submission
//     tableEl.addEventListener("click", onClickDelete); // Handle delete button clicks
//     tableEl.addEventListener("click", onClickEdit); // Handle edit button clicks

//     function onSubmitForm(e) {
//         e.preventDefault();

//         const question = document.getElementById("question").value;
//         const answer = document.getElementById("answer").value;

//         const formData = {
//             question: question,
//             answer: answer === "TRUE" ? true : false,
//         };

//         fetch('add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Upon successful addition, update frontend and refresh table
//             refreshTable();
//             formEl.reset();
//         })
//         .catch(error => {
//             console.error('Error adding quiz question:', error);
//             alert('Failed to add quiz question. Please try again.');
//         });
//     }

//     function onClickDelete(e) {
//         e.preventDefault();
//         if (e.target.classList.contains("deleteBtn")) {
//             const row = e.target.closest("tr");
//             const questionId = row.dataset.id;

//             fetch(`delete/${questionId}`, {
//                 method: 'DELETE'
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Failed to delete question ${questionId}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data.message); // Log success message if needed
//                 row.remove();
//             })
//             .catch(error => {
//                 console.error('Error deleting question:', error);
//                 alert('Failed to delete question. Please try again.');
//             });
//         }
//     }

//     function onClickEdit(e) {
//         e.preventDefault();
//         if (e.target.classList.contains("editBtn")) {
//             const row = e.target.closest("tr");
//             const questionId = row.dataset.id;
    
//             // Fetch question details from backend using questionId
//             fetch(`/quiz/${questionId}`)
//             .then(response => response.json())
//             .then(question => {
//                 // Populate form fields with question details for editing
//                 document.getElementById("question").value = question.quiz_question;
//                 document.getElementById("answer").value = question.quiz_answer ? 'TRUE' : 'FALSE';
    
//                 // Optionally, update the form action URL for submission
//                 formEl.action = `/quiz/${questionId}`;
//             })
//             .catch(error => {
//                 console.error('Error fetching question details:', error);
//                 alert('Failed to fetch question details. Please try again.');
//             });
//         }
//     }

// });
