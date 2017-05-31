function excluirPostagem(codigo){

    if(confirm("Essa postagem será deletada permanentemente, ainda deseja deletar?")){

        $.ajax({

            url: '../controller/excluirPostagem',
            method: 'post',
            data: codigo,
            sucess: function(data){

                if(data == "excluiu"){

                    alert('Postagem excluída com sucesso');
                }
                else{

                    alert("Houve um erro interno, tente novamente mais tarde.");
                }


            }


        });

    }
    else{

    }

}



jQuery.nl2br = function(varTest){
    return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
};

jQuery.br2nl = function(varTest){
    return varTest.replace(/<br>/g, "\r");
};


$(document).ready(function () {


    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

});

