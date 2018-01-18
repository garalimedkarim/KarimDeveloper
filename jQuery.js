$(document).ready(function(){
   // $(".ooo > div :first").parent().css("background-color", "yellow");
    //$(".ooo").children("div:nth-child(1)").css("background-color", "yellow");
    
    $('.ooo').find('div').each(function () {
        //alert(this); // "this" is the current element in the loop
        $(this).css("color","red");
    });    
});