!function () {
  /**
   * 切换至指定轮播图
   * @param {Object} slides jQuery Node
   * @param {Number} activeIndex
   * @param {Number} deactiveIndex
   */
  function setSlidesState (slides, activeIndex, deactiveIndex) {
    if (activeIndex >= 0) {
      slides.eq(activeIndex)
        .addClass('active')
        .siblings('.active')
        .removeClass('active');
    }
    if (deactiveIndex >= 0) {
      slides.eq(deactiveIndex).addClass('deactive');
      slides.eq(deactiveIndex).one('transitionend', function (e) {
        $(e.currentTarget).removeClass('deactive');
      });
    }
  }

  /**
   * 切换至下一张轮播图
   * @param {Object} playerData 
   */
  function nextSlide(playerData) {
    playerData.activeIndex = (playerData.activeIndex + 1) % playerData.slides.length;
    playerData.deactiveIndex = playerData.activeIndex - 1 < 0 ? 
                                playerData.slides.length - 1 : 
                                playerData.activeIndex - 1;
    setSlidesState(playerData.slides, playerData.activeIndex, playerData.deactiveIndex);
  }

  /**
   * 激活轮播图播放器
   * @param {Object} playerData 
   */
  function startAutoPlayer(playerData) {
    playerData.timer = setInterval(function () {
      nextSlide(playerData);
    }, playerData.delay);
  }

  /**
   * 添加鼠标移入移除轮播图事件
   * @param {Object} $elem jQuery Node
   * @param {Object} playerData
   */
  function addEvents($elem, playerData) {
    $elem.on('mouseenter', function () {
      clearInterval(playerData.timer)
    });

    $elem.on('mouseleave', function () {
      startAutoPlayer(playerData);
    });
  }

  /**
   * 初始化页面的class
   * @param {Object} playerData
   */
  function initPage(playerData) {
    if (['left', 'top', 'right', 'bottom'].indexOf(playerData.moveDirection) === -1) {
      playerData.moveDirection = 'left';
    }
    playerData.slides.addClass(playerData.moveDirection);
    setSlidesState(playerData.slides, playerData.activeIndex, playerData.deactiveIndex);
  }

  /**
   * 程序入口
   */
  function ___main() {
    // 初始化播放器状态
    let playerData = {
      slides: $('.images > img'),
      activeIndex: 2, // activeIndex >= 0 && activeIndex < number of slide images
      deactiveIndex: -1, 
      delay: 3000, // delay >= 500
      moveDirection: 'left', // left | right | top | buttom
      timer: undefined,
    };
    // 初始化页面class
    initPage(playerData);
    // 添加自动播放器
    startAutoPlayer(playerData);
    // 添加鼠标移动事件
    addEvents($('.window'), playerData);
  }

  ___main();
}.call()
