(function($){
    
    $.fn.extend({
        calculationField : function(o){
            var target = this;
            if($(target)){
                if(o.readonly == undefined || o.readonly != 'true'){
                    if(!(o.variables == undefined || o.variables == null)){
                        $.each(o.variables, function(){
                            var variable = this;
                            var fieldId = variable.fieldId;
                            if (fieldId !== o.id && fieldId.trim().length > 0) {
                                if(fieldId.indexOf(".") != -1){
                                    fieldId = fieldId.substring(0, fieldId.indexOf("."));
                                }
                                var selector = "[name=" + fieldId + "]";
                                var field = $(selector);
                                if ($(field).length == 0) {
                                    selector = "[name$=_" + fieldId + "]";
                                    field = $();
                                    FormUtil.setControlField("_" + fieldId, selector);
                                } else {
                                    FormUtil.setControlField(fieldId);    
                                }

                                var change = function() {
                                    cfCalculation(target, o);
                                };

                                $('body').off("change", selector, change);
                                $('body').on("change", selector, change);
                            }
                        });
                    }
                    // run on load 
                    $(document).ready(function() {
                        cfCalculation(target, o); 
                    });
                    // handle mobile page show
                    $(document).bind("pageshow", function() {
                        cfCalculation(target, o);
                    });
                }
            }
            return target;
        }
    });
    
    function cfCalculation(target, o){
        var equation = o.equation;
        if(o.equation == ""){
            equation = "0";
        }
        $.each(o.variables, function(){
            var variable = this;
            if (variable.fieldId !== o.id) {
                var value = getValue(variable.fieldId, variable.operation, o.format, target);
                if(o.equation == ""){
                    equation += " + " + value;
                }else if(variable.variableName != ""){
                    equation = replaceVariable(equation, variable.variableName, value);
                }
            } else {
                equation = replaceVariable(equation, variable.variableName, 0);
            }
        });
        var result = eval(equation);
        var formattedResult  = formatResult(result, o);
        $(target).val(formattedResult);
        if ($(target).parent().find(".calculationField_value").length > 0) {
            $(target).parent().find(".calculationField_value").text(formattedResult);
        }
        $(target).trigger("change");
    };
    
    function getValue(fieldId, operation, format, target){
        if(format.toUpperCase() == "EURO"){
            $.Calculation.setDefaults({
                reNumbers: /(-?\s?\$?\s?)(\d+(\.\d{3})*(,\d{1,})?|,\d{1,})/g,
                cleanseNumber: function (v){
                    return v.replace(/[^0-9,\-]/g, "").replace(/,/g, ".");
                }
            });
        }else{
            $.Calculation.setDefaults({
                reNumbers: /(-?\s?\$?\s?)(\d+(,\d{3})*(\.\d{1,})?|\.\d{1,})/g,
                cleanseNumber: function (v){
                    return v.replace(/[^0-9.\-]/g, "");
                }
            });
        }
        
        if (fieldId.trim().length === 0) {
            return 0;
        }
        
        var value = 0;
        var selector = null;
        var subformGridFound = false;
        
        //find within same subform first
        if ($(target).closest(".subform-container").length > 0) {
            var parent = $(target).closest(".subform-container");
            
            if (fieldId.indexOf(".") != -1) {
                var gridId = fieldId.split(".")[0];
                var grid = FormUtil.getField(gridId, parent);
                if (grid.length > 0) {
                    subformGridFound = true;
                }
                
                selector = FormUtil.getGridCells(fieldId, parent);
            } else {
                selector = FormUtil.getField(fieldId, parent);

                //fix for IE (Grid values should not added even its have same id)
                selector = $(selector).filter(":not(.grid-cell)");
            }
        }
        
        if (selector === null || selector === undefined || $(selector).length === 0) {
            if (fieldId.indexOf(".") != -1) {
                if (!subformGridFound) {
                    selector = FormUtil.getGridCells(fieldId);
                }
            } else {
                selector = FormUtil.getField(fieldId);

                //fix for IE (Grid values should not added even its have same id)
                selector = $(selector).filter(":not(.grid-cell)");
            }
        }
        
        //if radio or checkbox, count oni checked
        var type = $(selector).attr('type');
        if (type != undefined && (type.toLowerCase() == "radio" || type.toLowerCase() == "checkbox")) {
           selector = $(selector).filter(":checked");
        }
        if(operation.toUpperCase() == "AVG"){
            value = $(selector).avg();
        }else if(operation.toUpperCase() == "MIN"){
            value = $(selector).min();
        }else if(operation.toUpperCase() == "MAX"){
            value = $(selector).max();
        }else{
            value = $(selector).sum();
        }
        
        if (!isFinite(value)) {
            value = 0;
        }
        
        return value;
    }
    
    function replaceVariable(equation, variableName, value){
        var match = new RegExp("([^'\"a-zA-Z0-9_]|^|\s)"+variableName+"([^'\"a-zA-Z0-9_]|$|\s)", "ig");
        var found = equation.match(match);
        while (found !== null && found.length > 0) {
            equation = equation.replace(match, "$1" + value + "$2");
            found = equation.match(match);
        }
        return equation;
    }
    
    function formatResult(result, o){
        var numOfDecimal = parseInt(o.numOfDecimal);
        var decimalSeperator = ".";
        var thousandSeparator = ",";
        if(o.format.toUpperCase() == "EURO"){
            decimalSeperator = ",";
            thousandSeparator = ".";
        }
        
        var number = result;
        
        var exponent = "";
        if (!isFinite(number)) {
            number = 0;
        } else {
            if (numOfDecimal !== null){
                if (number < 0) {
                    number = number - Number(0.1+'e-'+(numOfDecimal+1));
                } else {
                    number = number + Number(0.1+'e-'+(numOfDecimal+1));
                }
                number = Number(Math.round(number+'e'+numOfDecimal)+'e-'+numOfDecimal);
            } else {
                number = number.toFixed(0);
            }
            
            var numberstr = number.toString();
            var eindex = numberstr.indexOf("e");
            if (eindex > -1){
                exponent = numberstr.substring(eindex);
                number = parseFloat(numberstr.substring(0, eindex));
            }
        }
        
        var sign = number < 0 ? "-" : "";
        
        var integer = (number > 0 ? Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
        var fractional = number.toString ().substring (integer.length + sign.length);
        fractional = numOfDecimal != null && numOfDecimal > 0 || fractional.length > 1 ? (decimalSeperator + fractional.substring (1)) : "";
        if(numOfDecimal != null && numOfDecimal > 0){
            for (i = fractional.length - 1, z = numOfDecimal; i < z; ++i){
                fractional += "0";
            }
        }
        
        if(o.useThousandSeparator.toUpperCase() == "TRUE"){
            for (i = integer.length - 3; i > 0; i -= 3){
                integer = integer.substring (0 , i) + thousandSeparator + integer.substring (i);
            }
        }
        
        var resultString = "";
        if(sign != ""){
            resultString += sign;
        }
        if(o.prefix != ""){
            resultString += o.prefix + ' ';
        }
        resultString += integer + fractional;
        if(exponent != ""){
            resultString += ' ' + exponent;
        }
        if(o.postfix != ""){
            resultString += ' ' + o.postfix;
        }
        
        return  resultString;
    }
})(jQuery);