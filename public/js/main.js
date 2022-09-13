$(document).ready(function() {

    //datatable
    $('#user_table').DataTable();

    //Select2

    if ($(".select2").length > 0) {
        $(".select2").select2({
            language: "es",
        });
    }

    //CKEditor

    if ($("textarea").length > 0) {
        CKEDITOR.replaceAll(function(textarea, config) {
            if (textarea.className == "advanced") {
                config.removeButtons = 'About';
                config.uploadUrl = '';
                return true;
            } else if (textarea.className == "basic") {
                config.height = '7em';
                config.toolbar = [
                    ['Format', 'Bold', 'Italic', 'Underline', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                ];
                config.uploadUrl = '';
                return true;
            }
        });
    }

    //JQuery Validation

    $(".admin-form").validate({

        onkeyup: false,
        onfocusout: false,
        ignore: [],

        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 21,
            },
            lastname: {
                required: true,
                minlength: 2,
                maxlength: 21,
            },
            email: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50,
            },
            password: {
                required: true
            },

        },

        messages: {
            name: {
                required: "El nombre es obligatorio",
                minlength: 'El mínimo de caracteres permitidos para el nombre son 2',
                maxlength: 'El máximo de caracteres permitidos para el nombre son 21',
            },
            lastname: {
                required: "El apellido es obligatorio",
                minlength: 'El mínimo de caracteres permitidos para el nombre son 2',
                maxlength: 'El máximo de caracteres permitidos para el nombre son 21',
            },
            email: {
                required: "El email es obligatorio",
                email: "Añada un email válido",
                minlength: 'El mínimo de caracteres permitidos para el nombre son 5',
                maxlength: 'El máximo de caracteres permitidos para el nombre son 40',
            },
            password: {
                required: "La contraseña es obligatoria"
            }

        }
    });
});

/*Form*/

$(document).on("click", ".submit", function(event) {
   
   //esoder la tabla de la base de datos
    $(".hidden-table").hide();

    event.preventDefault();

    var formData = new FormData($(".admin-form")[0]);

    $("textarea").each(function() {
        formData.append($(this).attr('name'), CKEDITOR.instances[$(this).attr('id')].getData());
    });

    var form = '#' + $('.admin-form').attr('id'); //coge la clase del form y despues la id 
    var url = $(form).prop('action'); //coge el action del form 
    
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    };

    $.ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        
        success: function(response) {

            console.log(response);

            if (response._validation) {
                location.reload();
            } else {

                $(".errors-container").removeClass("hidden");

                $.each(response._errors, function(i, item) {
                    if (item.message) {
                        $(".errors").append("<li>" + item.message + "</li>");
                    }else{
                        location.reload();


                    }
                });
            }
            // if (!response.message.titulo==""){
            //     $("#titulo").val(response.message.titulo); 
            //     CKEDITOR.instances['textarea'].setData(response.message.textarea)
            //     $('#category').val(response.message.category).trigger('change'); 
            // }

        },

        error: function(response) {
           // console.log(response);
        }
        
    });

    return false;

});

$(document).on("click", ".erase", function(event) {
    event.preventDefault();
    var id = $(this).attr('id');
    var func = $(this).attr('func');
    $.ajax({
        type: 'POST',
        url: ("/formregistro/app/controllers/DeleteController.php"),
        data: 'id=' + id + "&func=" + func,
        success: function(data) {
         location.reload();

        }

    });
    //recarga la página para que se vea lo que se ha borrado

});

$(document).on("click", ".edit", function(event) {
    var id = $(this).attr("id");
    $("#name").val($("#list_name_"+id)[0].innerHTML);
    $("#lastname").val($("#list_lastname_"+id)[0].innerHTML);
    $("#email").val($("#list_email_"+id)[0].innerHTML);
    $("#user_id").val(id);

    $(".edit-table").show();
    $(".hidden-table").hide();

});
$(document).on("click", ".editblog", function(event) {
    var id = $(this).attr("id");

    
    $("#title").val($("#list_title_"+id)[0].innerHTML);
    $("#skills").val($("#list_skills_"+id)[0].innerHTML);
    $("#comentary").val($("#list_comentary_"+id)[0].innerHTML);
    $("#blog_id").val(id);
    $(".edit-table").show();
    $(".hidden-table").hide();

});
$(document).on("click", ".editslider", function(event) {
    var id = $(this).attr("id");

    
    $("#title").val($("#list_title_"+id)[0].innerHTML);
    $("#img").val($("#list_img_"+id)[0].innerHTML);
    $("#link_").val($("#list_link_"+id)[0].innerHTML);
    $("#comentary").val($("#list_comentary_"+id)[0].innerHTML);    
    $("#slider_id").val(id);
    $(".edit-table").show();
    $(".hidden-table").hide();

});

