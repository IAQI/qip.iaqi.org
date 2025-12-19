$(function () {

  // HACK: Set first top menu icon as lock {This need to be made correctly, Dainis}
  //$(".topRibbon__container a i").first().removeClass().addClass('icon-lu-lock');

  // Fix tables
  var contentTables = $(".pageLayout__content table:not(.table-calendar-month)");
  // contentTables.addClass("table-hover");
  contentTables.removeAttr('cellspacing').removeAttr('cellpadding').removeAttr('border');
  contentTables.wrap('<div class="tableContainer"></div>');

  // Add filter
  $(".luCheckbox > input:radio").on('click', function () {
    if ($(this).prop('checked', true)) {
      $(".chosenFilters").fadeIn("normal", function () {
        $("#removeFilters").fadeIn("fast");
      });
      var id = $(this).data('id');
      var title = $(this).data('title');
      var group = $(this).attr('class');
      var filter = '<li style="display: none;" class="' + group + '" data-id="' + id + '"><button type="button" class="filterTags__delete"></button>' + title + '</li>';
      $(".filterTags > ." + group).remove();
      $(filter).appendTo($(".filterTags")).fadeIn();
    }
  });

  // Remove filter
  $('.filterTags').on('click', '.filterTags__delete', function () {
    var el = $(this).parent('li');
    var dataId = el.data('id');
    el.fadeOut("normal", function () {
      $('#' + dataId).prop('checked', false);
      el.remove();
      if ($(".filterTags li").length < 1) {
        $("#removeFilters").fadeOut("fast", function () {
          $(".chosenFilters").fadeOut("normal");
        });
      }
    });

  });

  // Remove all filters
  $("#removeFilters").on("click", function (e) {
    e.preventDefault();
    $('.filterTags > li > .filterTags__delete').click();
    $("#removeFilters").fadeOut("fast", function () {
      $(".chosenFilters").fadeOut("normal");
    });
  });

  // Remove empty ul/li elements
  $('ul li:empty').remove();

  // Needs to be at the very end to cover all options
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('self')) {
    let param = searchParams.get('self')
    if (param == 'true') {
      // Hide share buttons
      $('.shareBar').hide();

      // Add param to all urls
      $('a').each(function () {
        this.href += (/\?/.test(this.href) ? '&' : '?') + 'self=true';
      });

      // Set all url targeyts to self
      $('body').on('click', 'a', function (e) {
        e.preventDefault();
        // Check if not lightbox url
        let class_name = $(this).attr("class");
        if (class_name != 'jnlightbox') {
          window.open(this.href, '_self');
        }
      });
    }
  }

  // Overwrite search button function
  $('#mainSearchButton').on("click", function(e){
    e.preventDefault();

    // Submit form instead of click
    $('#mainSearchForm').submit();
  });

  // Add cookie edit event to video placeholder text
  let settingsModal = document.querySelector('#cconsent-modal');
  $('.edit-cookie__link').each(function () {
    $(this).on("click", function () {
      settingsModal.classList.add('ccm--visible');
    });

    // Set cookie edit event on whole element if gallery has more than 1 column and isn't main news image
    if ($(this).closest('.template-media-1').length === 0 && $(this).closest('.newsImage').length === 0) {
      if (!CookieConsent.config.categories.functional.wanted) {
        $(this).closest('.video-wrapper').on("click", function () {
          settingsModal.classList.add('ccm--visible');
        });
      }
    }
  });

  // Show or remove youtube/vimeo based on cookie settings
  $('.video-wrapper').each(function () {
    if (CookieConsent.config.categories.functional.wanted) {
      $(this).find('.external-video').css("display", "block");
    } else {
      $(this).find('.external-video').remove();
      $(this).find('.video-placeholder').css("display", "flex");
    }
  });
});
