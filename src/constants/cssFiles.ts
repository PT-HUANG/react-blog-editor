const variables = `
:root {
  /* 常用色號 */
  --light:  #fff;
  --dark:   #000000;
  --pink:   #ff1b9a;
  --red:    #ff0000;
  --blue:   #0000FF;
  --gray:   #868686;
  --yellow: #fde49c;
  --brown:  #753704;
  --orange: #fc9d00;
  --purple: #800080;
  --green: #658e35;
  
  /* 特殊色號 */
  --special-red:  #d9564f;
  --light-second: #e0e0e0;
  --light-green: #5dd74d;
  --blue-second:  #379cc6;
  --title-blue:   #4EA1E9;
  /*
  若要新增可在自行增加
  格式: 
  --自定義名稱: 色碼 ;
  */
 
 /* ----------字體--------------- */
 --fs-family-secondary: 'Noto Serif JP', serif;
 /* 文字大小 */
 /* 基礎值為16px */
 --fs-normal: 16px;
 /* 16 * 2.5  = 40*/
 --fs-xxl: calc(var(--fs-normal) *2.5);
 /* 16 * 2.25 = 36*/
 --fs-xl:  calc(var(--fs-normal) *2.25);
 /* 16 * 2    = 32 */
 --fs-l:   calc(var(--fs-normal) *2);
 /* 16 * 1.75 = 28 */
 --fs-m:   calc(var(--fs-normal) *1.75);
 /* 16 * 1.5  = 24 */
 --fs-s:   calc(var(--fs-normal) *1.5);
 /* 16 * 1.25  = 20 */
 --fs-xs:  calc(var(--fs-normal) *1.25);
 /* 16 * 0.75  = 12*/
 --fs-xxs: calc(var(--fs-normal) *.75);
 
 /* 特殊字距 */
 /* 16 * 3.5 = 56*/
 --fs-big: calc(var(--fs-normal) *3.5);
 /* 16 * 1.6  = 25.6 */
 --fs-s-big:  calc(var(--fs-normal) *1.6);
 /* 16 * 1.4  = 22.4 */
 --fs-xs-big:  calc(var(--fs-normal) *1.4);
 /* 16 * 1.15  = 18.4 */
 --fs-normal-big:  calc(var(--fs-normal) *1.15);
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
const normal = `/* 導入【思源黑體】 */
body {
    padding: 0;
    margin: 0;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", Roboto, "Helvetica Neue", Arial, sans-serif; */
    font-family: 'Noto Sans TC', sans-serif;
}

img {
    max-width: 100%;
    height: auto;
    /* vertical-align: middle; */
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
    transition: all .3s;
}

a:hover {
    opacity: .7;
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

/*------------------------------------*\
    $整體板塊
\*------------------------------------*/



.CP {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 100px;
    border-left: var(--light-second) solid thin;
    border-right: var(--light-second) solid thin;
    line-height: 2em;
}

#title {
    margin: 40px 0;
    text-align: start;
}

#title hr {
    margin-top: 16px;
}

.part p {
    margin-bottom: 40px;
}


.center {
    text-align: center;
    margin: 0 auto;
}

.headline {
    font-size: var(--fs-m);
    font-weight: 500;
    line-height: var(--fs-xxl);
    border-left: 12px solid;
    border-bottom: 2px solid;
    border-color: #ff448f;
    padding-left: 2%;
    margin-bottom: 20px;
}

.w-full {
    width: 100%;
}

.video_box {
    position: relative;
    margin: 30px 0 30px 0;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}

.video_box iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.brSP{display: none;}
@media screen and (max-width: 768px) {
    .brSP{
        display: block;
    }
    .CP {
        padding: 0 20px;
    }

    #title {
        margin: 20px 0;
        text-align: start;
    }

    .part p {
        margin-bottom: 20px;
    }

    .headline {
        font-size: var(--fs-s);
        font-weight: 500;
   
        border-left: 8px solid;
        border-bottom: 2px solid;
        border-color: #ff448f;
  
    }
}`

const header = `/*------------------------------------*\
    $標題區塊
\*------------------------------------*/


nav {
    background-color: var(--pink);
    width: 100%;
    position: sticky;
    top: 0;
    box-shadow: var(--brown) 0px 0px 10px;
}

.navList{
    max-width: 1000px;
    padding: 0 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navTitle{
    color: var(--brown);
    font-size: var(--fs-s);

}
.navLinkGroup{
    display: flex;
    justify-content: flex-end;
    gap: 2.5%;
width: 50%;
}

.navItem{

    letter-spacing: 3px;
    padding: 0.7em 0;
}


@media (max-width:768px) {
    nav {
        display: none;
    }
}`

const text = `#title_s {
    display: inline-block;
    background-color: var(--dark);
    color: var(--light);
    padding: 0 28px;
    margin-bottom: 12px;
    font-size: var(--fs-xs);
    font-weight: 400;
    line-height: var(--fs-xxl);
}

#title_l {
    font-size: var(--fs-xl);
    line-height: var(--fs-big);
    font-family: var(--fs-family-secondary);
    color: var(--purple);
    text-align: center;
    margin: 3rem auto;
}

#title_date {
    color: var(--dark);
    font-weight: 400;
    font-size: var(--fs-normal);
    text-align: right;
}

b {
    font-size: var(--fs-xxs-big);
    font-weight: 500;
    line-height: var(--fs-xxl);
}

p {
    font-size: var(--fs-normal-big);
    font-weight: 300;
    line-height: var(--fs-l);
    margin: 0.25rem;
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

.txt-bold {
    font-weight: bold;
}

.txt-weight-500 {
    font-weight: var(--fw-500);
}

@media (max-width:768px) {
    #title_s {
        font-size: var(--fs-normal);
        padding: 0 20px;
        line-height: 35px;
    }

    #title_l {
        font-size: var(--fs-s-big);
        line-height: var(--fs-xl);
    }

    #title_date {
        font-size: var(--fs-xxs);
    }

    p {
        font-size: var(--fs-normal-big);
        text-align: justify;
        font-weight: var(--fw-400);
    }

    .txt-big {
        font-size: var(--fs-m);
    }

    .txt-xl {
        font-size: var(--fs-xs-big);
    }

    .txt-xs {
        font-size: var(--fs-normal);
    }

    .txt-xxs {
        font-size: var(--fs-xxs);
    }

}

/*------------------------------------*\
    $顏色設定
\*------------------------------------*/

.txt-pink {
    color: var(--pink);
}

.txt-red {
    color: var(--red);
}

.txt-blue {
    color: var(--blue);
}

.txt-lightBlue {
    color: var(--blue-second)
}

.txt-gray {
    color: var(--gray);
}

.txt-dark {
    color: var(--dark);
}

.txt-green {
    color: var(--green);
}

.bg-yellow {
    background: var(--yellow);
}

.bg-pink {
    background: var(--pink);
    color: var(--light);
}

.bg-blue {
    background: var(--blue);
    color: var(--light);
}

.bg-red {
    background: var(--special-red);
    color: var(--light);
}`

const offer = `.Link {
    transition: 0.8s;
}

.Link span {
    position: relative;
    display: block;
    overflow: hidden;
    padding: 15px 20px;
    /* border-radius: 15px; */
}`

const other = `/*------------------------------------*\
    CTA
\*------------------------------------*/


/* 按鈕動畫 */

@keyframes hoverAnim {
    0% {
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
    }

    30% {
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    100% {
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }
}

.Link {
    transition: 0.8s;
}

.Link span {
    position: relative;
    display: block;
    overflow: hidden;
    padding: 15px 20px;
    /* border-radius: 15px; */
}

.Link span:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(124deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 40%, rgba(255, 255, 255, 0.75) 50%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%);
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    pointer-events: none;
    animation-name: hoverAnim;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@media screen and (max-width: 640px) {
    .Link span:after {
        animation-duration: 4s;
    }
}

@keyframes shakeX {

    0%,
    100% {
        transform: translateX(0px);
    }

    10%,
    30%,
    50%,
    70%,
    90% {

        transform: translateX(-10px);
    }

    20%,
    40%,
    60%,
    80% {

        transform: translateX(10px);
    }
}

@keyframes titleBox {
    0% {
        transform: translateX(0);
    }

    6.5% {
        transform: translateX(-6px) rotateY(-9deg);
    }

    18.5% {
        transform: translateX(5px) rotateY(7deg);
    }

    31.5% {
        transform: translateX(-3px) rotateY(-5deg);
    }

    43.5% {
        transform: translateX(2px) rotateY(3deg);
    }

    50% {
        transform: translateX(0);
    }
}

@media (max-width:768px) {

    @keyframes shakeX {

        0%,
        100% {
            transform: translateX(0px);
        }

        10%,
        30%,
        50%,
        70%,
        90% {

            transform: translateX(-5px);
        }

        20%,
        40%,
        60%,
        80% {

            transform: translateX(5px);
        }
    }


}

.CTA-BTN {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5%;
    margin-bottom: 5%;
}

.CTA-BTN img {
    width: 15%;
    animation: shakeX 2s infinite ease-in-out;
}

.titleBox {
    background-color: var(--light-green);
    color: var(--light);
    padding: 5% 10%;
    border-radius: 10px;
    font-size: var(--fs-s);
    animation: titleBox 2s infinite ease-in-out;
}

@media (max-width:768px) {
    .titleBox {

        padding: 5% 8%;
        border-radius: 10px;
        font-size: var(--fs-normal-big);
    }

}


.CTA_Link {
    display: inline-block;
    background-color: #ff0000;
    color: #fff;
    font-size: var(--fs-s);
    font-weight: var(--fw-600);
    transition: all 0.3s;
    position: relative;
    border-radius: 15px;
}

.CTA_Link::after {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    bottom: 0%;
    left: 5%;
    width: 90%;
    height: 15px;
    opacity: 0;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    transition: all 0.3s;
}

.CTA_Link:hover {
    transform: translateY(-15px);
}

.CTA_Link:hover::after {
    opacity: 1;
    transform: translateY(25px);
}

.caption {
    margin-top: 5px;
    margin-bottom: 40px;
}

.before-hr {
    border-bottom: #FF6699 3px solid;
}

.blueLink {
    color: blue;
    text-decoration: underline;
}

.pinkLink {
    color: #FF6699;
    text-decoration: none;
}

.blackLink {
    color: var(--dark);
}

.part5 {
    position: relative;
}

.pinkbtn {
    margin-left: 10%;
    width: 50%;
    height: 50%;
}

.bounce {
    animation: bounce 1s infinite ease-in-out;
}

@keyframes bounce {
    0% {
        transform: scale(1, 1) translate3d(0, 0, 0);
    }

    25% {
        transform: scale(1.05, 1.05) translate3d(0, 0, 0);
    }

    50% {
        transform: scale(1.5, 1.5) translate3d(0, 0, 0);
    }

    50% {
        transform: scale(1.05, 1.05) translate3d(0, 0, 0);
    }

    100% {
        transform: scale(1, 1) translate3d(0, 0, 0);
    }
}

/* @keyframes bounce {
    0% {
        transform: scale(1, 1) translate3d(0, 0, 0);
    }
    10% {
        transform: scale(1.05, .95) translate3d(0, 0, 0);
    }
    30% {
        transform: scale(.95, 1.05) translate3d(0, 0, 0);
    }
    50% {
        transform: scale(1.02, .97) translate3d(0, 0, 0);
    }
    57% {
        transform: scale(1, 1) translate3d(0, 0, 0);
    }
    64% {
        transform: scale(1, 1) translate3d(0, 0, 0);
    }
    100% {
        transform: scale(1, 1) translate3d(0, 0, 0);
    }
} */


.video-container {
    position: relative;
    padding-bottom: 56.25%;
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

@media (max-width:768px) {
    .CTA_Link {
        font-size: var(--fs-xs);
    }
}

.cp_img {
    width: 80%;
    margin: 2rem 0;
}

@media (max-width:768px) {
    .cp_img {
        width: 100%;
    }
}


.d-flex {
    display: flex;
}

.img_04 {
    width: 60%;
}

.img_05 {
    width: 40%;
}

.img_06 {
    width: 50%;
}

.img_07 {
    width: 50%;
}

.shrink {
    animation: shrink 2s infinite linear;
}

.shrink2 {
    animation: shrink 2s 0.5s infinite linear;
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
}`

export const cssFiles = [
  { filename: "variables.css", content: variables },
  { filename: "normal.css", content: normal },
  { filename: "header.css", content: header },
  { filename: "text.css", content: text },
  { filename: "offer.css", content: offer },
  { filename: "other.css", content: other },
];