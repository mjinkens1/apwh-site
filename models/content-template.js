const crypto = require('crypto');

exports.newContent = function(type) {
  var id = crypto.randomBytes(256).toString('hex');
  var template = {
    "announcement": `<div class="container-fluid info-box mb-2 p-1 px-2" id="${id}"><a href="" class="admin-delete fas fa-times-circle m-0" title="Delete item"></a><div class="container-fluid p-0 m-0 editor-hidden"></div></div>`,
    "cal-announcement": `<div class="container-fluid info-box mb-2 p-1 px-2" id="${id}"><a href="" class="admin-delete fas fa-times-circle m-0" title="Delete item"></a><div class="container-fluid p-0 m-0 editor-hidden"></div></div>`,
    "file": `<div class="container text-center file p-0 py-1 mx-2" id="${id}"><a href="" class="admin-delete fas fa-times-circle m-0" title="Delete item"></a><i href="#" class="fas fa-file-alt"></i><p></p></a></div>`,
    "calendar-assignment": `<div class="container-fluid cal-item cal-assignment">Assignment(s)</div>`,
    "calendar-event": `<div class="container-fluid cal-item cal-event">Event(s)</div>`,
    "calendar-misc": `<div class="container-fluid cal-item cal-misc">Misc.</div>`,
  };

  var content = {
    "html": template[type],
    "id": id
  };
  return content;
};
