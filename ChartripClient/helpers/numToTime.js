export function convertNumToTime(number) {
	// Check sign of given number
	var sign = number >= 0 ? 1 : -1;

	// Set positive value of number of sign negative
	number = number * sign;

	// Separate the int from the decimal part
	var hour = Math.floor(number);
	var decpart = number - hour;

	var min = 1 / 60;
	// Round to nearest minute
	decpart = min * Math.round(decpart / min);

	var minute = Math.floor(decpart * 60) + '';

	// Add padding if need
	if (minute.length < 2) {
		minute = '0' + minute;
	}

	// Add Sign in final result
	sign = sign == 1 ? '' : '-';

	// Concate hours and minutes
	const time = sign + hour + ':' + minute;

	return time;
}
