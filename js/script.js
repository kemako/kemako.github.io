// PhotoSwipe
initPhotoSwipeFromDOM('.my-gallery');

$(function() {

  $('figcaption').on('click', 'a', function(e) {
    e.stopPropagation();
  });

  $('a[href^="#"]').on('click', function() {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });

  //backToTop
  $('#backToTop').on('click', function() {
    $('body,html').animate({
      scrollTop: 0
    }, 300);
    return false;
  });


  var $nav = $('#gnav');
  var offset = $nav.offset();
  var navHeight = $nav.innerHeight();
  $('.section').css('padding-top', navHeight / 2);

  $(window).on('resize', function() {
    var currentWidth = window.innerWidth;
    if (currentWidth == window.innerWidth) {
      // ウインドウ横幅が変わっていないため処理をキャンセル
      return;
    }
    $nav = $('#gnav');
    offset = $nav.offset();
    navHeight = $nav.innerHeight();
    $('.section').css('padding-top', navHeight / 2);
  });


  $(window).scroll(function() {
    if ($(window).scrollTop() >= offset.top) {
      $nav.addClass('fixed');
      $("#contents").css("margin-top", navHeight);
    } else {
      $nav.removeClass('fixed');
      $("#contents").css("margin-top", "0");
    }
  })

  // Wrap every letter in a span
$('.ml1 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
$('.ml6 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
$('.ml16').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
anime.timeline({loop: false})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: function(el, i) {
      return 70 * (i+1)
    }
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: function(el, i, l) {
      return 80 * (l - i);
    }
  });

  // Wrap every letter in a span


anime.timeline({loop: false})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: function(el, i) {
      return 50 * i;
    }
  });

  // Wrap every letter in a span

anime.timeline({loop: false})
  .add({
    targets: '.ml16 .letter',
    translateY: [-100,0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: function(el, i) {
      return 30 * i;
    }
  });

  var scrollAnimationClass = 'sa';
  var scrollAnimationShowClass = 'show';
  var triggerMarginDefault = 300;

  var scrollAnimationElm = document.querySelectorAll('.' + scrollAnimationClass);
  var scrollAnimationFunc = function() {
    var dataMargin = scrollAnimationClass + '_margin';
    var dataTrigger = scrollAnimationClass + '_trigger';
    var dataDelay = scrollAnimationClass + '_delay';
    for(var i = 0; i < scrollAnimationElm.length; i++) {
      var triggerMargin = triggerMarginDefault;
      var elm = scrollAnimationElm[i];
      var showPos = 0;
      if(elm.dataset[dataMargin] != null) {
        triggerMargin = parseInt(elm.dataset[dataMargin]);
      }
      if(elm.dataset[dataTrigger]) {
        showPos = document.querySelector(elm.dataset[dataTrigger]).getBoundingClientRect().top + triggerMargin;
      } else {
        showPos = elm.getBoundingClientRect().top + triggerMargin;
      }
      if (window.innerHeight > showPos) {
        var delay = (elm.dataset[dataDelay])? elm.dataset[dataDelay] : 0;
        setTimeout(function(index) {
          scrollAnimationElm[index].classList.add('show');
        }.bind(null, i), delay);
      }
    }
  }
  window.addEventListener('load', scrollAnimationFunc);
  window.addEventListener('scroll', scrollAnimationFunc);

  //物理演算
  var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      World = Matter.World,
      Bodies = Matter.Bodies;

  function createString($string, width, height, textWidth, textHeight, fontStyle, color) {

    let drawing = document.createElement("canvas");

    drawing.width = width;
    drawing.height = height;

    let ctx = drawing.getContext("2d");

    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = fontStyle;
    ctx.textAlign = "center";
    ctx.fillText($string, textWidth, textHeight);

    return drawing.toDataURL("image/png");
  }

  var container = document.getElementById('world')

  // create engine
  var engine = Engine.create(),  //物理演算エンジンを生成？
      world = engine.world;  //重力の存在する仮想世界の生成…？

  var render = Render.create({  //レンダリングの設定？
      element: container,
      engine: engine,
      options: {
        width: 800,  //ステージの横幅
        height: 250,  //ステージの高さ
        background: '#f3f3f3',  //ステージの背景色
        wireframes: false  //ワイヤーフレームモードをオフ
      }
  });

  //四角のオブジェクト作成
  var portfolio = Bodies.rectangle(500, 100, 600, 120, {
    restitution: 0.3,
    render: {
      sprite: {
        texture: createString("PORTFOLIO",'1250', '220', 600, 160, "100pt Impact", "#ff6083")
      }
    }
  });

  var name = Bodies.rectangle(200, 20, 180, 33, {
    restitution: 0.3,
    render: {
      sprite: {
        texture: createString("Mako Miyatake",'600', '150', 300, 80, "20pt fantasy", "dimgray")
      }
    }
  });
  //円のオブジェクト作成
  // create renderer
  var circle1 = Bodies.circle(400, 0, 30, {
    restitution: 0.5
  });

  var circle2 = Bodies.circle(80, 0, 20, {
    restitution: 0.5
  });

  var circle3 = Bodies.circle(360, 10, 25, {
    restitution: 0.5
  });
  //床
  var ground = Bodies.rectangle(400,250,800,1, {
    isStatic: true
  });

  // World.add(world, [  //作成した図形をステージに追加して描画する？
  //     portfolio,
  //     circle1,
  //     circle2,
  //     circle3,
  //     name,
  //     ground
  //     // portfolio
  // ]);
  // Render.run(render);  //ステージを配置させる記述？
  //
  // // create runner
  // var runner = Runner.create();
  // Runner.run(runner, engine);  //物理エンジンを実行？

  new Chart(document.getElementById("myChart"), {
    type: "doughnut",
    data: {
      labels: ["Robot", "IoT", "Design", "Computer Vision","Web"],
      datasets: [
        {
          data: [10, 6, 5, 3,3],
          backgroundColor: [
            'cornflowerblue', 'lightseagreen', 'hotpink', 'sandybrown', 'indianred'
          ]
        }
      ]
    }
  });
});
