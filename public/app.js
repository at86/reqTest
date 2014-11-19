var DJ = {};
DJ.token = '027d3ce35504404f9191cf6a62463ebb';
DJ.corpId = '864101149000387';
$('#js_token').val(DJ.token);

//调用相关web 服务的接口时，先登录web 服务。直接设置在此处设置 cookie 不行。
//$.cookie('token', DJ.token);
//$.cookie('corpId', DJ.corpId);


//请求列表
$("#reqs").html($("#server_tmpl").tmpl({servers: servers}));

$('li').click(function () {
    $("#req_form").html('');

    var server = $(this).attr('server');
    var req = $(this).attr('req');
    var req_url = servers[server].url + req;
    var form_data = servers[server]['reqs'][req];
    $('#form_desc').text(req_url + ' : ' + form_data.type);

    var $form = $('#req_form');
    $form.attr('method', form_data.type);
    $form.attr('action', req_url);

    var params = form_data.params;

    if ($.type(params) == 'array') {
        params = params[$(this).attr('param')]['param'];
    }
    function deepCopy(source, keyword) {
        if (!keyword) {
            keyword = '';
        }
        var str = '';
        for (var key in source) {
            if ($.type(source[key]) == 'object' || $.type(source[key]) == 'array') {
                var tmpKey;
                if (keyword) {
                    tmpKey = keyword + '|' + key;
                } else {
                    tmpKey = key;
                }
                str += deepCopy(source[key], tmpKey);
            } else {
                var key2 = key;
                if (keyword) {
                    var kArr = keyword.split('|');
                    for (var i = 0; i < kArr.length; i++) {
                        if (i == 0) {
                            key2 = kArr[i] + '[';
                        } else {
                            key2 += kArr[i] + '][';
                        }
                    }
                    key2 += key + ']';
                }
                str += '<p class="form_row"><label>' + key2 + ': </label><input type="text" name="' + key2 + '" value="' + source[key] + '" /></p>';
            }
        }
        return str;
    };

    //$("#req_form").html(deepCopy(params)).append('<button>提交</button>');
    $("#req_form").html(deepCopy(params)).prepend('<p class="button"><button>提交</button></p>');

    var token = String($.trim($('#js_token').val()));
    if (token.length == 32) {
        $("#req_form input[name='token']").val(token);
    }
});

(function () {
    var sers = $('#reqs p.server');
    var j = 0;
    for (var i in servers) {
        cannotReq(servers[i].url, j, function (j) {
            console.log(j)
            sers.eq(j).parent().addClass('server_off');
        });
        j++;
    }
})();


