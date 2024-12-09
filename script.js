$(document).ready(function () {
    // Gallery image hover effect
    $(".img-wrapper").hover(
      function () {
        $(this).find(".img-overlay").animate({ opacity: 1 }, 600);
      },
      function () {
        $(this).find(".img-overlay").animate({ opacity: 0 }, 600);
      }
    );
  
    // Lightbox functionality
    var $overlay = $('<div id="overlay"></div>');
    var $image = $("<img>");
    var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
    var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
    var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');
  
    // Add overlay to the page
    $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
    $("body").append($overlay);  // Appending to body instead of #gallery to make it global
  
    // Hide overlay by default
    $overlay.hide();
  
    // When an image is clicked
    $(".img-overlay").click(function (event) {
      event.preventDefault();
      var imageLocation = $(this).prev().attr("href");  // Get the href attribute (full image URL)
      $image.attr("src", imageLocation);
      $overlay.fadeIn("slow");
    });
  
    // When the overlay is clicked
    $overlay.click(function () {
      $(this).fadeOut("slow");
    });
  
    // When the next button is clicked
    $nextButton.click(function (event) {
      event.stopPropagation();  // Prevents the overlay from closing
      var $currentImgSrc = $image.attr("src");  // Get current image source
      var $currentImg = $(".img-wrapper a img[src='" + $currentImgSrc + "']");
  
      // Find next image in the gallery
      var $nextImg = $currentImg.closest(".img-wrapper").next().find("a img");
      if ($nextImg.length === 0) {  // If no next image, loop to the first image
        $nextImg = $(".img-wrapper:first a img");
      }
  
      // Set the new image source and fade it in
      $image.attr("src", $nextImg.attr("src")).fadeIn(800);
    });
  
    // When the previous button is clicked
    $prevButton.click(function (event) {
      event.stopPropagation();  // Prevents the overlay from closing
      var $currentImgSrc = $image.attr("src");  // Get current image source
      var $currentImg = $(".img-wrapper a img[src='" + $currentImgSrc + "']");
  
      // Find previous image in the gallery
      var $prevImg = $currentImg.closest(".img-wrapper").prev().find("a img");
      if ($prevImg.length === 0) {  // If no previous image, loop to the last image
        $prevImg = $(".img-wrapper:last a img");
      }
  
      // Set the new image source and fade it in
      $image.attr("src", $prevImg.attr("src")).fadeIn(800);
    });
  
    // When the exit button is clicked
    $exitButton.click(function () {
      $overlay.fadeOut("slow");
    });
  });
  $(document).ready(function () {
    $("a").on("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();
  
        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            window.location.hash = hash;
          }
        );
      }
    });
  });
  
  $(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
  });
  
  