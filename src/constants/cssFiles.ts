const variables = `
:root {
  /* 常用色號 */
  --light: #fff;
  --dark: #000000;
  --pink: #ff1b9a;
  --red: #ff0000;
  --blue: #0000FF;
  --gray: #868686;
  --yellow: #fde49c;
  --brown: #753704;
  --orange: #fc9d00;
  --purple: #800080;
  --green: #658e35;

  /* 特殊色號 */
  --special-red: #d9564f;
  --light-second: #e0e0e0;
  --light-green: #5dd74d;
  --blue-second: #379cc6;
  --title-blue: #4EA1E9;
  /*
  若要新增可在自行增加
  格式: 
  --自定義名稱: 色碼 ;
  */

  /* ----------字體--------------- */
  --font-family: 'Noto Sans TC', 'Roboto', 'Arial', 'Source Sans 3', sans-serif;

  /* 文字大小 */
  /* 基礎值為16px */
  --fs-normal: 16px;
  /* 16 * 2.5  = 40*/
  --fs-xxl: calc(var(--fs-normal) *2.5);
  /* 16 * 2.25 = 36*/
  --fs-xl: calc(var(--fs-normal) *2.25);
  /* 16 * 2    = 32 */
  --fs-l: calc(var(--fs-normal) *2);
  /* 16 * 1.75 = 28 */
  --fs-m: calc(var(--fs-normal) *1.75);
  /* 16 * 1.5  = 24 */
  --fs-s: calc(var(--fs-normal) *1.5);
  /* 16 * 1.25  = 20 */
  --fs-xs: calc(var(--fs-normal) *1.25);
  /* 16 * 0.75  = 12*/
  --fs-xxs: calc(var(--fs-normal) *.75);

  /* 特殊字距 */
  /* 16 * 3.5 = 56*/
  --fs-big: calc(var(--fs-normal) *3.5);
  /* 16 * 1.6  = 25.6 */
  --fs-s-big: calc(var(--fs-normal) *1.6);
  /* 16 * 1.4  = 22.4 */
  --fs-xs-big: calc(var(--fs-normal) *1.4);
  /* 16 * 1.15  = 18.4 */
  --fs-normal-big: calc(var(--fs-normal) *1.15);
  /*
 如果上述太過複雜，可自行調整 
 EX: --fs-xxl: 40px; (以此類推)
 */
  /* 文字粗體 */
  --fw-600: 600;
  --fw-500: 500;
  --fw-400: 400;
}

/* 如何導入上方總設定內容 ??
跟一般寫CSS差不多，在css樣式的值，使用 【 var(自定義設定) 】即可
EX: 
.text{
  color: var(--light)
  }
  */
`
const normal = `
body {
  padding: 0;
  margin: 0;
  font-family: var(--font-family);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
  transition: all 0.3s;
  color: unset;
}

a:hover {
  opacity: 0.7;
}

a:visited {
  color: unset;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* 以上基本設定 */
hr {
  margin: var(--fs-l) 0;
}

.CP {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border-left: var(--light-second) solid thin;
  border-right: var(--light-second) solid thin;
  line-height: 2em;
}

#title {
  margin: 20px 0;
  text-align: start;
}

.headline {
  font-size: var(--fs-s);
  font-weight: 500;
  line-height: var(--fs-xxl);
  border-left: 8px solid;
  border-bottom: 2px solid;
  border-color: #ff448f;
  padding-left: 2%;
  margin-bottom: 20px;
}

.brSP {
  display: block;
}

@media screen and (min-width: 768px) {
  .CP {
    padding: 50px 100px;
  }

  #title {
    margin: 40px 0;
  }

  .headline {
    font-size: var(--fs-m);
    border-left: 12px solid;
  }

  .brSP {
    display: none;
  }
}

`

const header = `
/*------------------------------------*    $標題區塊
*------------------------------------*/
nav {
    background-color: var(--pink);
    width: 100%;
    position: sticky;
    top: 0;
    box-shadow: var(--brown) 0px 0px 10px;
}

.navList {
    max-width: 1000px;
    padding: 0 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navTitle {
    color: var(--brown);
    font-size: var(--fs-s);

}

.navLinkGroup {
    display: flex;
    justify-content: flex-end;
    gap: 2.5%;
    width: 50%;
}

.navItem {

    letter-spacing: 3px;
    padding: 0.7em 0;
}


@media (max-width:768px) {
    nav {
        display: none;
    }
}`

const text = `
#title_s {
    display: inline-block;
    background-color: var(--dark);
    color: var(--light);
    margin-bottom: 12px;
    font-weight: 400;
    font-size: var(--fs-normal);
    padding: 0 20px;
    line-height: 35px;
}

#title_l {
    font-size: var(--fs-s-big);
    line-height: var(--fs-xl);
    text-align: center;
    margin: 3rem auto;
}

#title_date {
    color: var(--dark);
    font-weight: 400;
    font-size: var(--fs-xxs);
    text-align: right;
}

b {
    font-size: var(--fs-xxs-big);
    font-weight: 500;
    line-height: var(--fs-xxl);
}

p {
    font-size: var(--fs-normal-big);
    font-weight: var(--fw-400);
    line-height: var(--fs-l);
    /* 若是英文版請將 text-align: justify; 註解掉*/
    text-align: justify;
    margin: 0.25rem;
}

.txt-big {
    font-size: var(--fs-m);
}

.txt-xl {
    font-size: var(--fs-xs-big);
}

.txt-l {
    font-size: var(--fs-xs);
}

.txt-xs {
    font-size: var(--fs-normal);
}

.txt-xxs {
    font-size: var(--fs-xxs);
}

.txt-bold {
    font-weight: bold;
}

.txt-weight-500 {
    font-weight: var(--fw-500);
}

@media (min-width:768px) {
    #title_s {
        font-size: var(--fs-xs);
        padding: 0 28px;
        line-height: var(--fs-xxl);
    }

    #title_l {
        font-size: var(--fs-xl);
        line-height: var(--fs-big);
    }

    #title_date {
        font-size: var(--fs-normal);
    }

    .txt-big {
        font-size: var(--fs-l);
    }

    .txt-xl {
        font-size: var(--fs-m);
    }

    .txt-l {
        font-size: var(--fs-s);
    }

    .txt-xs {
        font-size: var(--fs-xs);
    }

    .txt-xxs {
        font-size: var(--fs-normal);
    }

}

.text-align-center {
    text-align: center;
}

.text-align-right {
    text-align: right;
}

.text-align-justify {
    text-align: justify;
}

.text-highlight {
  background-color: yellow;
  color: black;
}

.text-red {
  color: red;
}

.text-blue {
  color: blue;
}
`

const offer = `
/* 按鈕閃光 S */
.light {
  width: 100%;
  text-align: center;
  font-size: 2rem;
  overflow: hidden;
  display: block;
  position: relative;
}

.light:after {
  content: "";
  display: block;
  position: absolute;
  left: -150%;
  top: 0;
  width: 50%;
  height: 100%;
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 100%);
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-transform: skewX(-25deg);
  transform: skewX(-25deg);
  animation: light 3s infinite ease-in-out;
}

@keyframes light {
  0% {
    left: -150%;
  }

  70% {
    left: 150%;
  }

  100% {
    left: 150%;
  }
}

/* 按鈕跳動-果凍 */
.bounce {
  animation: bounce 2s infinite ease-in-out;
}

@keyframes bounce {
  0% {
    transform: scale(1, 1) translate3d(0, 0, 0);
  }

  10% {
    transform: scale(1.05, .95) translate3d(0, 0, 0);
  }

  30% {
    transform: scale(.95, 1.05) translate3d(0, -8%, 0);
  }

  50% {
    transform: scale(1.02, .97) translate3d(0, 0, 0);
  }

  57% {
    transform: scale(1, 1) translate3d(0, -2%, 0);
  }

  64% {
    transform: scale(1, 1) translate3d(0, 0, 0);
  }

  100% {
    transform: scale(1, 1) translate3d(0, 0, 0);
  }
}

/* 放大縮小 */
.shrink {
  animation: shrink 2s infinite linear;
}


@keyframes shrink {
  0% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.05, 1.05);
  }

  100% {
    transform: scale(1, 1);
  }
}

/* 漂浮 */
.float {
  animation: float 1.5s infinite ease-in-out alternate;
}

@keyframes float {
  0% {
    transform: translateY(-10px)
  }

  100% {
    transform: translateY(10px);
  }
}

.offerBtn {
  transition: all .3s;
}

.offerBtn:hover {
  opacity: 0.9;
}
`

const other = `
.top_mark {
  font-family: "Noto Serif";
  padding: 2.5rem 0;
  border-width: 0 0 0 0;
  border-style: solid;
  border-color: black;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #000;
  color: #fff;
  font-weight: 700;
}

.title_main {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 3rem;
}

.title-menu {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.2em;
  text-align: center;
}

.video-container {
    position: relative;
    width: 100%;
    top: 50%;
    left: 0%;
    padding-bottom: 56.25%;
    padding-top: 0px;
    height: 0;
    overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media screen and (min-width: 768px) {
  .top_mark {
    padding: 2rem 0;
  }

  .title_main {
    font-size: 3.5rem;
    line-height: 6rem;
  }

  .title-menu {
    font-size: 1.5rem;
  }
}

`

export const cssFiles = [
  { filename: "variables.css", content: variables },
  { filename: "normal.css", content: normal },
  { filename: "header.css", content: header },
  { filename: "text.css", content: text },
  { filename: "offer.css", content: offer },
  { filename: "other.css", content: other },
];