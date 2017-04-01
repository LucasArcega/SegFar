
$(document).ready(function () {

    $('body').keydown(function (e) {
        if(e.ctrlKey) {
           if (e.keyCode == 13) {
               console.log("Ctrl+l was pressed!!");
               window.location.replace('../login/');
           }
        }
    })


});
/**
 * Created by lucas on 03/01/2017.
 */
