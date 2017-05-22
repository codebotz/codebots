$ ->
  if $('.pagination').length && $('#bodypost').length
    $(window).scroll ->
      url = $('.pagination .next_page').attr('href')
      if url && $(window).scrollTop() > $(document).height() - $(window).height() - 50
        $('.pagination').text("Mostrando más posts...")
        $.getScript(url)
    $(window).scroll()
