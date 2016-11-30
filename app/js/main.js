function setEqualHeight(columns){
    var tallestcolumn = 0;
    columns.each(function(){
        currentHeight = $(this).height();
        if(currentHeight > tallestcolumn){
            tallestcolumn = currentHeight;
        }
    });
    columns.height(tallestcolumn);
}

$(document).ready(function() {

    /*-------------------------------- Выравнивание блоков по высоте ---------------------------------*/
    setEqualHeight($(".benefit"));
    setEqualHeight($(".desk"));

    /*-------------------------------- Плавная анимация по меню ---------------------------------*/

    $(".bounce, .super-stick").on("click", "a", function(event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({
            scrollTop: top
        }, 800);
    });

    /*------------------------------- Owl.Carousel -----------------------------*/

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: false,
        responsive: {
            400: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    /*------------------------------- Button to TOP -----------------------------*/

    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });
        $('#toTop').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });
    });

    /*------------------------------- Маска для поля номера телефона -----------------------------*/

    jQuery(function($) {
        $(".phone-number").mask("8 (999) 999-99-99");
    });

    /*------------------------------- Отправка почты -----------------------------*/

    $("#ajaxform").submit(function(){ // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = false; // предварительно ошибок нет
        form.find('input').each( function(){ // пробежим по каждому полю в форме
            if ($('#number').val() == '') { // если находим пустое (было так ---if ($(this).val() == '') {---)
                sweetAlert("Ой...", "Необходимо указать номер телефона!", "error"); // говорим заполняй!
                error = true; // ошибка
            }
        });
        if (!error) { // если ошибки нет
            var data = form.serialize(); // подготавливаем данные
            $('#myModal').modal('toggle'); // закрываем модаль
            $.ajax({ // инициализируем ajax запрос
                type: 'POST', // отправляем в POST формате, можно GET
                url: 'mailto.php', // путь до обработчика, у нас он лежит в той же папке
                dataType: 'json', // ответ ждем в json формате
                data: data, // данные для отправки
                beforeSend: function(data) { // событие до отправки
                    form.find('.send').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                },
                complete: function(data) { // событие после любого исхода
                    swal("Отлично!", "Менеджер-консультант свяжется с Вами в ближайшее время.", "success");
                    //                    alert('Зпасибо за доверие! Менеджер-консультант свяжется с Вами в ближайшее время.'); // пишем что все ок
                }

            });
        }
        return false; // вырубаем стандартную отправку формы
    });

});

/*-------------------------------- Скрипт перехода по пунктам меню ---------------------------------*/

jQuery(function($){
    $(document).ready(function() {
        $('.wrapper-menu, .super-stick').stickUp({
            parts: {
                0: 'home',
                1: 'about-us',
                2: 'benefits',
                3: 'prices',
                4: 'testimonials',
                5: 'pre-footer'
            },
            itemClass: 'menuItem',
            itemHover: 'active'
        });
    });
});

jQuery(function($){
    $(document).ready(function() {
        $('.super-stick').stickUp();
    });
});