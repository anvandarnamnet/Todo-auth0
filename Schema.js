var timeEdit = require("timeedit-api");
var obje = new timeEdit("https://se.timeedit.net/web/kth/db1/public01/ri1Q2.html");
obje.getCourse('DD1338').then(course => {
  console.log(course);
});

//obje.getCourseId('dd1337')
//.then(courseCode => {
  //return obje.getCourse(courseCode);
//})
//.then(course => {
  //console.log(course);
//});
