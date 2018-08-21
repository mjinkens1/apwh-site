//Initialize navbar sidebar and overlay==========================================================================================================================================================
$('.overlay, .popup').hide();
$('nav').addClass('expand');
$('#sidebar').css('top', '58px');
//Load content===================================================================================================================================================================================
$(document).ready(function() {
  var href = document.location.href;
  var lastPathSegment = href.substr(href.lastIndexOf('/') + 1).split('-')[0].split('#')[0];


//Set accordion state closed for small screens==================================================================================================================================================================================
  if($(window).width() < 992) {
    $('#assign-btn').attr('aria-expanded', 'false');
    $('#assign-btn').addClass('collapsed');
    $('#assign-btn').removeClass('fa-minus');
    $('#assign-btn').addClass('fa-plus');
    $('#collapseOne').removeClass('show')
  };
//Show login popup==================================================================================================================================================================================
  $('#admin').click((event) => {
    event.preventDefault();
    if($('#sidebar').hasClass('show')) {
      $('.overlay').addClass('remain');
      $('#sidebar-toggle').trigger('click');
    }
    $('.popup').show();
    $('#email-wrapper').css('transform', 'scale(0,0)');
    $('#login-wrapper').css('transform', 'scale(1,1)');
    $('.overlay').fadeIn(300);
    $('body').css('margin-right', '8px')
    $('body').css('overflow', 'hidden');
  });
//Close login popup==================================================================================================================================================================================
  $('#cancel-login').click((event) => {
    event.preventDefault();
    $('.overlay').removeClass('remain');
    $('#login-wrapper').css('transform', 'scale(0,0)');
    $('.overlay').fadeOut(300);
    $('body').css('margin-right', '0px');
    $('body').css('overflow', 'auto');
    setTimeout(() => {
      $('.popup').hide();
    }, 325);
  });
//Show email popup==================================================================================================================================================================================
  $('#email').click((event) => {
    event.preventDefault();
    $('.popup').show();
    $('#login-wrapper').css('transform', 'scale(0,0)');
    $('.overlay').addClass('remain');
    $('#sidebar-toggle').trigger('click');
    setTimeout(() => {
      $('#email-wrapper').css('transform', 'scale(1,1)');
      $('body').css('margin-right', '8px')
      $('body').css('overflow', 'hidden');
    }, 325);
  });
//Close email popup==================================================================================================================================================================================
  $('#cancel-message').click((event) => {
    event.preventDefault();
    $('.overlay').removeClass('remain');
    $('#email-wrapper').css('transform', 'scale(0,0)');
    $('.overlay').fadeOut(300);
    $('body').css('margin-right', '0px');
    $('body').css('overflow', 'auto');
    setTimeout(() => {
      $('.popup').hide();
    }, 325);
  });

//Define auto scroll==================================================================================================================================================================================
  $('#home, #map-home').click(function(event) {
    if(lastPathSegment != 'index') return;
    event.preventDefault();
    if(!$('#sidebar').hasClass('show')) {
      $('html, body').animate({
          scrollTop: 0
      }, 900);
    };
  });

  $('#calendar-icon').click(function(event) {
    event.preventDefault();
    if(!$('#sidebar').hasClass('show')) {
      $('html, body').animate({
          scrollTop: $('#calendar').offset().top - 60
      }, 900);
    };
  });

  $('#announce-icon').click(function(event) {
    event.preventDefault();
    if(!$('#sidebar').hasClass('show')) {
      $('html, body').animate({
          scrollTop: $('#announcements').offset().top - 60
      }, 900);
    };
  });

  $('#parents-icon').click(function(event) {
    event.preventDefault();
    if(!$('#sidebar').hasClass('show')) {
      $('html, body').animate({
        scrollTop: $('#parents').offset().top - 60
      }, 900);
    }
  });
//Toggle overlay==================================================================================================================================================================================
  $('#sidebar').on('shown.bs.collapse', () => {
    $('.overlay').fadeIn(300);
    $('.popup').hide();
    $('#email-wrapper').css('transform', 'scale(0,0)');
    $('#login-wrapper').css('transform', 'scale(0,0)');
    if(lastPathSegment == 'apwh' || lastPathSegment == 'syllabus' || lastPathSegment == 'apprep' ||  lastPathSegment == 'socialstudiesuil' || lastPathSegment == 'index' ) {
      $('body').css('margin-right', '8px')
      $('body').css('overflow', 'hidden');
    };
  });

  $('#sidebar').on('hidden.bs.collapse', (event) => {

      if($('.overlay').hasClass('remain')) return;
      $('.overlay').fadeOut(300);
      $('body').css('margin-right', '0px');
      $('body').css('overflow', 'auto');
  });
//calendar==================================================================================================================================================================================
  class Calendar {
    constructor() {
      this.days_in_week = {'0':'Sunday', '1':'Monday', '2':'Tuesday', '3':'Wednesday', '4':'Thursday', '5':'Friday', '6':'Saturday'};
      this.days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.today = new Date();
      this.dd = this.today.getDate();
      this.mm = this.today.getMonth();
      this.yyyy = this.today.getFullYear();
      this.sm = this.mm;
      this.sy = this.yyyy;

      this.setCalendar = function (month, year) {

        $('.calendar-day').removeClass('calendar-active');

        if (month != null) {
          this.mm = month;
          $(`.calendar-day:has(#day${this.dd})`).attr('today', 'false');
          $('.calendar-day').removeClass('calendar-active');
        }
        else {
          this.mm = this.today.getMonth();
          this.sm = this.mm;
        }

        if (year != null) {
          this.yyyy = year;
          this.sy = this.yyyy;
        }
        else {
          this.yyyy = this.today.getFullYear();
        }

        $('.cal-header-year').text(this.yyyy); //set header day/month
        $('.cal-header-month').text(this.months[this.mm]);
        $('#day-selection-name').text(this.days_in_week[new Date(this.yyyy, this.mm, this.dd).getDay()]); //set selected day to today
        $('#day-selection-number').text(this.dd);
        $('#month-selection').text(this.months[this.mm]);

        var first_day = new Date(this.yyyy, this.mm, 1);
        var starting_day = first_day.getDay();
        var no_days = this.days_in_month[this.mm];

        if (this.mm == 0) {
          this.lm = 11;
        }
        else {
          this.lm = this.mm - 1;
        };

        if (this.mm == 11) {
          this.nm = 0;
        }
        else {
          this.nm = this.mm + 1;
        };

        var last_month = this.months[this.lm];
        var next_month = this.months[this.nm];
        var last_month_days = this.days_in_month[this.lm];

        // set calendar dates
        var i;
        var ii = 1;

        for (i = starting_day; i < starting_day + no_days; ++i) {
          $(`#day${i}`).text(ii);
          $(`.calendar-day:has(#day${i})`).attr('last_month', 'false');
          $(`.calendar-day:has(#day${i})`).attr('next_month', 'false');
          ii += 1;
        };

        for (i = 0; i < starting_day; ++i) {
          $(`#day${i}`).text(last_month_days - starting_day + i + 1);
          $(`.calendar-day:has(#day${i})`).attr('last_month', 'true');
        };

        ii = 1;

        for (i = starting_day + no_days; i < 35; ++i) {
          $(`#day${i}`).text(ii);
          $(`.calendar-day:has(#day${i})`).attr('next_month', 'true');
          ii += 1;
        };

        var i;
        for (i = 0; i < 35; ++i) {
          $(`#day${i}`).attr('today', false);
          if ($(`#day${i}`).text() == this.dd && $(`#day${i}`).parent().attr('next_month') == 'false' && $(`#day${i}`).parent().attr('last_month') == 'false') {
            $(`#day${i}`).parent().addClass('calendar-active');
            this.active_id = $(`#day${i}`);
            if(this.today.getMonth() == this.sm && this.today.getFullYear() == this.sy){
              if($(`#day${i}`).attr('next_month', false)) {
                $(`#day${i}`).attr('today', true);
              };
            };
          };
        };
        loadContent({
          'content.file': lastPathSegment,
          'content.contentType': 'cal-announcement',
          'content.month': {$in: [calendar.sm - 1, calendar.sm, calendar.sm + 1] }
        });
        this.showContent(this.sm, this.sy);
      };

      this.activeDay = function(event) {
        var target_id = $(event.currentTarget);
        var target_el = $(event.target).closest('div').children('span')[0];
        var weekday = calendar.days_in_week[new Date(calendar.yyyy, calendar.mm, $(target_el).text()).getDay()]

        $('#day-selection-name').text(weekday);
        $('#day-selection-number').text($(target_el).text());
        $('#month-selection').text(calendar.months[this.mm]);

        if (target_id != this.active_id && this.active_id != null) {
          this.active_id.parent().removeClass('calendar-active');
          this.active_id.removeClass('calendar-active');
          target_id.addClass('calendar-active');
          this.active_id = target_id;
        }
        else if (target_id != this.active_id) {
          $(event.target).addClass('calendar-active')
          this.active_id = $(event.target)[0].id;
        };

        if ($(event.target).attr('last_month') == 'true') {
          $('#day-selection-name').text(this.days_in_week[new Date(this.yyyy, this.lm, $(target_el).text()).getDay()]);
          $(event.currentTarget).addClass('calendar-active')
          $('#month-selection').text(this.months[this.lm]);
        };

        if ($(event.target).attr('next_month') == 'true') {
          $('#day-selection-name').text(this.days_in_week[new Date(this.yyyy, this.nm, $(target_el).text()).getDay()]);
          $(event.currentTarget).addClass('calendar-active')
          $('#month-selection').text(this.months[this.nm]);
        };
        this.showContent(this.sm, this.sy);
      };

      this.cardButton = function(event) {
        $('.card-button').addClass('fa-plus');
        $('.card-button').removeClass('fa-minus');

        if($($(event.target).data('target')).hasClass('show')) {
          $(event.target).addClass('fa-plus');
          $(event.target).removeClass('fa-minus');
        } else {
          $(event.target).removeClass('fa-plus');
          $(event.target).addClass('fa-minus');
        }
      };

      this.navArrow = function(nav_arrow) {
        if (nav_arrow[0].id == 'next-month') {
          nav_arrow.css('transform', 'translatex(2px)');
          setTimeout(function() {
            nav_arrow.css('transform', 'translatex(0px)');
          }, 200);

          if (this.sm == 11) {
            this.sm = 0;
            this.sy += 1;
          }
          else {
            this.sm += 1;
          };
        }
        else if (nav_arrow[0].id == 'last-month') {
          nav_arrow.css('transform', 'translatex(-2px)');
          setTimeout(function() {
            nav_arrow.css('transform', 'translatex(0px)');
          }, 200);

          if (this.sm == 0) {
            this.sm = 11;
            this.sy -= 1;
          }
          else {
            this.sm -= 1;
          };
        };

        $('.cal-header-month').text(calendar.months[this.sm]);
        calendar.setCalendar(this.sm, this.sy);
        this.showContent(this.sm, this.sy);
        $('.cal-wrapper .admin').show();
      };

      this.showContent = function(month, year) {
        let calContainers = ['#cal-assignments', '#cal-events', '#cal-misc'];
        let assignmentCount = 0;
        let eventCount = 0;
        let miscCount = 0;
        let i;

        $('.cal-icons .fa-pencil-alt').css('visibility', 'hidden');
        $('.fa-calendar-check').css('visibility', 'hidden');
        $('.fa-info-circle').css('visibility', 'hidden');

        for(i = 0; i < calContainers.length; ++i) {
          $.each($(calContainers[i]).find('.info-box'), (index, value) => {
            if($(value).attr('data-parent') == '#cal-assignments' && $(value).attr('data-month') == month && $(value).attr('data-year') == year) {
              $(`${$(value).attr('data-day')}`).parent().find('.fa-pencil-alt').css('visibility', 'visible');
            } else if($(value).attr('data-parent') == '#cal-events' && $(value).attr('data-month') == month && $(value).attr('data-year') == year) {
              $(`${$(value).attr('data-day')}`).parent().find('.fa-calendar-check').css('visibility', 'visible');
            } if($(value).attr('data-parent') == '#cal-misc' && $(value).attr('data-month') == month && $(value).attr('data-year') == year) {
              $(`${$(value).attr('data-day')}`).parent().find('.fa-info-circle').css('visibility', 'visible');
            };
            // console.log( $($(value).attr('data-day')).parent())
            //         var first_day = new Date(this.yyyy, this.mm, 1);
            //         var starting_day = first_day.getDay();
            // get starting day of next month, determine offset, map next month events to current month for #dayXX < 7
            //
            // if($(value).attr('data-parent') == '#cal-assignments' && $($(value).attr('data-day')).attr('next_month') == true && $(value).attr('data-month') == month + 1 && $(value).attr('data-year') == year) {
            //   $(`${$(value).attr('data-day')}`).parent().find('.fa-pencil-alt').css('visibility', 'visible');
            // }/else if($(value).attr('data-parent') == '#cal-events' && $(value).attr('data-month') == month + 1 && $(value).attr('data-year') == year) {
            //   $(`${$(value).attr('data-day')}`).parent().find('.fa-calendar-check').css('visibility', 'visible');
            // } if($(value).attr('data-parent') == '#cal-misc' && $(value).attr('data-month') == month + 1 && $(value).attr('data-year') == year) {
            //   $(`${$(value).attr('data-day')}`).parent().find('.fa-info-circle').css('visibility', 'visible');
            // };

            if($(value).attr('data-day') == '#' + $('#calendar').find('.calendar-active > span').attr('id') && $(value).attr('data-month') == month && $(value).attr('data-year') == year){
              $(value).show();
              if(calContainers[i] == '#cal-assignments') {
                assignmentCount += 1;
              } else if(calContainers[i] == '#cal-events') {
                eventCount += 1;
              } else if (calContainers[i] == '#cal-misc') {
                miscCount += 1;
              };
            } else {
              $(value).hide();
            };
          });
        };
        if(assignmentCount > 0 && $('#assign-btn').attr('aria-expanded') == 'false') $('#assign-btn').trigger('click');
        if(assignmentCount == 0 && eventCount > 0 && $('#events-btn').attr('aria-expanded') == 'false') $('#events-btn').trigger('click');
        if(assignmentCount == 0 && eventCount == 0 && miscCount > 0 && $('#misc-btn').attr('aria-expanded') == 'false') $('#misc-btn').trigger('click');
        $('#assignment-count').text(assignmentCount);
        $('#event-count').text(eventCount);
        $('#misc-count').text(miscCount);
        $('.editor-hidden').hide();
        $('.admin-delete').hide();
      };
    };
  };
  if(lastPathSegment == 'index') {
    var calendar = new Calendar()
    calendar.setCalendar();
  }

  $('.calendar-day').click(function(event) {
    calendar.activeDay(event)
  });

  $('.card-button').click(function(event) {
    calendar.cardButton(event);
  });

  $('#refresh').click(function(event) {
    event.preventDefault();
    calendar.setCalendar(calendar.mm, calendar.yyyy)
  });

  $('.cal-nav').click(function(event) {
    event.preventDefault();
    calendar.navArrow($(this));
  });

  // $('#refresh').click(function(event) {
  //   event.preventDefault();
  //   calendar.setCalendar(null, null, null)
  // });


//Load content=====================================================================================================================================================================================
  function loadContent(query) {
    $.ajax({
      url: '/apwh/load-content',
      data: query,
      type: 'POST',
      success: function (data) {
        for(i = 0; i < Object.keys(data).length; ++i) {
          $(`${data[i].content.container}`).find('.info-wrapper').append(data[i].content.templateHTML);
          $(`#${data[i].content.id}`).find('.editor-hidden').html(data[i].content.contentHTML);
          $(`#${data[i].content.id}`).attr('data-day', data[i].content.day);
          $(`#${data[i].content.id}`).attr('data-month', data[i].content.month);
          $(`#${data[i].content.id}`).attr('data-year', data[i].content.year);
          $(`#${data[i].content.id}`).attr('data-parent', data[i].content.container);
          if(data[i].content.contentType != 'file'  && $(`#${data[i].content.id}`).children('.airnote').length == 0)
            $(`#${data[i].content.id}`).append('<div class="p-0 m-0 airnote"></div>');
        };
        $('.airnote').summernote({
          airMode: true
        });
        for(i = 0; i < Object.keys(data).length; ++i) {
          $(`#${data[i].content.id}`).find('.airnote').summernote('code', data[i].content.contentHTML);
        };
        if(lastPathSegment === 'index') {
          calendar.showContent(calendar.mm, calendar.yyyy);
        }
        $('.editor-hidden').hide();
        $('.admin-delete').hide();
      },
      error: function (xhr, status, error, rej) {
        console.error('Error: ' + error);
        alert('Drats, something went wrong.  Please try again later.')
      },
      timeout: 5000
    });
  };

  loadContent({
    'content.file': lastPathSegment,
    'content.contentType': {$in: ['announcement', 'file']}
  });

  // if(lastPathSegment == 'index') {
  //   loadContent({
  //     'content.file': lastPathSegment,
  //     'content.contentType': 'cal-announcement',
  //     'content.month': {$in: [calendar.sm - 1, calendar.sm, calendar.sm + 1] }
  //   });
  // };

  function addContent(event) {

    $.ajax({
      url: '/apwh/admin/add-content',
      data: {
        'contentType': $(event.target).data('type'),
        'parentContainer': $(event.target).data('target'),
        'parentFile': lastPathSegment,
        'filepath': '',
        'day': '#' + $('#calendar').find('.calendar-active > span').attr('id'),
        'month': lastPathSegment === 'index' ? calendar.sm : '',
        'year': lastPathSegment === 'index' ? lastcalendar.sy : ''
     },
      type: 'POST',
      success: function (data) {
        $($(event.target).data('target')).find('.info-wrapper').append(data.content);
        var newId = $(data.content).attr('id');
        $(`#${newId}`).append('<div class="p-0 m-0 airnote"></div>');
        if($(event.target).data('type') == 'file')
          $(`#${newId}`).hide();
        $('.admin-delete').hide();
        $('.editor-hidden').hide();
        $('.airnote').summernote({
          airMode: true,
        });
      },
      error: function (xhr, status, error, rej) {
        console.error('Error: ' + error);
        alert('Drats, something went wrong.  Please try again later.')
      },
      timeout: 5000
    });
  };

  $.ajax({
    url: '/apwh/admin/user',
    data: {},
    type: 'GET',
    success: function (data) {
      $('#username-disp').text(data);
    },
    error: function (xhr, status, error, rej) {
      console.error('Error: ' + error);
      alert('Drats, something went wrong.  Please try again later.')
    },
    timeout: 5000
  });

  //Post rss xml request to server to avoid CORS restrictions==================================================================================================================================
    var rssURL = '/apwh/load-rss'
    var items = [];

    $.post(rssURL, function(data) {
    var $xml = $(data);
    $xml.find("item").each(function() {
      //if item's enclosure url attribute is in .mp4 format... then add it to the video array
      if($("enclosure[url$='.mp4']",this).length>0){
        var $this = $(this),
        item = {
           title: $this.find("title").text(),
           link: $this.find("link").text(),
           description: $this.find("description").text(),
           pubDate: $this.find("pubDate").text(),
           url : $this.find("enclosure").attr("url"),
           author: $this.find("author").text()
         };

        items.push(item);

        if(items.length == 1){
          $('#cnn10').attr('src', items[0].url);
        }
      }
    });
  });

//Add new content==================================================================================================================================================================================
  $('.admin-add-file').click((event) => {
    event.preventDefault();
    var target = event.target;
  });

  $('.admin-add').click((event) => {
    event.preventDefault();
    if($(event.target).data('type') == 'cal-announcement' && $(event.target).parent().find('.card-button').attr('aria-expanded') == 'false')
      $(event.target).parent().find('.card-button').trigger('click')
    addContent(event);
  });

$('#fileInputHandouts').change(function() {
  var formData = new FormData($('#fileFormHandouts')[0])
  console.log(formData.getAll('input'))
  $('#fileFormHandouts').submit();
});

$("#fileFormHandouts").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
        url: $(this).attr("action"),
        type: 'POST',
        data: new FormData($('#fileFormHandouts')[0]),
        processData: false,
        contentType: false,
        success: function(data) {
          console.log(data)
          addContent(event);
          // if (data[0] != '<') {
          //   $(".failed-login").text(data);
          // } else {
          //     $(".failed-login").text("");
          //    window.location = '/apwh/admin/index-admin';
          // };
        }
    });
});

//Show delete buttons==================================================================================================================================================================================
  $('.admin-remove').click((event) => {
    event.preventDefault();
    $(event.target).parents('.card').find('.admin-delete').show();
  });
//Delete content==================================================================================================================================================================================
  $('body').on('click', '.admin-delete', (event) => {
    event.preventDefault();
    $.ajax({
      url: '/apwh/admin/remove-content',
      data: {'id': $(event.target).parent().attr('id')},
      type: 'DELETE',
      success: function (data) {
        $(`#${$(event.target).parent().attr('id')}`).remove();
        $($(event.target).data('target')).find('.tooltip-text').css('display', 'block');
        if($(event.target).data('type') == 'cal-announcement')
        loadContent({
          'content.file': lastPathSegment,
          'content.contentType': $(event.target).data('type'),
          'content.container': $(event.target).data('target')
        });
      },
      error: function (xhr, status, error, rej) {
        console.error('Error: ' + error);
        alert('Drats, something went wrong.  Please try again later.')
      },
      timeout: 5000
    });
  });
//Save content changes in container==================================================================================================================================================================================
  $('.admin-save-all').click((event) => {
    event.preventDefault();
    $('.admin-delete').hide();
    var contentToSave = {};
    if($(event.target).data('type') == 'announcement' || $(event.target).data('type') == 'cal-announcement') {
      $.each($($(event.target).data('target')).find('.info-box'), (index, value) => {
        var saveId = $(value).attr('id');
        $(`#${saveId}`).find('.editor-hidden').html($(value).find('.airnote').summernote('code'));
        console.log(typeof $(`#${saveId}`).find('.airnote').summernote('code'))
        var saveHTML = '';
        if(typeof $(`#${saveId}`).find('.airnote').summernote('code') == 'string')
          saveHTML = $(`#${saveId}`).find('.airnote').summernote('code');
        contentToSave[index] = {
          'id': saveId,
          'html': saveHTML
        }
      });
    };
    console.log('save content: ', contentToSave)
    $.ajax({
      url: '/apwh/admin/save-content',
      data: contentToSave,
      type: 'POST',
      success: function (data) {
        if(data == 'Changes saved!')
        $($(event.target).data('target')).find('.tooltip-text').css('display', 'block');
        setTimeout(() => {
          $('.content-saved').fadeOut(500);
        }, 1500)
        setTimeout(() => {
          $($(event.target).data('target')).find('.tooltip-text').css('display', 'none')
        }, 2000)

        if($(event.target).data('type') == 'cal-announcement')
        loadContent({
          'content.file': lastPathSegment,
          'content.contentType': $(event.target).data('type'),
          'content.container': $(event.target).data('target')
        });
      },
      error: function (xhr, status, error, rej) {
        console.error('Error: ' + error);
        alert('Drats, something went wrong.  Please try again later.')
      },
      timeout: 5000
    });
  });

  function shrinkNavbar(offset, max_height='58px') {
    if ($(document).scrollTop() > offset) {
      $('nav').addClass('shrink');
      $('nav').removeClass('expand');
      $('#sidebar').css('top', `${$('.navbar').height()}px`);
      $('.overlay').css('top', `${$('.navbar').height()}px`);
    }
    else {
      $('nav').removeClass('shrink');
      $('nav').addClass('expand');
      $('#sidebar').css('top', `${max_height}`);
      $('.overlay').css('top', `${max_height}`);
    };
  };


  $(window).scroll(function() {
    shrinkNavbar(37);
  });
});
