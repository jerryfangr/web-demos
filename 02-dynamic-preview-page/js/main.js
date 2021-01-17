!function () {
  var code_part1 = `  /**
   * 你好，我是xx
   * 我将以动画的形式，逐字渲染简历
   * 首先需要一些基本的样式
   */

  /* 先让渲染过程都尽量展现 */
   * {
    margin: 0;
    transition: all 1s;
  }

  /* 来个基础背景配置 */
  html {
    background: #dedede;
    font-size: 18px;
  }

  /* 来个边框 */
  #codeTag {
    border: 1px solid #f00;
    padding: 16px;
  }

  /* 再来点代码高亮 */
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
    color: #0000fd;
  }
  `
  var code_part2 = `
  /* 差不多了，下面简单介绍下我自己 */

  /* 先来个书写的白纸 */
  #paper {
    position: fixed;
    top: 0;
    right: 0;
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    background: #fff;
    border: 10px solid #000;
    padding: 16px;
  }
  #paper > .content {
    height: 100%;
  }
  `

  var md = `
  # 自我介绍

  * **我叫xxx，**
  * **出生于 1990年 1 月**
  * **xxx学校毕业**
  * 期望职位方向：前端开发
  
  # 技能介绍

  * **熟悉JavaScript、css、html**

  # 联系方式

  | 方式 | 详情 |
  | ---- | ---- |
  | 邮箱 | xxx@mail.com |
  | 电话 | xxxxxxxxxx |
  `

  var styleElem = document.querySelector('#styleTag')
  var codeElem = document.querySelector('#codeTag')
  wirteCode({ // 第一部分 设定背景
    precode: '',
    code: code_part1,
    styleDom: styleElem,
    codeDom: codeElem,
    speedDelay: 30,
    // debugModel(percent) {
    //   let n = (percent / 100 * this.code.length) | 0
    //   this.codeIndex = n
    //   this.renderCode += this.code.substring(0, n)
    // }
  }, () => { // 第二部分 创建白纸
      addPaper()
      wirteCode({ // 第三部分 往白纸写markdown介绍
        precode: code_part1,
        code: code_part2,
        styleDom: styleElem,
        codeDom: codeElem,
        speedDelay: 30,
      }, () => {
        wirteMarkdown(md, document.querySelector('#paper > .content'), () => {
          // 第四部分 markdown 转成html，marked.js
          // 第五部分最后，创建收尾样式
        })
      })
    }
  )

  
  function wirteCode (options, callback) {
    options.codeIndex = 0
    options.renderCode = options.precode
    options.debugModel && options.debugModel(100)
    var timer = setInterval(() => {
      options.renderCode += options.code[options.codeIndex]
      options.styleDom.innerHTML = options.renderCode
      options.codeDom.innerHTML = Prism.highlight(options.renderCode, Prism.languages.css, 'css')
      // options.codeDom.scrollTo(0, options.codeDom.scrollHeight)
      options.codeDom.scrollTop = options.codeDom.scrollHeight
      if (++options.codeIndex >= options.code.length) {
        clearInterval(timer)
        callback && callback(options)
      }
    }, options.speedDelay)
  }

  function wirteMarkdown (content, paperDom, callback) {
    var codeIndex = 0
    var renderCode = ''
    var timer = setInterval(() => {
      renderCode += content[codeIndex]
      paperDom.innerHTML = Prism.highlight(renderCode, Prism.languages.markdown, 'markdown')
      paperDom.scrollTo(0, paperDom.scrollHeight)
      if (++codeIndex >= content.length) {
        clearInterval(timer)
        callback && callback()
      }
    }, 30)
  }

  function addPaper() {
    var paper = document.createElement('div')
    var paperContent = document.createElement('pre')
    paper.id = 'paper'
    paperContent.className = 'content'
    paper.appendChild(paperContent)
    document.body.appendChild(paper)
  }


}.call();