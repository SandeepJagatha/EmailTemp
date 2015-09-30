
CKEDITOR.config.height = 100;

$(document).ready(function(){

    CKEDITOR.replace( 'notificationmessage');

    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
  });

    $('select[id$=-status][id^=id_item-]').change(function() {
        $(this).attr('style', $(this).find('option:selected').attr('style'));
    }).change();

    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });

        id = "notificationmessage"; // Or whatever
        var entry = o[id];
        o[id] = CKEDITOR.instances.notificationmessage.getData();

        return o;
    };

    $('#emailform').submit(function(e) {
        var formdata =  JSON.stringify($(this).serializeObject(), null, 2);
         $("#example").popover({
            placement: 'right',
            html: 'true',
            title : '<span class="text-info"><strong>Json Data</strong></span>'+
                    '<button type="button" id="close" class="close" onclick="$(&quot;#example&quot;).popover(&quot;hide&quot;);">&times;</button>',
            content : '<textarea rows="10" cols="50">\n'+formdata+'</textarea>'
         });

         $("#example").click();
         e.preventDefault();
         return false;
    });

    $('#input0').on('input', function() {
        $("#input0").closest('.block-content').find('.andorcondition').removeClass('hidediv');
    });

    $(".reset").click(function() {
        $(this).closest('form').find("input[type=text], textarea, input[type=checkbox]").val("");

        $('#select-to').selectize()[0].selectize.clear();
        $('#select-cc').selectize()[0].selectize.clear();
        $('#select-bcc').selectize()[0].selectize.clear();
        $('#select-from').selectize()[0].selectize.clear();

        $('input:checkbox').removeAttr('checked');
        CKEDITOR.instances.notificationmessage.setData('');
    });
    
});

window.onload = function(event){ 
    loaddatetime();
    $(".dropdown-set li a").click(function(){
      var selText = $(this).text();
      console.log(selText);
      console.log($(this).attr('href'));
      $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
    });
};

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function setselection(setid){
      var selText = $(this).text();
      $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
}

function loaddatetime(){
    $(function () {
        $('.timePicker').datetimepicker({
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0,
            showMeridian: 1,
            format: 'HH:ii P'
        });
    });
        
    $(function () {
        $('.datePicker').datetimepicker({
            setDate: new Date(),
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
            
        });
    });
}


function reset(){
    $(this).closest('form').find("input[type=text], textarea, select").val("");
    $(this).CKEDITOR.instances.notificationmessage.setData('');
}


$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        if(numFiles==1){
            $('#filecount').val(label);
        }else{
          $('#filecount').val(numFiles+" files selected");
        }
        
        console.log(numFiles);
        console.log(label);
    });
    $(document).on('change', '.btn-file :file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
          input.trigger('fileselect', [numFiles, label]);
      });


    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                      '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

    $('#select-to, #select-cc, #select-bcc').selectize({
        persist: false,
        maxItems: null,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: [
            {email: 'brian@thirdroute.com', name: ' Brian, Reavis'},
            {email: 'nikola@tesla.com', name: ' Nikola, Tesla'},
            {email: 'beale@kristina.com', name: ' Beale, Kristina'},
            {email: 'statham@jason.com', name: ' Statham, Jason'},
            {email: 'bran@thirdroute.com', name: ' Bran, Reavis'},
            {email: 'nikoa@tesla.com', name: ' Nikoa, Tesla'},
            {email: 'brian@thirdrout.com', name: ' Brian, Reavi'},
            {email: 'nikola@tesl.com', name: ' Nikola, Tesl'},
            {email: 'brian@thrdroute.com', name: ' Brian, Ravis'},
            {email: 'someone@gmail.com'}
        ],
        render: {
            item: function(item, escape) {
                return '<div>' +
                    (item.name ? '<span><img style="width: 16px;height: 16px;border-radius: 50%;" src="assets/images/cdukes.jpg" class="img-flag" /> </span><span class="name">' + escape(item.name) + '&nbsp;</span>' : '') +
                '</div>';
            },
            option: function(item, escape) {
                var label = item.name || item.email;
                var caption = item.name ? item.email : null;
                return '<div>' +
                    '<span><img style="width: 24px;height: 24px;border-radius: 50%;" src="assets/images/cdukes.jpg" class="img-flag" /> </span><span class="label">' + escape(label) + '</span>' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                '</div>';
            }
        },
        createFilter: function(input) {
            var match, regex;

            // email@address.com
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);

            // name <email@address.com>
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);

            return false;
        },
        create: function(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {email: input};
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email : match[2],
                    name  : $.trim(match[1])
                };
            }
            alert('Invalid email address.');
            return false;
        }
    });



     $('#select-from').selectize({
        persist: false,
        maxItems: 1,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: [
            {email: 'brian@thirdroute.com', name: ' Brian Reavis'},
            {email: 'nikola@tesla.com', name: ' Nikola Tesla'},
            {email: 'beale@kristina.com', name: ' Beale Kristina'},
            {email: 'statham@jason.com', name: ' Statham Jason'},
            {email: 'bran@thirdroute.com', name: ' Bran Reavis'},
            {email: 'nikoa@tesla.com', name: ' Nikoa Tesla'},
            {email: 'brian@thirdrout.com', name: ' Brian Reavi'},
            {email: 'nikola@tesl.com', name: ' Nikola Tesl'},
            {email: 'brian@thrdroute.com', name: ' Brian Ravis'},
            {email: 'someone@gmail.com'}
        ],
        render: {
            item: function(item, escape) {
                return '<div>' +
                    (item.name ? '<span><img style="width: 16px;height: 16px;border-radius: 50%;" src="assets/images/cdukes.jpg" class="img-flag" /> </span><span class="name">' + escape(item.name) + '&nbsp;</span>' : '') +
                    (item.email ? '<span class="email">&lt' + escape(item.email) + '&gt</span>' : '') +
                '</div>';
            },
            option: function(item, escape) {
                var label = item.name || item.email;
                var caption = item.name ? item.email : null;
                return '<div>' +
                    '<span><img style="width: 24px;height: 24px;border-radius: 50%;" src="assets/images/cdukes.jpg" class="img-flag" /> </span><span class="label">' + escape(label) + '</span>' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                '</div>';
            }
        },
        createFilter: function(input) {
            var match, regex;

            // email@address.com
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);

            // name <email@address.com>
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);

            return false;
        },
        create: function(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {email: input};
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email : match[2],
                    name  : $.trim(match[1])
                };
            }
            alert('Invalid email address.');
            return false;
        }
    });

});
