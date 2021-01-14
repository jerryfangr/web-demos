!function () {
  var code_part1 = `  /**
   * 你好，我是xx
   * 我将以动画的形式，逐字渲染简历
   * 首先需要一些基本的样式
   */

  /* 先让渲染过程都尽量展现 */
   * {
    transition: all 1s;
  }

  /* 来个背景色 */
  html {
    background: #dedede;
  }

  /* 边框 */
  #codeTag {
    border: 1px solid #f00;
    padding: 16px;
  }

  /* 来点代码高亮 */
  .token.comment {
    color: #708090;
  }
  .token.selector {
    color: #690;
  }
  .token.property {
    color: #905;
  }
  .token.punctuation {
    color: #00fd00;
  }

  /* 差不多了，下面简单介绍下我自己 */
  `
  var code_part2 = `
  
  `


  var codeIndex = 0;
  var renderCode = ''
  var styleElem = document.querySelector('#styleTag')
  var codeElem = document.querySelector('#codeTag')

  debugModel(80)
  var timer = setInterval(() => {
    renderCode += code_part1[codeIndex]
    styleElem.innerHTML = renderCode
    codeElem.innerHTML = codeIndex < code_part1.length - 170 ?
                          renderCode:
                          Prism.highlight(renderCode, Prism.languages.css, 'css')
    if (++codeIndex >= code_part1.length) {
      clearInterval(timer)
    }
    
  }, 40)


  function debugModel (percent) {
    let n = (percent / 100 * code_part1.length) | 0
    codeIndex = n
    renderCode = code_part1.substring(0, n)
  }

}.call();