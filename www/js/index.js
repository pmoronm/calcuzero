// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}

$(document).ready(function () {
    var entryValid = "";
    var result = 0;

    function safeEval (exp) {
        var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
            valid = true;
           
        if (exp.trim().length==0) exp='0';
        // Detect valid JS identifier names and replace them
        exp = exp.replace(reg, function ($0) {
            // If the name is a direct member of Math, allow
            if (Math.hasOwnProperty($0))
                return "Math."+$0;
            // Otherwise the expression is invalid
            else
                valid = false;
        });
        if (!valid) throw 'NotSafe';
        return eval(exp);
    };

    function formatResult(res) {
        return Math.round(res*1e8)/1e8;
    };

    function updateEntry(k='') {
        var k2='';
        var entry0=$('#entry')[0].innerText;

        switch (k) {
            case 'sq':
                k2='**.5';
                break;
            case 'x2':
                k2='**2';
                break;
            case 'xy':
                k2='**';
                break;
            case 'pi':
                k2=Math.PI;
                break;
            case 'sgn':
                k2='*-1';
                break;
            case 'inv':
                entry0 = '('+entry0+')';
                k2='**(-1)';
                break;
            case 'rst':
                //clear history, no break linking later 'ac'
                $('#hco p')[0].innerText='';
            case 'ac':
                entry0='';
                k2='';
                break;
            case 'bck':
                entry0=entry0.slice(0,-1);
                k2='';
                break;
            case '%':
                k2='/100*';
                break;
            case '=':
                $('#hco p')[0].innerText=entry0+' = '+result+'\n'+$('#hco p')[0].innerText;
                entry0=result;
                k2='';
                break;
            default:
                k2=k;
        }

        var entry2 = entry0 + k2;
        var wasOk = false;
        var resultErr='';

        try {
            result = safeEval(entry2);
            entryValid = entry2;
            wasOk = true;
        } catch (err) {
        }
        if (k!='') {
            $('#entry')[0].innerText = entry2;
        }
        if (!wasOk) {
            resultErr='? ';
        }
        $('#result p').text(resultErr + formatResult(result) );
    };


    $("#entry").on('click input', function (e) {
        updateEntry();
    });

    $(".bt1,.bt2,.bt3").click(function () {
        entry = $(this).attr("value");
        updateEntry(entry);
        return;
    });


});
