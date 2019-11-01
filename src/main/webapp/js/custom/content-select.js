$(function() {
    var new_title =
      "<div class='font_lit'><span class='green_hover'>" +
      Message.hover5 +
      "：</span>" +
      Message.hover2 +
      "</div><div class='font_lit'><span class='green_hover'>日活量：</span>" +
      Message.hover3 +
      "</div><div class='font_lit'><span class='green_hover'>" +
      Message.hover6 +
      "：</span>" +
      Message.hover4 +
      "</div><div class='font_lit'><span class='green_hover'>" +
      Message.hover7 +
      "：</span>" +
      Message.hover1 +
      "</div>";
    var new_title1 =
      "<div class='font_lit'><span class='green_hover'>渠道分析：</span>以渠道方式展现日活量、新增量、累计量</div><div class='font_lit'><span class='green_hover'>说明：</span>统计图形中以产品名称（渠道名称）的方式区分不同产品下的不同渠道</div>";
    var new_title2 =
      "<div class='font_lit'><span class='green_hover'>Top 10 渠道：</span>以渠道的方式，展现昨日top10的日活量，新增量、累计量。</div><div class='font_lit'><span class='green_hover'>说明：</span>统计图形中以产品名称（渠道名称）的方式区分不同产品下的不同渠道</div>";
    var new_title3 =
      "<div class='font_lit'><span class='green_hover'>昨日新增量：</span>从昨日凌晨0点截止到今日凌晨0点的新增量</div><div class='font_lit'><span class='green_hover'>昨日活跃量：</span>从昨日凌晨0点截止到今日凌晨0点的活跃量</div><div class='font_lit'><span class='green_hover'>新增活跃占比（%）：</span>" +
      Message.new_active +
      "</div><div class='font_lit'><span class='green_hover'>累计量：</span>截止到今日0时的设备总量</div>";

    Poshytip.init("hover", new_title);
    Poshytip.init("hover1", new_title1);
    Poshytip.init("hover2", new_title2);
    Poshytip.init("hover3", new_title3);

    $(".select_type").change(function() {
      var html = "",
        week = "",
        month = "",
        _val = $(this)
          .parent()
          .siblings()
          .children(".select_group")
          .val();

      if (_val == 2) {
        week = "selected";
      } else if (_val == 3) {
        month = "selected";
      }

      if ($(this).val() != 1) {
        html += '<option value="1">日</option>';
        html += "<option " + week + '  value="2">周</option>';
        html += "<option " + month + '  value="3">月</option>';
        $(this)
          .parent()
          .siblings()
          .children(".select_group")
          .html(html);
      } else {
        html += '<option value="1">日</option>';
        $(this)
          .parent()
          .siblings()
          .children(".select_group")
          .children("option")
          .remove();
        $(this)
          .parent()
          .siblings()
          .children(".select_group")
          .html(html);
      }
    });
  });