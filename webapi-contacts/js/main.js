var addressBook = {
  isAvailable: (navigator.mozContacts !== undefined),

  getAll: function (options) {
    var loading = options.loading;
    var list = options.list;

    loading.style.display = 'block';

    var allContacts = navigator.mozContacts.getAll({});
    var _this = this;
    allContacts.onsuccess = function (evt) {
      var cursor = evt.target;
      var contact = cursor.result;
      if (contact !== undefined) {
        _this._onContactRead(contact, list);
        cursor.continue(); // read next contact
      }
      else { // no more contacts
        loading.style.display = 'none';
      }
    };

    allContacts.onerror = function () {
      alert('Contacts could not be read :(');
    };
  },

  _onContactRead: function (contact, list) {
    var li = document.createElement('li');
    var phone = contact.tel.length > 0 ? contact.tel[0].value : null;
    var liHtml = '<a href="#"><p>' + contact.name + '</p>';
    if (phone !== null) { liHtml += '<p>' + phone + '</p>'; }
    liHtml += '</a>';
    li.innerHTML = liHtml;
    list.appendChild(li);
  }
};

var container = document.getElementById('main');

if (addressBook.isAvailable) {
  addressBook.getAll({
    loading: document.getElementById('loading'),
    list: document.getElementById('contacts')
  });
}
else {
  container.innerHTML = '<p>Contacts API is not available.</p>';
}
