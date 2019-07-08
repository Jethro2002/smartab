$(function(){

    if($.cookie("history_num") ==null){
        $.cookie("history_num", "0");
        $.cookie("history_0", "");
        $.cookie("history_1", "");
        $.cookie("history_2", "");
        $.cookie("history_3", "");
        $.cookie("history_4", "");
    }else{

    }
        
    /*百度API*/
    $("#search_this input").bind('input propertychange', function(){
        if($(this).val()!=''){  //当输入框的值不为空的时候才能发送请求
            $.ajax({
                type:"get",
                url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                async:true,
                data:{wd:$(this).val()},
                dataType : 'jsonp',       //已经跨域了
                jsonp:'cb',               //百度的回调函数
                success:function(res){
                    $("#search_list").fadeIn(100);
                    for(var search_list=0;search_list<5;search_list++){
                        $("#search_list_"+search_list).text(res.s[search_list]);
                        $("#search_list_"+search_list).attr("onclick","blank(\'https://www.baidu.com/s?ie=UTF-8&wd="+$("#search_list_"+search_list).text()+"\')");
                    }
                    
                },
                error:function(res){
                    console.log(res)  
                }
            })
        }else{
            $("#search_list").fadeOut(200);
        }
    })


    $("#search_this input").blur(function(){
        if($(this).val()==''){
            for (var history=0;history<5;history++){
                if($.cookie("history_"+history).search(/(https:\/\/www.baidu.com\/s\?ie=UTF-8&wd=)/)!=-1){
                    $("#search_list_"+history).text($.cookie("history_"+history).substring(36));
        
                }else{
                    $("#search_list_"+history).text($.cookie("history_"+history));
                }
                $("#search_list_"+history).attr("onclick","blank('"+$.cookie("history_"+history)+"')");
            }
            $("#search_list button").each(function(){
                if($(this).text()==""){
                    $(this).text("No-Content");
                }
            })
        }
        
        $("#search_list").fadeOut(200);
    });


    
    if(localStorage.getItem("number")==null){
        localStorage.setItem("number", "0");
    }else{
    }

    window.onload=function(){
        
    $("#search_list button").each(function(){
        if($(this).text()==""){
            $(this).text("No-Content");
        }
    })
    }

    $("#search_this input").focus();
    $("#search_this input").keydown(function(e){
        if(e.keyCode==13){
            if($(this).val()==""){
                return false;
            }else{
                search();
            }
        }
    })
    var number = parseInt(localStorage.getItem("number"));
    /*alert(number);*/
    for (var i=0;i<number;i++)
    {
        number_now = i+1;
        var get_name = localStorage.getItem(number_now);
        var get_kind = localStorage.getItem(number_now+"_kind");
        var get_link = localStorage.getItem(number_now+"_link");
        var get_color = localStorage.getItem(number_now+"_color");
        var get_content = localStorage.getItem(number_now+"_content");
        var color_class="";
        if(get_color=="gray"){
            color_class="tab_gary";
        }else if(get_color=="red"){
            color_class="tab_red";
        }else if(get_color=="blue"){
            color_class="tab_blue";
        }else{
            color_class="tab_gary";
        }
        if(get_kind == "note"){
            $("#tab").append("<li><a href='javascript:();' type='button' data-toggle='modal' data-target='#note_modal' onclick=\"open_note(\'"+number_now+"\')\" class='"+color_class+"'>"+get_name+"</a><a id='delete' href='javascript:;' type='button' data-toggle='modal' data-target='#myModal' onclick='to_delete("+number_now+") '></a><a id='edit' href='javascript:;' onclick='to_edit("+number_now+")'></a></li> ");
        }else if(get_kind == "copy"){
            $("#tab").append("<li><a id='copy_"+number_now+"' href='javascript:();' data-clipboard-text='"+get_content+"' onclick=\"copy_content(\'"+number_now+"\')\" class='"+color_class+"'>"+get_name+"</a><a id='delete' href='javascript:;' type='button' data-toggle='modal' data-target='#myModal' onclick='to_delete("+number_now+") '></a><a id='edit' href='javascript:;' onclick='to_edit("+number_now+")'></a></li> ");
        }else{
            var host = get_link.match(/^(\w+:\/\/)?([^\/]+)/g);
            $("#tab").append("<li><a href='"+get_link+"' class='"+color_class+"'><img src='"+host+"/favicon.ico' style='width:20px;height:20px;border-radius: 64px;margin-right: 5px;margin-top: -2px;display:inline-block;' onerror='javascript:this.src=\"default.png\"' />"+get_name+"</a><a id='delete' href='javascript:;' type='button' data-toggle='modal' data-target='#myModal' onclick='to_delete("+number_now+") '></a><a id='edit' href='javascript:;' onclick='to_edit("+number_now+")'></a></li> ");
        }
    }

    for (var history=0;history<5;history++){
        if($.cookie("history_"+history).search(/(https:\/\/www.baidu.com\/s\?ie=UTF-8&wd=)/)!=-1){
            $("#search_list_"+history).text($.cookie("history_"+history).substring(36));

        }else{
            $("#search_list_"+history).text($.cookie("history_"+history));
        }
        $("#search_list_"+history).attr("onclick","blank('"+$.cookie("history_"+history)+"')");
    }


    $("#set").click(function(){
        var r=confirm("确认要初始化并清空所有收藏？");
        if(r==true){
            localStorage.clear();
            alert("数据已初始化清空！");
            localStorage.setItem("number", "0");
            location.reload();
        }else{
        }
    })

    $("#search_this input").blur(function(){
        $("#search_list").fadeOut(200);
    })

    $("#search_this input").click(function(){
        $("#search_list").fadeIn(100);
    })
})

function add(kind){
    if($("#name").val()==""||$("#link,#none,#copy").val()==""){
        alert("所有内容不能为空！")
    }else{
        if(kind=="web"){
            var number_next = parseInt(localStorage.getItem("number"))+1;
            var name = $("#name").val();
            var link =  $("#link").val();
            localStorage.setItem("number", number_next);
            localStorage.setItem(number_next, name);
            localStorage.setItem(number_next+"_kind", "web");
            localStorage.setItem(number_next+"_link", link);
            alert("添加成功，标签ID为"+number_next);
            location.reload();
        }else if(kind=="note"){
            var number_next = parseInt(localStorage.getItem("number"))+1;
            var name = $("#name").val();
            var content =  $("#note").val();
            localStorage.setItem("number", number_next);
            localStorage.setItem(number_next, name);
            localStorage.setItem(number_next+"_kind", "note");
            str=content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\n/g,"<br/>");
            localStorage.setItem(number_next+"_content", str);
            alert("添加成功，标签ID为"+number_next);
            location.reload();
        }else if(kind=="copy"){
            var number_next = parseInt(localStorage.getItem("number"))+1;
            var name = $("#name").val();
            var content =  $("#copy").val();
            localStorage.setItem("number", number_next);
            localStorage.setItem(number_next, name);
            localStorage.setItem(number_next+"_kind", "copy");
            str=content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
            localStorage.setItem(number_next+"_content", str);
            alert("添加成功，标签ID为"+number_next);
            location.reload();
        }
    }
}

function to_delete(delete_number){
    $(".modal-body").text("确认要删除ID"+delete_number+"？");
    $(".btn-primary").bind('click',function(){
        localStorage.removeItem(delete_number);
        localStorage.removeItem(delete_number+"_kind");
        localStorage.removeItem(delete_number+"_color");
        number = parseInt(localStorage.getItem("number"));
        localStorage.setItem("number", number-1);
        if(delete_number<number){
            alert("开始执行高级删除");
        }
        for (var i_2=delete_number;i_2<number;i_2++)
        {   
            /*alert("开始执行高级删除");*/
            number_now=i_2;
            /*alert("删除的条目："+number_now);*/
            number_next=number_now+1;
            /*alert(number_next);*/
            localStorage.setItem(number_now+"_color", localStorage.getItem(number_next+"_color"));
            localStorage.removeItem(number_next+"_color");
            if(localStorage.getItem(number_next+"_kind")=="note"){
                number_next_name=localStorage.getItem(number_next);
                number_next_content=localStorage.getItem(number_next+"_content");
                localStorage.setItem(number_now, number_next_name);
                localStorage.setItem(number_now+"_kind", "note");
                localStorage.setItem(number_now+"_content", number_next_content);
            }else if(localStorage.getItem(number_next+"_kind")=="copy"){
                number_next_name=localStorage.getItem(number_next);
                number_next_content=localStorage.getItem(number_next+"_content");
                localStorage.setItem(number_now, number_next_name);
                localStorage.setItem(number_now+"_kind", "copy");
                localStorage.setItem(number_now+"_content", number_next_content);
            }else{
                number_next_name=localStorage.getItem(number_next);
                number_next_link=localStorage.getItem(number_next+"_link");
                localStorage.setItem(number_now, number_next_name);
                localStorage.setItem(number_now+"_kind", "");
                localStorage.setItem(number_now+"_link", number_next_link);
            }
            /*alert(localStorage.getItem(number_now));*/
        }
        alert("已删除");
        location.reload();
    })
}




function search(){
    /*if($.cookie("search")=="baidu"){*/
        if($("#search_this input").val()==""){
            $("#search_this input").focus();
            return false;
        }else{
            if($("#search_this input").val().search(/(.com|.cn|.tt|.net|.org|.club)/)!=-1){
                $str_1 = $("#search_this input").val().replace("http://","");
                $str_2 = $("#search_this input").val().replace("https://","");
                //var history_num = parseInt($.cookie("history_num"));
                for(var history_change=4;history_change>-1;history_change--){
                    var history_last=history_change-1;
                    var history_last_content=$.cookie("history_"+history_last);
                    $.cookie("history_"+history_change, history_last_content, { expires: 7 });
                }
                $.cookie("history_0", "http://" + $str_2, { expires: 7 });
                window.open("http://" + $str_2, "_self");
                /*alert("http://" + $("#search_this input").val());*/
            }else{
                /*alert("https://www.baidu.com/s?ie=UTF-8&wd=" + $("#search_this input").val());*/
                
                //var history_num = parseInt($.cookie("history_num"));
                for(var history_change=4;history_change>-1;history_change--){
                    var history_last=history_change-1;
                    var history_last_content=$.cookie("history_"+history_last);
                    $.cookie("history_"+history_change, history_last_content, { expires: 7 });
                }
                $.cookie("history_0", "https://www.baidu.com/s?ie=UTF-8&wd=" + $("#search_this input").val(), { expires: 7 });
                window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + $("#search_this input").val(), "_self");
            }
        }
    /*
    }else if($.cookie("search")=="google"){
        window.open("https://www.google.com.hk/search?q=" + $("#input-this").val(), "_blank");
    }else if($.cookie("search")=="bing"){
        window.open("https://www.bing.com/search?q=" + $("#input-this").val(), "_blank");
    }*/
}

function to_edit(edit_number){
    $("#fucen_background").fadeIn(200);
    $("#fucen_set-change_content").hide();
    $("#fucen_set").height(200);
    if(localStorage.getItem(edit_number+"_kind")=="web"||localStorage.getItem(edit_number+"_kind")==""){
        $("#fucen_set-change_content").show();
        $("#fucen_set").height(300);
    }else{
        $("#fucen_set-change_content").hide();
        $("#fucen_set").height(200);
    }
    $("#fucen_set").show();
    $("#fucen_set p a").each(function(){
        $(this).attr("onclick",$(this).attr("id")+"("+edit_number+")");
    })

    $("#fucen_set p button").attr("onclick","change_name("+edit_number+")");
}

function color_gray(number){
    localStorage.setItem(number+"_color", "gray");
    $("#fucen_set").hide();
    $("#fucen_background").fadeOut(200);
    location.reload();
}

function color_red(number){
    localStorage.setItem(number+"_color", "red");
    $("#fucen_set").hide();
    $("#fucen_background").fadeOut(200);
    location.reload();
}

function color_blue(number){
    localStorage.setItem(number+"_color", "blue");
    $("#fucen_set").hide();
    $("#fucen_background").fadeOut(200);
    location.reload();
}

function change_name(number){
    localStorage.setItem(number, $("#change_name").val());
    $("#fucen_set").hide();
    $("#fucen_background").fadeOut(200);
    location.reload();
}

function change_content(number){
    localStorage.setItem(number+"_link", $("#change_content").val());
    $("#fucen_set").hide();
    $("#fucen_background").fadeOut(200);
    location.reload();
}

function change(kind){
    if(kind=="note"){
        if($("#note").length > 0) {
            $("#note").focus();
        }else{
            $("#add_new *:not(#choose_,#choose_ *,#add,#name)").remove();
            $("#name").after("<textarea id='note' class='form-control' rows='3' placeholder='Content'></textarea>");
            $("#add_new #add").attr("onclick","add('"+kind+"')");
        }
    }else if(kind=="web"){
        if($("#link").length > 0) {
            $("#link").focus();
        }else{
            $("#add_new *:not(#choose_,#choose_ *,#add,#name)").remove();
            $("#name").after(" <input type='text' class='form-control' placeholder='网站链接（带http://）' aria-describedby='basic-addon1' id='link' autocomplete='off'>");
            $("#add_new #add").attr("onclick","add('"+kind+"')");
        }
    }else if(kind=="copy"){
        if($("#copy").length > 0) {
            $("#copy").focus();
        }else{
            $("#add_new *:not(#choose_,#choose_ *,#add,#name)").remove();
            $("#name").after(" <input type='text' class='form-control' placeholder='Content' aria-describedby='basic-addon1' id='copy' autocomplete='off'>");
            $("#add_new #add").attr("onclick","add('"+kind+"')");
        }
    }
}

function open_note(number){
    $("#note_modalLabel").text("ID"+number+"的内容");
    $("#note_content").html(localStorage.getItem(number+"_content"));
    
    $(".btn-primary").bind('click',function(){
    })
}

function copy_content(number){
    var clipboard = new Clipboard("#copy_"+number);   
    clipboard.on('success', function(e) {
        console.log(e);
        alert("复制成功！");
    })
    clipboard.on('error', function(e) {  
        console.log(e);
        alert("复制失败！您的浏览器可能不支持复制！");
    })
}
var history_content = [$.cookie("history_0"),$.cookie("history_1"),$.cookie("history_2"),$.cookie("history_3"),$.cookie("history_4"),];
function blank(link){
    if(link.search(/(https:\/\/www.baidu.com\/s\?ie=UTF-8&wd=)/)!=-1){
        link=link.substring(36);
        if($.inArray("https://www.baidu.com/s?ie=UTF-8&wd="+link, history_content)!=-1){
            window.location.href = "http://www.baidu.com/s?ie=UTF-8&wd="+link;
        }else{
            for(var history_change=4;history_change>-1;history_change--){
                var history_last=history_change-1;
                var history_last_content=$.cookie("history_"+history_last);
                $.cookie("history_"+history_change, history_last_content, { expires: 7 });
            }
            $.cookie("history_0", "https://www.baidu.com/s?ie=UTF-8&wd=" + link, { expires: 7 });
            window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + link, "_self");
        }
    }else{
        window.location.href = link;
    }
    //window.location.href = link;
}

