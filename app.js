import users from "./main.js";
const tbodyEl = document.querySelector('#userList');
const formEl = document.getElementById('c-user');
const formEll = document.getElementById('c-userr');
const Modal = document.querySelector('#modal');
const I = document.querySelector('i');
let editingUserId = null;
function updateUi(users) {
    tbodyEl.innerHTML = ''; 
    users.forEach((user) => {
        tbodyEl.innerHTML +=   `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><span class="status-badge">${user.status}</span></td>
        <td class="actions">
        <button onclick="handleUpdate(${user.id})" class="btn-edit">Tahrilash</button>
        <button onclick="handleDelete(${user.id})" class="btn-delete">
        O'chirish
        </button>
  </td>
</tr>
        `
    });
};
updateUi(users);

formEl.addEventListener('submit', function (e) {
    console.log(1);
    e.preventDefault();
    const formData = new FormData(formEl);
    let user = {
        id: users.length ? users.at(-1).id+ 1:1,
        name: formData.get('name'),
        email: formData.get('email'),
        status: formData.get('status') === 'on' ? 'active' : 'inactive',
    }
    users.push(user);
    updateUi(users);
});
window.handleDelete = (id) => {
    tbodyEl.innerHTML = ''
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    updateUi(users);
}
window.handleUpdate = (id) => {
    Modal.classList.remove('hidden');
    editingUserId = id;
    const user = users.find(u => u.id === id);
    if (user) {
        formEll.elements['name'].value = user.name;
        formEll.elements['email'].value = user.email;
    }
};
formEll.addEventListener('submit', function (e) {
    e.preventDefault();
    if (editingUserId !== null) {
        const index = users.findIndex(u => u.id === editingUserId);
        const formData = new FormData(formEll);
        users[index] = {
            id: editingUserId,
            name: formData.get('name'),
            email: formData.get('email'),
            status: formData.get('status') === 'on' ? 'active' : 'inactive',
        };
        updateUi(users);
        Modal.classList.add('hidden');
        formEll.reset();
        editingUserId = null;
    }
});
I.addEventListener('click', () => {
    Modal.classList.add('hidden');
})
