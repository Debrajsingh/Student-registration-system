document.getElementById('studentForm').addEventListener('submit', addStudent);

let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable() {
  const tbody = document.querySelector('#studentTable tbody');
  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.class}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
  localStorage.setItem('students', JSON.stringify(students));
}

function addStudent(e) {
  e.preventDefault();

const name = document.getElementById('name').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const className = document.getElementById('class').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !studentId || !className || !email || !contact) return;

  if (!/^[a-zA-Z\s]+$/.test(name)) return alert("Name must contain only letters.");
  if (!/^[0-9]+$/.test(studentId)) return alert("ID must be numbers.");
  if (!/^[0-9]+$/.test(contact)) return alert("Contact must be numbers.");
  if (!/\S+@\S+\.\S+/.test(email)) return alert("Enter a valid email.");

  students.push({ name, studentId, class: className, email, contact });
  renderTable();
  document.getElementById('studentForm').reset();
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.studentId;
  document.getElementById('class').value = student.class;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  students.splice(index, 1);
  renderTable();
}

renderTable();