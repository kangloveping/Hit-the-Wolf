$(function () {
    // 1.监听游戏规则的点击
    $(".rules").click(() => {
        $(".rule").stop().fadeIn(100);
    });
    // 2.监听游戏规则关闭
    $(".close").click(() => {
        $(".rule").stop().fadeOut(100);
    });
    // 3.监听开始游戏按钮点击
    $(".star").click(() => {
        // console.log(this);
        $(".star").stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 调用灰太狼动画的方法
        starWolf();

    })
    // 4.监听重新开始按钮点击
    $(".reStar").click(() => {
        $(".mask").stop().fadeOut(100);
        // 分数清0
        $(".score").text(0);
        // 调用动画
        progressHandler();
        starWolf();
    })
});
// 定义处理进度条的方法
function progressHandler() {
    // 重新设置进度条长度
    $(".progress").css({ width: 180 });
    // 设置进度条动画
    $(".progress").animate({ width: 0, }, 20000, function () {
        $(".mask").stop().fadeIn(100);
        // 调用关闭灰太狼动画
        stopWolf();
    });
}
// 定义灰太狼动画的方法
function starWolf() {
    // 1.定义两个数组保存所有灰太狼和小灰灰的图片
    wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
    wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];
    // 2.定义一个数组保存所有可能出现的位置
    var wolfPos = [
        { left: "100px", top: "115px" },
        { left: "20px", top: "160px" },
        { left: "190px", top: "142px" },
        { left: "105px", top: "193px" },
        { left: "19px", top: "221px" },
        { left: "202px", top: "212px" },
        { left: "120px", top: "275px" },
        { left: "30px", top: "295px" },
        { left: "209px", top: "297px" }
    ];
    // 3.创建一个图片
    $wolfImg = $("<image src='' class='wolfImg'>");
    // 获取图片的随机位置
    var posIndex = Math.floor(Math.random() * 9);
    // 4.设置图片显示的位置
    $wolfImg.css({
        position: "absolute",
        left: wolfPos[posIndex].left,
        top: wolfPos[posIndex].top,
    })
    // 获取图片的随机内容
    wolf = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
    // 图片索引0-5
    wolfIndex = 0;
    wolfIndexEnd = 5;
    // 图片定时变化
    wolfTimer = setInterval( () =>{
        // 5.设置图片的内容
        $wolfImg.attr("src", wolf[wolfIndex]);
        wolfIndex++;
        // 动画共播放5张图片，移除图片和计时器，重新播放下一组动画
        if (wolfIndex > wolfIndexEnd) {
            $wolfImg.remove();
            clearInterval(wolfTimer);
            starWolf();
        }
        
    }, 300)

    // 6.将图片放到界面上
    $(".container").append($wolfImg);
    // 7.调用分数奖励与惩罚的方法
    gameRules($wolfImg);
}
// 定义关闭灰太狼动画的方法
function stopWolf() {
    $(".wolfImg").remove();
    clearInterval(wolfTimer);
}
// 定义击打效果、分数奖励与惩罚的方法
function gameRules($wolfImg) {
    $wolfImg.one("click", () => {
        // 修改图片索引6-9
        wolfIndex = 6;
        wolfIndexEnd = 9;
        // 判断图片类型实现分数加减
        if (wolf == wolf_1) {
            //+10， parseInt用来转化为10进制
            $(".score").text(parseInt($(".score").text()) + 10);
        } else {
            // -10
            $(".score").text(parseInt($(".score").text()) - 10);
        }
    })
} 