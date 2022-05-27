$(document).ready(function () {
    const ul_template = $("#template > ul"),
        li_template = $("li", ul_template).first();

    const action = {
        "add-sibling": function (obj) {
            obj.after(li_template.clone());
            $('#buttonId').attr('disabled', 'disabled');
        },
        "add-child": function (obj) {
            obj.append(ul_template.clone());
            $('#buttonId').attr('disabled', 'disabled');
        },
        delete: function (obj) {
            obj.remove();
        },
    };

    $(document).on("click", "li.tree-node .controls > a", function () {
        action[this.getAttribute("data-func")]($(this).closest("li"));
        rebuild_tree();
        return false;
    });


    function rebuild_tree() {
        $("#out").text($("#p_name").val());
        $("input").keyup(function () {
            $(this).attr('data-name', $(this).val());
        });
        checkInputNull();
    }

    $("#tree").append(li_template.clone());
    $(document).on("keyup", "#tree input", rebuild_tree);
    $("#p_name").on("keyup", rebuild_tree);

    $("#tree")
        .on("mouseover", "li", function (e) {
            $(this).children(".controls").show();
            e.stopPropagation();
        })
        .on("mouseout", "li", function (e) {
            $(this).children(".controls").hide();
            e.stopPropagation();
        });

    rebuild_tree();
});

function checkInputNull(){
    $('.tree input').on('keyup', function() {
        let empty = false;
    
        $('.tree input').each(function() {
            if($(this).val().length == 0) {
                empty = true;
            }
        });
    
        if (empty)
          $('#buttonId').attr('disabled', 'disabled');
        else
          $('#buttonId').attr('disabled', false);
      });
}

function getNav($ul) {
    return $ul.children('li').map(function () {
        var $this = $(this),
            obj = $(this).find('input').data();//$this.data(),
            $ul = $this.children('ul');
        if ($ul.length) {
            obj.children = getNav($ul)
        }
        return obj;
    }).get()
}

function runTest(){
    var nav = getNav($('#tree'));
    return JSON.stringify(nav);
}


