$.validator.addMethod("requiretrue", function (value, element, param) {
    return element.checked;
});
$.validator.unobtrusive.adapters.addBool("requiretrue");

$.validator.unobtrusive.adapters.add('surveyquestion', [],
    function (options) {
        options.rules['surveyquestion'] = options.params;
        if (options.message) {
            options.messages['surveyquestion'] = options.message;
        }
    }
);

$.validator.addMethod('surveyquestion', function (value, element, params) {
    if (/SelectedAnswers/.test(element.name)) {
        // multiselect question type
        var $selectedBoxes = $('input[name="' + element.name + '"]:checked');
        if ($selectedBoxes.length == 0) {
            return false;
        } else if ($selectedBoxes.last().val() == "Other" && !$('input[name="' + element.name.replace("SelectedAnswers", "Response") + '"][type=text]').val()) {
            return false;
        }
    } else {
        var requiredFieldValue = $('input[name="' + element.name.replace("Response", "Required") + '"]').val();
        if (requiredFieldValue == "True") {
            if (element.type == "select-one" && (value.toLowerCase() == "select" || value.toLowerCase() == "choose" || value.toLowerCase() == "")) {
                return false;
            }
            if (element.type == "radio") {
                var $selectedRadios = $('input[name="' + element.name + '"]:checked');
                if ($selectedRadios.length == 0) {
                    return false;
                } else if ($selectedRadios.first().val() == "Other" && !$('input[name="' + element.name + '"][type=text]').val()) {
                    return false;
                }
            }
            if (value == "") {
                return false;
            }
        }
    }
    return true;
}, '');

$.validator.unobtrusive.adapters.add('mandatory', [],
    function (options) {
        options.rules['mandatory'] = options.params;
        if (options.message) {
            options.messages['mandatory'] = options.message;
        }
    }
);

$.validator.addMethod('mandatory', function (value, element, params) {
    if (element.type == "checkbox" && !element.checked) {
        return false;
    }
    if (element.type == "radio" && $('input[name="' + element.name + '"]:checked').length == 0) {
        return false;
    }
    return true;
}, '');

$.validator.unobtrusive.adapters.add("requiredif", ["other", "comp", "value"],
	function (options) {
	    options.rules['requiredif'] = {
	        other: options.params.other,
	        comp: options.params.comp,
	        value: options.params.value
	    };
	    options.messages['requiredif'] = options.message;
	}
);

$.validator.addMethod("requiredif", function (value, element, params) {
    if ($(element).val() != '') return true
    
    var parsed = element.name.split(".");
    parsed[parsed.length - 1] = params.other;
    var otherName = parsed.join(".");
    var $other = $('[name="' + otherName + '"]');

    if (!$other.length || otherName == element.name) {
        return false;
    }

    var otherVal = ($other.prop('type').toUpperCase() == "CHECKBOX") ?
                   ($other.prop("checked") ? "true" : "false") : $other.val().toLowerCase();

    switch (params.comp) {
        case 'isequalto':
            return otherVal != params.value;
        case 'isnotequalto':
            return otherVal == params.value;
        case 'regexp':
            return !otherVal.match(RegExp(params.value));
    }

    return false;
});

$.validator.unobtrusive.adapters.add('cardholder', [],
    function (options) {
        options.rules['cardholder'] = options.params;
        if (options.message) {
            options.messages['cardholder'] = options.message;
        }
    }
);

$.validator.addMethod('cardholder', function (value, element, params) {
    //name must not contain 4 consecutive numbers
    if (/\d{5}/.test(value)) {
        return false;
    }
    // Name must not contain last four of cc number
    var cardNumber = $('input[name="' + element.name.replace("CardholderName", "Number").replace("ccName", "ccNumber") + '"]').val();
    if (cardNumber && cardNumber.length > 4 && value.search(cardNumber.substr(-4)) > -1) {
        return false;
    }
    // Name must not contain security code
    var securityCode = $('input[name="' + element.name.replace("CardholderName", "SecurityCode").replace("ccName", "ccCode") + '"]').val();
    if (securityCode && securityCode.length && value.search(securityCode) > -1) {
        return false;
    }
    return true;
}, '');

$.validator.unobtrusive.adapters.add('dangerous', [],
    function (options) {
        options.rules['dangerous'] = options.params;
        if (options.message) {
            options.messages['dangerous'] = options.message;
        }
    }
);

$.validator.addMethod('dangerous', function (value, element, params) {
    if (/(<(\w|!|\/|\?)|&#)/.test(value)) {
        return false;
    }
    return true;
}, '');

$.validator.unobtrusive.adapters.add('expiration', [],
    function (options) {
        options.rules['expiration'] = options.params;
        if (options.message) {
            options.messages['expiration'] = options.message;
        }
    }
);

$.validator.addMethod('expiration', function (value, element, params) {
    var expirationMoment = moment([$('select[name="' + element.name + '"].hotel-year').val(), $('select[name="' + element.name + '"]#monthSelect').val() - 1]).endOf("month");
    return expirationMoment.isAfter();
}, '');

$.validator.unobtrusive.adapters.add('earlyexpiry', [],
    function (options) {
    	options.rules['earlyexpiry'] = options.params;
    	if (options.message) {
    		options.messages['earlyexpiry'] = options.message;
    	}
    }
);

$.validator.addMethod('earlyexpiry', function (value, element, params) {
	var expirationMoment = moment([$('select[name="' + element.name + '"].hotel-year').val(), $('select[name="' + element.name + '"]#monthSelect').val() - 1]).endOf("month");
	var checkoutMoment = moment($('#checkoutText').val());
	if (expirationMoment == undefined || checkoutMoment == undefined) return true;
	return (expirationMoment.isAfter(checkoutMoment));
}, '');

$.validator.unobtrusive.adapters.add('msemail', [],
    function (options) {
        options.rules['msemail'] = options.params;
        if (options.message) {
            options.messages['msemail'] = options.message;
        }
    }
);

$.validator.addMethod('msemail', function (value, element, params) {
    if (value.toLowerCase().indexOf("@microsoft.com") >= 0) {
        return true;
    }
    return false;
}, '');

$.validator.unobtrusive.adapters.add('minimumnights', ["nights"],
    function (options) {
        options.rules['minimumnights'] = {
            nights: options.params.nights
        }
        if (options.message) {
            options.messages['minimumnights'] = options.message;
        }
    }
);

$.validator.addMethod('minimumnights', function (value, element, params) {
    var CheckInDate = moment($('input[name="CheckInDate"]').val(), 'MM/DD/YYYY');
    var CheckOutDate = moment($('input[name="CheckOutDate"]').val(), 'MM/DD/YYYY');
    if (CheckInDate != undefined && CheckOutDate != undefined && CheckInDate.isValid() && CheckOutDate.isValid()) {
        var nights = $('input[name="' + params.nights + '"]').val()

        if (CheckOutDate.diff(CheckInDate, 'days') >= nights) {
            return true;
        }
    }

    return false;
}, '');
