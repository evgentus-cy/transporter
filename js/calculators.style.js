var countParam = 0; // число выбраныъ параметров

$(document).ready(function()
{
	/* клик на меню */
	$('.list-group .list-group-item').on('click', function ()
	 {
		$('body').find('.list-group-item.active').removeClass('active');
		$(this).addClass('active');
		var idPage = $(this).attr('id') + '-page';
		console.log("load page => "+idPage);

		// смена страницы
		$('body').find('.page.active').removeClass('active');
		$('body').find('.page#'+idPage).addClass('active');
    }); // END $('.list-group .list-group-item').on('click', function ()

	/* клик на расчеты */
    $('.btn-go').on('click', function()
    {
    	// узнаем какой калькулятор вызвал
    	var page = $(this).parents('.page').attr('id');
    	var id = page.replace('-page', '');
    	console.log('call => '+id);

    	// собираем данные и отправляем на расчет
    	var transporterParametrs = {};
    	var $form = $(this).parents('form');
    	var $param = $form.find('.form-group input');
    	
    	$param.each(function()
    	{
    		var val = $(this).val();
    		var name = $(this).attr('name');
    		console.log('name => '+name);
    		console.log('val => '+val);
    		(val == '')? transporterParametrs[name] = 'undefined' : transporterParametrs[name] = val;
    	});	 
 
    	var result = calcGeometry(transporterParametrs); 	
        transporterParametrs.angleTransporter = toGrad(transporterParametrs.angleTransporter);
        console.log('result => ');
        console.log(result);
    	sessionStorage.setItem('transporterParametrs', JSON.stringify(result));

        //console.log(JSON.parse(sessionStorage.getItem('transporterParametrs')));
        getParametrs($form.find('.form-group'));
    }); // END  $('.btn-go').on('click', function()

    /* очистка формы */
    $('form input[type=reset]').each(function()
    {
        $(this).on('click', function()
        {
            clearInputReadonly($(this).parents());
        });
    });

    /* сброс памяти и формы */
    $('.btn-reset').on('click', function()
    {
        sessionStorage.clear();
        $('form input[type=reset]').click();
    });

    /* проверка на количество входных параметров */
    // вешаем событие на все input страницы
    $('.form-group').find('input[type=text]').each(function ()
    {
        // контроль на заполнение
        $(this).on('change', function()
        {
            // проверка на заполненость
            if($(this).val() != '')
            {
                // проверяем на повторность редактирования
                var str = $(this).attr('class');
                if( (str.indexOf('param-selected') + 1) == 0)
                {
                    countParam++;
                    $(this).addClass('param-selected');
                }
            }
            else
            {
                countParam--; 
                $(this).removeClass('param-selected');
            }

            // проверяем количество вводимых параметров в завистимости от калькулятора
            var page = $(this).parents('.page').attr('id');
            switch(page)
            {
                case 'geometry-page': 
                    (countParam == 2)? editInputReadonly($(this), false) : editInputReadonly($(this), true);
                break;
            }
            console.log('countParam => '+countParam);
            
        }); // end $(this).on('change', function()
    }); // END  $('.form-group').find('input').each(function ()

    // переключатель градусы/радианы
    $('.form-group').find('input[name=angle]').each(function ()
    {
        $(this).parent().on('click', function()
        {
            $(this).parent().find('input[name=angle][checked=checked]').removeAttr('checked');
                
            var $radio = $(this).find('input')
            $radio.attr('checked', 'true');
            //console.log(this.attibutes);
            switch($radio.val())
            {
            case 'rad':  
                alert('rad');
            break;
            case 'grad': alert('grad'); break;
            }
        });
    }); // END $('.form-group').find('input[name=angle]').each(function ()

    /* вывод содержимого sessionStorage */
   /* $('#getStorage').on('shown.bs.modal', function () 
    {
        var jsonStr = sessionStorage.getItem('transporterParametrs');
        if(jsonStr == 'undefined')
        {
            throw new Error('Неполные данные для расчета');
        }
        var parametrs = JSON.parse(jsonStr);
        for(var i in parametrs)
        {
            if(parametrs[i] != null)
            {
                $(this).find('modal-body').html(i+': '+parametrs[i]);
            }
            else  
            {
                throw new Error('Введены неверные данные для расчета');
            }
        }   

    }); // END  $('#getStorage').on('shown.bs.modal', function ()*/

}); // END $(document).ready(...)




//функция для блокировки/разблокировки полей input полей
// deleteAttr = true удалить атрибут readonly
// deleteAttr = falsle добавить атрибут readonly
function editInputReadonly(element, deleteAttr)
{
    var $parent = $(element).parent();
    $parent.find('input').each(function()
    {
        if($(this).val() == '')
        {
            (deleteAttr)?  $(this).removeAttr('readonly') :  $(this).attr('readonly', 'true');  
        }
    });
}

// сбросить атрибут readonly
function clearInputReadonly(form)
{
    $(form).find('input[type=text]').each(function()
    {
        $(this).removeAttr('readonly');
        $(this).removeClass('param-selected');
    });
    countParam = 0;
}

// установить на все input атрибут readonly
function setInputReadonly(form)
{
    $(form).find('input[type=text]').each(function()
    {
        $(this).attr('readonly', '');
        $(this).removeClass('param-selected');
    });
    countParam = 0;
}

// вывести все известные параметры
function getParametrs(form)
{
    var jsonStr = sessionStorage.getItem('transporterParametrs');
    if(jsonStr == 'undefined')
    {
        throw new Error('Неполные данные для расчета');
    }
    var parametrs = JSON.parse(jsonStr);
    console.log('parametrs => ');
    console.log(parametrs);

    for(var i in parametrs)
    {
        if(parametrs[i] != null)
        {
            $(form).find('input[name='+i+']').val(parametrs[i]);
        }
        else  
        {
            throw new Error('Введены неверные данные для расчета');
        }
    }
    setInputReadonly(form);
}