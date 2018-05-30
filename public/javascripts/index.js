//Initialize navbar sidebar and overlay==========================================================================================================================================================
$('.overlay, .popup').hide();
$('nav').addClass('expand');
$('#sidebar').css('top', '58px');
//Load content===================================================================================================================================================================================
$(document).ready(function() {
  var href = document.location.href;
  var lastPathSegment = href.substr(href.lastIndexOf('/') + 1).split('-')[0].split('#')[0];
  if(lastPathSegment == 'apwh') lastPathSegment = 'index';
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

  $("#login-form").on("submit", function(event) {
      event.preventDefault();
      $.ajax({
          url: $(this).attr("action"),
          type: 'POST',
          data: $(this).serialize(),
          success: function(data) {
            if (data[0] != '<') {
              $(".failed-login").text(data);
            } else {
                $(".failed-login").text("");
               window.location = '/apwh/admin/index-admin';
            };
          }
      });
  });

  function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  $("#signup-form").on("submit", function(event) {
      event.preventDefault();
      if($(this).serializeArray()[0].value === '') $(".failed-signup").text('Please enter a valid email');
      if(!validateEmail($(this).serializeArray()[0].value)) $(".failed-signup").text('Please enter a valid email');
      if($(this).serializeArray()[1].value === '') $(".failed-signup").text('Please enter a password');
      if($('#signup-password').text() !== $(this).serializeArray()[1].value) $(".failed-signup").text("Passwords must match");
      $.ajax({
          url: $(this).attr("action"),
          type: 'POST',
          data: $(this).serialize(),
          success: function(data) {
            if (data[0] != '<') {
              $(".failed-signup").text(data);
            } else {
                $(".failed-signup").text("");
                window.location = '/apwh/admin/index-admin';
            };
          }
      });
  });
//Close login popup==================================================================================================================================================================================
  $('#cancel-login').click((event) => {
    event.preventDefault();
    $('.overlay').removeClass('remain');
    $('#login-wrapper').css('transform', 'scale(0,0)');
    $('.overlay').fadeOut(300);
    $('body').css('margin-right', '0px');
    $('body').css('overflow', 'auto');
    $(".failed-login").text("");
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
              if($(`#day${i}`).parent().attr('next_month') == 'false' && $(`#day${i}`).parent().attr('last_month') == 'false') {
                $(`#day${i}`).attr('today', true);
              };
            };
          };
        };
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
        if($(window).width() > 992) {
          if(assignmentCount > 0 && $('#assign-btn').attr('aria-expanded') == 'false') $('#assign-btn').trigger('click');
          if(assignmentCount == 0 && eventCount > 0 && $('#events-btn').attr('aria-expanded') == 'false') $('#events-btn').trigger('click');
          if(assignmentCount == 0 && eventCount == 0 && miscCount > 0 && $('#misc-btn').attr('aria-expanded') == 'false') $('#misc-btn').trigger('click');
        }
        $('#assignment-count').text(assignmentCount);
        $('#event-count').text(eventCount);
        $('#misc-count').text(miscCount);
      };
    };
  };

  var calendar = new Calendar()
  calendar.setCalendar();

  $('.calendar-day').click(function(event) {
    calendar.activeDay(event)
  });

  $('.card-button').click(function(event) {
    calendar.cardButton(event);
  });

  $('#refresh').click(function(event) {
    event.preventDefault();
    calendar.setCalendar(null, null, null)
  });

  $('.cal-nav').click(function(event) {
    event.preventDefault();
    calendar.navArrow($(this));
  });

  $('#refresh').click(function(event) {
    event.preventDefault();
    calendar.setCalendar(null, null, null)
  });

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
        $(`#${data[i].content.id}`).attr('data-parent', data[i].content.container)
      };
      calendar.showContent(calendar.mm, calendar.yyyy);
      $('.admin-delete').hide();
    },
    error: function (xhr, status, error, rej) {
      console.error('Error: ' + error);
      alert('Drats, something went wrong.  Please try again later.')
    },
    timeout: 5000
  });
};

loadContent({'content.file': lastPathSegment});

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


  $(window).scroll(function() {
    shrinkNavbar(37);
  });
});
