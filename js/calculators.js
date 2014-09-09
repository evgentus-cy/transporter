/* параметры
heightUpTransporter => Высота подъема
lenghTransporter    => Длинна по трассе
xTransporter  		=> длинна по горизонтали
angleTransporter 	=> Угол подъема
*/

// расчет геометрических параметров конвейера
function calcGeometry(parametrs)
{
	console.log('calsGeometry');
	if((parametrs.heightUpTransporter!='undefined')&&(parametrs.lenghTransporter!='undefined'))
	{
		parametrs.xTransporter = Math.sqrt(Math.pow(parametrs.lenghTransporter, 2) - Math.pow(parametrs.heightUpTransporter, 2));
		parametrs.angleTransporter = Math.asin(parametrs.heightUpTransporter / parametrs.lenghTransporter);
		return parametrs;
	}

	if((parametrs.heightUpTransporter!='undefined')&&(parametrs.xTransporter!='undefined'))
	{
		parametrs.lenghTransporter = Math.sqrt(Math.pow(parametrs.heightUpTransporter, 2) + Math.pow(parametrs.xTransporter, 2));
		parametrs.angleTransporter = Math.atan(parametrs.heightUpTransporter / parametrs.xTransporter);
		return parametrs;
	}

	if((parametrs.xTransporter!='undefined')&&(parametrs.lenghTransporter!='undefined'))
	{
		parametrs.heightUpTransporter = Math.sqrt(Math.pow(parametrs.lenghTransporter, 2) - Math.pow(parametrs.xTransporter, 2));
		parametrs.angleTransporter = Math.PI - Math.PI/2 - Math.asin(parametrs.xTransporter / parametrs.lenghTransporter);
		return parametrs;
	}

	if((parametrs.heightUpTransporter!='undefined')&&(parametrs.angleTransporter!='undefined')) 
	{
		parametrs.angleTransporter = toRad(parametrs.angleTransporter);
		parametrs.lenghTransporter = parametrs.heightUpTransporter / Math.sin(parametrs.angleTransporter);
		parametrs.xTransporter = Math.sqrt(Math.pow(parametrs.lenghTransporter, 2) - Math.pow(parametrs.heightUpTransporter, 2));
		return parametrs;
	}

	if((parametrs.xTransporter!='undefined')&&(parametrs.angleTransporter!='undefined')) 
	{
		parametrs.angleTransporter = toRad(parametrs.angleTransporter);
		parametrs.heightUpTransporter = parametrs.xTransporter * Math.tan(parametrs.angleTransporter);
		parametrs.lenghTransporter = Math.sqrt(Math.pow(parametrs.heightUpTransporter, 2) + Math.pow(parametrs.xTransporter, 2));
		return parametrs;
	}

	if((parametrs.lenghTransporter!='undefined')&&(parametrs.angleTransporter!='undefined')) 
	{
		parametrs.angleTransporter = toRad(parametrs.angleTransporter);
		parametrs.heightUpTransporter = parametrs.lenghTransporter * Math.sin(parametrs.angleTransporter);
		parametrs.xTransporter = Math.sqrt(Math.pow(parametrs.lenghTransporter, 2) - Math.pow(parametrs.heightUpTransporter, 2));
		return parametrs;
	} 

}

// перевод радиан в градусы
function toGrad(rad)
{
	return (180.0*rad)/Math.PI;
}

// перевод градусов в радианы
function toRad(grad)
{
	return grad*Math.PI/180.0;
}