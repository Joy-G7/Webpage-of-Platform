var ip = ["192.168.8.19", "192.168.8.101", "192.168.8.102", "192.168.8.103", "192.168.8.104", "192.168.8.105"];
var ipname = ["遥感卫星:Tx2", "计算卫星1", "计算卫星2", "计算卫星3", "计算卫星4", "计算卫星5"];
var cpuinfo = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var raminfo = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var gpuinfo = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var numinfoT2 = [0, 0, 0, 0, 0, 0, 0, 0];
var numinfoT3 = [0, 0, 0, 0, 0, 0, 0, 0];
var numip = ["192.168.8.19", "192.168.8.105", "192.168.8.104", "192.168.8.103", "192.168.8.102", "192.168.8.101", ""];
var numipname = ["遥感卫星:Tx2", "计算卫星5", "计算卫星4", "计算卫星3", "计算卫星2", "计算卫星1", "地面云"];
var numsum = [0];
var TX2cpu = [0];
var TX2ram = [0];
var TX2gpu = [0];
var cpuinfonew = [0.0, 0.0, 0.0, 0.0, 0.0];
var raminfonew = [0.0, 0.0, 0.0, 0.0, 0.0];
var gpuinfonew = [0.0, 0.0, 0.0, 0.0, 0.0];
var ipnamenew = ["卫星1", "卫星2", "卫星3", "卫星4", "卫星5"];
var countrecog = 0;

//容器数量求和
function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);

    return s;
};
//ram,cpu柱状图取数据
/* $.ajaxSettings.async = false; */



function getchart() {
    var cpunum = new Array(); //cpu数值
    var cpuip = new Array();
    var ramnum = new Array(); //ram数值
    var ramip = new Array();
    var gpunum = new Array(); //ram数值
    var gpuip = new Array();
    /* -----------------------------------获得并处理cpu数据 =-----------------------------*/
    $.ajaxSettings.async = false;

    $.ajax({
        url: "http://192.168.8.101:8080/jsp/getCpuMap", //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: false, //是否异步，默认true
        success: function(data) {
            var map = data.data;
            for (var key in map) {
                cpuip.push(key);
                cpunum.push(map[key]);
            }

        }, //请求成功之后要做的事
        error: function() {
                console.log('error: cannot connect CPU data');
                errorcount++;
            } //请求失败
    });
    var countold = 0;
    var countnew = 0;
    for (i = 0; i < ip.length; i++) {
        if (cpuinfo[i] == 0) {
            countold++;
        } else {}
    } //计数cpu
    for (i = 0; i < ip.length; i++) {
        cpuinfo[i] = 0.0;
        cpuinfonew[i] = 0.0;
    } //归零
    for (i = 0; i < cpuip.length; i++) {
        for (j = 0; j < ip.length; j++) {

            if (ip[j] == cpuip[i]) {
                cpuinfo[j] = cpunum[i];
            } else {}
        }
    } //整理cpu数据
    TX2cpu[0] = cpuinfo[0];
    cpuinfonew = cpuinfo.slice(1);
    console.log('cpu:' + cpuinfo);

    for (i = 0; i < ip.length; i++) {
        if (cpuinfo[i] == 0.0) {
            cpuinfo[i] = 0.0;
            countnew++;
        } else {}
        //0赋值0.00001
    } //计数新cpu
    if (countold < countnew) {
        ChartCPU.clear();
    } else {


    } //比较新旧，不一样就刷新

    $.ajaxSettings.async = true;
    /* -----------------------------------获得并处理gpu数据 =-----------------------------*/
    $.ajaxSettings.async = false;

    $.ajax({
        url: "http://192.168.8.101:8080/jsp/getGpuMap", //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: false, //是否异步，默认true
        success: function(data) {
            var map = data.data;
            for (var key in map) {
                gpuip.push(key);
                gpunum.push(map[key]);
            }

        }, //请求成功之后要做的事
        error: function() {
                console.log('error: cannot connect GPU data');
                errorcount++;
            } //请求失败
    });



    var countold2 = 0;
    var countnew2 = 0;
    for (i = 0; i < ip.length; i++) {
        if (gpuinfo[i] == 0) {
            countold2++;
        } else {}
    } //计数gpu
    for (i = 0; i < 6; i++) {
        gpuinfo[i] = 0.0;
        gpuinfonew[i] = 0.0;
    } //归零
    for (i = 0; i < gpuip.length; i++) {
        for (j = 0; j < ip.length; j++) {

            if (ip[j] == gpuip[i]) {
                gpuinfo[j] = gpunum[i];
            } else {}
        }
    } //整理gpu数据
    TX2gpu[0] = gpuinfo[0];
    gpuinfonew = gpuinfo.slice(1);
    console.log('gpu:' + gpuinfo);

    for (i = 0; i < ip.length; i++) {
        if (gpuinfo[i] == 0.0) {
            countnew2++;
        } else {}
    } //计数新gpu
    if (countold < countnew) {
        ChartCPU.clear();
    } else {} //比较新旧，不一样就刷新


    $.ajax({
        url: 'http://192.168.8.101:8080/jsp/getRamMap', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: false, //是否异步，默认true
        success: function(data) {
            var map = data.data;
            for (var key in map) {
                ramip.push(key);
                ramnum.push(map[key]);
            }

        }, //请求成功之后要做的事
        error: function() {
                console.log('error: cannot connect RAM data');
                errorcount++;
            } //请求失败
    });

    var countold3 = 0;
    var countnew3 = 0;
    for (i = 0; i < ip.length; i++) {
        if (raminfo[i] == 0) {
            countold2++;
        } else {}
    } //计数ram
    for (i = 0; i < ip.length; i++) {
        raminfo[i] = 0.0;
        raminfonew[i] = 0.0;
    } //ram归零
    for (i = 0; i < ramip.length; i++) {
        for (j = 0; j < ip.length; j++) {
            if (ip[j] == ramip[i]) {
                raminfo[j] = ramnum[i];
            } else {}
        }
    } //ram数据整理
    TX2ram[0] = raminfo[0];
    raminfonew = raminfo.slice(1);

    for (i = 0; i < ip.length; i++) {
        if (raminfo[i] == 0.0) {
            raminfo[i] == 0.0;
            countnew3++;
        } else {}
    } //计数新gpu
    if (countold < countnew) {
        ChartCPU.clear();
    } else {

    } //比较新旧，不一样就刷新
    $.ajaxSettings.async = true;


}
//容器数量柱状图取数据
var arr_ip = new Array();
var arr_t2 = new Array();
var arr_t3 = new Array();

function getchartnum() {
    $.ajaxSettings.async = false;
    arr_ip = [];
    arr_t2 = [];
    arr_t3 = [];
    $.ajax({
        url: 'http://192.168.8.101:8080/jsp/getFogTypeConutMap', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: false, //是否异步，默认true
        success: function(data) {
            let map2 = [];
            let map = data.data;
            for (var key in map) {
                arr_ip.push(key);
                map2 = map[key];
                type_leng = Object.keys(map2).length;
                if (type_leng == 2) {
                    for (var k in map2) {
                        if (k == 't2') {
                            arr_t2.push(map2[k]);
                        }
                        if (k == 't3') {
                            arr_t3.push(map2[k]);
                        }
                    }
                } else if (type_leng == 1) {
                    for (var k in map2) {
                        if (k == 't2') {
                            arr_t2.push(map2[k]);
                            arr_t3.push(0);
                        }

                        if (k == 't3') {
                            arr_t3.push(map2[k]);
                            arr_t2.push(0);
                        }
                    }
                }
            }
        }, //请求成功之后要做的事
        error: function() {
                console.log('error: cannot connect to container number data');
                errorcountcon++;
            } //请求失败
    });
    numsum = sum(numinfoT2) + sum(numinfoT3);

    for (i = 0; i < numip.length; i++) {
        numinfoT2[i] = 0;
        numinfoT3[i] = 0;
    }

    for (i = 0; i < arr_ip.length; i++) {
        if (arr_ip[i] != numip[0] && arr_ip[i] != numip[1] && arr_ip[i] != numip[2] && arr_ip[i] != numip[3] && arr_ip[i] != numip[4] && arr_ip[i] != numip[5]) {
            numinfoT2[6] += arr_t2[i];
        } else {
            for (j = 0; j < numip.length; j++) {
                if (numip[j] == arr_ip[i]) {
                    numinfoT2[j] = arr_t2[i];
                } else {

                }
            }
        }

    }

    for (i = 0; i < arr_ip.length; i++) {
        if (arr_ip[i] != numip[0] && arr_ip[i] != numip[1] && arr_ip[i] != numip[2] && arr_ip[i] != numip[3] && arr_ip[i] != numip[4] && arr_ip[i] != numip[5] && arr_ip[i] != numip[6]) {
            numinfoT3[6] += arr_t3[i];
        } else {
            for (j = 0; j < numip.length; j++) {
                if (numip[j] == arr_ip[i]) {
                    numinfoT3[j] = arr_t3[i];
                } else {}
            }
        }

    }
    numsum = sum(numinfoT2) + sum(numinfoT3);
    $.ajaxSettings.async = true;
}

function getnumsum() {
    numsum = sum(numinfoT2) + sum(numinfoT3);
    return numsum;
}
$.ajaxSettings.async = true;



$.ajaxSettings.async = false;

var picname = new Array();
var picdata = new Array();

function getmatrixdata() {
    var ajaxbg = $("#background,#progressBar");
    var haship = new Array();
    var hashrateip = new Array();
    var hashname = new Array();
    var hashrate = new Array();
    var data = {
        "data": {

            "192.168.8.102": { "1.tiff": "[[  0.        1.        1.      531.12103 427.15952  -4.0546   19.47199  95.93825]\n [  0.        1.        1.      242.21164 691.45563  38.02477  24.66798 129.23604]\n [  0.        1.        1.      539.26605 547.23419  -5.56154  20.3783   88.19182]\n [  0.        1.        0.97063 731.6214  637.28748  83.23457  19.58486  60.67116]]" },
            "192.168.8.19": { "3.tiff": "[[   0.         1.         1.        98.12181  677.117    249.67792   25.02344  109.85944]\n [   0.         1.         0.99865  511.10367  337.37885  165.67586   38.85008  246.18243]\n [   0.         1.         0.99247  629.68652  729.5979   166.85994   71.33534  430.78748]]" },
            "192.168.8.103": { "2.tiff": "[[  0.        1.        1.      930.4635  677.48492 250.39032  25.59941 114.86284]\n [  0.        1.        1.      801.19775 724.13483 250.74712  23.97013 115.08044]]" },
            "192.168.8.101": { "4.tiff": "[[  0.        1.        1.      241.96532  68.45792  38.58378  25.38796 129.23106]\n [  0.        1.        0.99923 791.22449 463.03867  -5.1362   35.1035  262.06235]\n [  0.        1.        0.98851 730.71039  13.41099  83.11919  17.30263  59.95081]\n [  0.        1.        0.98302  65.63286 559.27148 168.04021  19.85814  63.38918]]" },
            "192.168.8.104": { "5.tiff": "[[  0.        1.        1.      930.94647  53.66616 250.38734  26.68915 118.83772]\n [  0.        1.        1.      802.06506  99.85602 250.75845  26.24396 118.3271 ]\n [  0.        1.        0.99321 804.31909 249.13304 -20.00228  28.4209  123.71875]]" },
            "192.168.8.105": { "6.tiff": "[[  0.        1.        1.      591.49817 560.29211 -15.83049  53.61496 369.1604 ]\n [  0.        1.        1.      717.15601 516.39404 -17.24689  38.32555 284.70688]\n [  0.        1.        1.      229.50484 535.45239 -15.44594  42.18734 282.46243]\n [  0.        1.        1.       98.21828  54.17089 249.93123  27.02156 117.71909]\n [  0.        1.        1.      630.81476 115.34032 164.16954  68.81982 401.65417]\n [  0.        1.        0.98967 333.99719 521.93964 -18.9985   29.9339  270.92346]\n [  0.        1.        0.93463 373.29272 517.85364 -18.23133  31.45301 264.40356]]" }
        },
        "msc": "访问成功",
        "status": true
    }

    setTimeout(function() {
        $("#sectionpicresultleftseperate").hide();
        $("#sectionpicresultright").css("display", "none"); //关掉所有图和矩阵
        $("#gif").show();
        $("#gif").attr("src", "images\\gif\\结果反馈.gif");
        $(".flow").removeClass('yellow');
        $("#sendback,#collectpic").addClass('yellow'); //结果反馈
        $("#hashrate").hide(); //算力值

    }, 0);

    setTimeout(function() {
        jsonmatrixdata = [];
        var jsonmatrixdata = data.data;

        var map = data.data;
        for (var ip in map) {
            hashrateip.push(ip);
            for (var picname in map[ip]) {
                hashname.push(picname);
                hashrate.push(map[ip][picname]);
            }
        };
        for (i = 0; i < hashrateip.length; i++) {
            hashrate[i] = hashrate[i].substring(1, hashrate[i].length - 1);
            hashrate[i] = hashrate[i].split('\n ');
        } //每个ip对应的矩阵数据切分
        var count = 0
        for (i = 0; i < hashrateip.length; i++) {
            for (j = 0; j < hashrate[i].length; j++) {
                hashrate[i][j] = hashrate[i][j].replace(/\s+/ig, "F")
                console.log(hashrate[i][j]);
                hashrate[i][j] = hashrate[i][j].split('F');
                console.log(hashrate[i][j]);
                jsonmatrixdata[count] = {
                    "id": hashrateip[i],
                    "picname": hashname[i],
                    "prob": hashrate[i][j][2],
                    "x": hashrate[i][j][3],
                    "y": hashrate[i][j][4],
                    "angle": hashrate[i][j][5],
                    "width": hashrate[i][j][6],
                    "length": hashrate[i][j][7],
                };
                count++;
                countrecog = count;

            }
        };
        console.log('识别舰船数：' + countrecog);
        $('#matrixtabledata').bootstrapTable('destroy').bootstrapTable({
            columns: [{
                    field: 'id',
                    title: 'ip',
                    align: 'center'
                }, {
                    field: 'picname',
                    title: '图名',
                    align: 'center',
                }, {
                    field: 'prob',
                    title: '置信度',
                    align: 'center',
                }, {
                    field: 'x',
                    title: 'x坐标',
                    align: 'center',
                },
                {
                    field: 'y',
                    title: 'y坐标',
                    align: 'center',
                },
                {
                    field: 'angle',
                    title: '角度',
                    align: 'center',
                },
                {
                    field: 'width',
                    title: '宽度',
                    align: 'center',
                },
                {
                    field: 'length',
                    title: '长度',
                    align: 'center',
                }
            ],
            data: jsonmatrixdata
        });
        ajaxbg.hide();
        $("#sectionpicresultleftseperate").hide();
        success_prompt("success");
        $("#sectionpicresultleftoriginal2").show(); //显示处理后总图
        $("taskpicstart").attr('disabled', false);
        $("#taskpicstart").removeClass('disabled');


    }, 500);

    $.ajaxSettings.async = true;
}

function getmatrixdatareal() {
    var haship = new Array();
    var hashrateip = new Array();
    var hashname = new Array();
    var hashrate = new Array();
    var ajaxbg = $("#background,#progressBar");


    $.ajax({
        url: 'http://192.168.8.19:8081/hashrate/sendPairHashrate/2', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: true, //是否异步，默认true
        beforeSend: function() {
            $("#taskpicstart").attr('disabled', true); //按钮不可点击
            $("#taskpicstart").addClass('disabled');
            $(".matrix").css("display", "none");
            $(".image").css("display", "none");
            $("#sectionpicresultright").css("display", "none"); //关掉所有图和矩阵
            ajaxbg.show(); //加载中图像
            let input = setTimeout(function() {
                $("#inputpic").addClass('yellow'); //任务输入变红
                $("#gif").show();
                $("#gif").attr("src", "images/gif/任务输入.gif");
            }, 0);

            let request = setTimeout(function() {
                $(".flow").removeClass('yellow');
                $("#requestrate").addClass('yellow'); //请求算力变红

            }, 300);
            let allocate = setTimeout(function() {
                $("#hashrate").html("算力请求值-15TFLOAT"); //算力值
                $("#hashrate").show();
                $(".flow").removeClass('yellow');
                $("#assignrate").addClass('yellow'); //分配算力变红

            }, 500);
            let divide = setTimeout(function() {
                $("#sectionpicresultleftseperate").show();
                $(".flow").removeClass('yellow');
                $("#cutpic").addClass('yellow'); //切图变红
            }, 800);
            let transmit = setTimeout(function() {
                $(".flow").removeClass('yellow');
                $("#sendpic").addClass('yellow'); //子图传送变红
            }, 1000);
            let recognize = setTimeout(function() {
                $(".flow").removeClass('yellow');
                $("#readpic").addClass('yellow'); //子图识别

            }, 1200);

        },
        success: function(data) {

            $("#matrixtab").removeClass('disabled');
            $('#myTab a:last').tab('show');
            $("#xygif").attr("src", "images\\协议结构-静止.jpg");
            success_prompt("success");

            ajaxbg.hide();
            $("#taskpicstart").removeClass('disabled');
            $("#sectionpicresultleftseperate").hide();
            $("#hashrate").hide(); //算力值
            $("#sectionpicresultleftoriginal2").show(); //显示处理后总图
            $("#sectionpicresultright").show(); //显示右侧文字

            var jsonmatrixdata = data.data;
            jsonmatrixdata = [];
            var map = data.data;

            var countdata = 0;

            var picdata;
            for (var ip in map) {
                hashrateip.push(ip);
                for (var picname in map[ip]) {

                    picdata = map[ip][picname];

                    picdata = picdata.substring(1, picdata.length - 1);
                    picdata = picdata.split('\n ');
                    for (i = 0; i < picdata.length; i++) {
                        picdata[i] = picdata[i].replace(/\s+/ig, "F").replace(/\[|]/g, '');
                        picdata[i] = picdata[i].split('F');
                        jsonmatrixdata[countdata] = {
                            "id": ip,
                            "picname": picname,
                            "prob": picdata[i][3],
                            "location": picdata[i][4] + ',' + picdata[i][5],
                            'angle': picdata[i][6],
                            "size": picdata[i][7] + ',' + picdata[i][8],
                        };
                        countdata++;
                        countrecog = countdata;
                    }
                    /*     hashname.push(picname);
                        hashrate.push(map[ip][picname]); */
                }
            };
            console.log('Json数据--------' + JSON.stringify(jsonmatrixdata));
            $('#matrixtabledata').bootstrapTable('refresh');
            $('#matrixtabledata').bootstrapTable('destroy').bootstrapTable({
                striped: true, //是否显示行间隔色
                pageNumber: 1, //初始化加载第一页
                pagination: true, //是否分页
                sidePagination: 'client', //server:服务器端分页|client：前端分页
                sortable: true, //是否启用排序
                bFilter: false,
                bLengthChange: false,
                pageSize: 5, //单页记录数
                pageList: [5],
                showColumns: false, //
                uniqueId: "id", //主键列
                paginationDetailHAlign: ' hidden',
                columns: [{
                        field: 'id',
                        title: 'ip',
                        align: 'center'
                    }, {
                        field: 'picname',
                        title: '图名',
                        align: 'center',
                    }, {
                        field: 'prob',
                        title: '置信度',
                        align: 'center',
                    }, {
                        field: 'location',
                        title: 'x,y坐标',
                        align: 'center',
                    }, {
                        field: 'angle',
                        title: '角度',
                        align: 'center',
                    },
                    {
                        field: 'size',
                        title: '大小',
                        align: 'center',
                    }
                ],
                data: jsonmatrixdata,

            });

        }, //请求成功之后要做的事
        error: function(status) {
            $("#sectionpicresultright").css("display", "none"); //关掉所有图和矩阵
            ajaxbg.hide();
            $("#sectionpicresultleftseperate").hide();
            $("#gif").css("display", "none");
            $("#taskpicstart").attr('disabled', false); //按钮可点击
            $("#taskpicstart").removeClass('disabled');
            console.log("error:" + status);
            warning_prompt("error");
            return false;
        }, //请求失败
        complete: function() {
            //请求完成，loading关闭
            //do something 
            $("#matrixtab").removeClass('disabled');
            ajaxbg.hide();
            $("#gif").css("display", "none");
            $("#taskpicstart").attr('disabled', false);
            $("#taskpicstart").removeClass('disabled');
            $(".flow").removeClass('yellow');
        }
    });
}

function getbuffermatrixdata() {
    var haship = new Array();
    var hashrateip = new Array();
    var hashname = new Array();
    var hashrate = new Array();
    var ajaxbg = $("#background,#progressBar");

    $.ajax({
        url: 'http://192.168.8.19:8081/hashrate/sendPairHashrateBuffer', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: true, //是否异步，默认true 
        showColumns: true,
        beforeSend: function() {

        },
        success: function(data) {

            var jsonmatrixdata = data.data;
            jsonmatrixdata = [];
            var map = data.data;

            var countdata = 0;

            var picdata;
            for (var ip in map) {
                hashrateip.push(ip);
                for (var picname in map[ip]) {

                    picdata = map[ip][picname];

                    picdata = picdata.substring(1, picdata.length - 1);
                    picdata = picdata.split('\n ');
                    for (i = 0; i < picdata.length; i++) {
                        picdata[i] = picdata[i].replace(/\s+/ig, "F").replace(/\[|]/g, '');
                        picdata[i] = picdata[i].split('F');
                        jsonmatrixdata[countdata] = {
                            "ip": ip,
                            "picname": picname,
                            "prob": picdata[i][3],
                            "location": picdata[i][4] + ',' + picdata[i][5],
                            'angle': picdata[i][6],
                            "size": picdata[i][7] + ',' + picdata[i][8],
                        };
                        countdata++;
                        countrecog = countdata;
                    }
                    /*     hashname.push(picname);
                        hashrate.push(map[ip][picname]); */
                }
            };
            console.log('Json数据--------' + JSON.stringify(jsonmatrixdata));
            $('#recog').html('识别舰船总数' + countrecog);
            $('#matrixtabledata').bootstrapTable('refresh');
            $('#matrixtabledata').bootstrapTable('destroy').bootstrapTable({
                striped: true, //是否显示行间隔色
                pageNumber: 1, //初始化加载第一页
                pagination: true, //是否分页
                sidePagination: 'client', //server:服务器端分页|client：前端分页
                sortable: true, //是否启用排序
                pageSize: 6, //单页记录数
                pageList: [6],
                showColumns: false, //
                columns: [{
                        field: 'ip',
                        title: 'ip',
                        align: 'center'
                    }, {
                        field: 'picname',
                        title: '图名',
                        align: 'center',
                    }, {
                        field: 'prob',
                        title: '置信度',
                        align: 'center',
                    }, {
                        field: 'location',
                        title: 'x,y坐标',
                        align: 'center',
                    }, {
                        field: 'angle',
                        title: '角度',
                        align: 'center',
                    },
                    {
                        field: 'size',
                        title: '大小',
                        align: 'center',
                    }
                ],
                data: jsonmatrixdata,

            });

        }, //请求成功之后要做的事
        error: function(status) {

        }, //请求失败
        complete: function() {

        }
    });
}

var imgstlw = 'image://images\\卫星.png';
var imgstlr = 'image://images\\卫星red.png';
var stl2 = {
    name: '计算卫星2',
    x: 150,
    y: 200,

    symbol: imgstlw,
    symbolSize: [100, 59]
};
var stl3 = {
    name: '计算卫星3',
    x: 300,
    y: 35,
    symbol: imgstlw,
    symbolSize: [100, 59]
};
var stl4 = {
    name: '计算卫星4',

    x: 650,
    y: 35,
    symbol: imgstlw,
    symbolSize: [100, 59]
};
var stl5 = {
    name: '计算卫星5',
    x: 850,
    y: 200,
    symbol: imgstlw,
    symbolSize: [100, 59]
};

function updatetopology() {

    stl2.symbol = imgstlw;
    stl3.symbol = imgstlw;
    stl4.symbol = imgstlw;
    stl5.symbol = imgstlw;
    stl2.name = '计算卫星2';
    stl3.name = '计算卫星3';
    stl4.name = '计算卫星4';
    stl5.name = '计算卫星5';
    for (i = 0; i < cpuinfo.length; i++) {
        if (cpuinfo[i] <= 0.0001 && gpuinfo[i] <= 0.0001 && raminfo[i] <= 0.0001) {
            switch (i) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    stl2.name = '卫星2\n 退出';
                    break;
                case 3:
                    stl3.name = '卫星3\n 退出';
                    break;
                case 4:
                    stl4.name = '卫星4\n 退出';
                    break;
                case 5:
                    stl5.name = '卫星5\n 退出';
                    break;
            }
        }
        if (cpuinfo[i] >= 80) {
            switch (i) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    stl2.symbol = imgstlr;
                    warning_prompt('设备2超载');
                    break;
                case 3:
                    stl3.symbol = imgstlr;
                    warning_prompt('设备3超载');
                    break;
                case 4:
                    stl4.symbol = imgstlr;
                    warning_prompt('设备4超载');
                    break;
                case 5:
                    stl5.symbol = imgstlr;
                    warning_prompt('设备5超载');
                    break;
            }
        }

    };

}




function allocatecontainer() {
    $.ajax({
        url: 'http://192.168.8.101:8080/reasoner/47', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: true, //是否异步，默认true
        beforeSend: function() {
            $("#background2,#progressBar2").show();
            $("#taskcontainerstart").attr('disabled', true);
            $("#taskcontainerstart").addClass('disabled');
        },
        success: function(data) {
            success_prompt('success');
            refreshcontainer();
            $("#taskcontainerstart").attr('disabled', false);
            $("#taskcontainerstart").removeClass('disabled');


        }, //请求成功之后要做的事
        error: function() {
            fail_prompt("error");
            $("#background2,#progressBar2").hide();
            $("#taskcontainerstart").attr('disabled', false);
            $("#taskcontainerstart").removeClass('disabled');

        }, //请求失败
        complete: function() {
            //请求完成，loading关闭
            //do something 
            $("#background2,#progressBar2").hide();
            refreshcontainer();
            $("#taskcontainerstart").attr('disabled', false);
            $("#taskcontainerstart").removeClass('disabled');
        }
    });

}

function getpicchart() {

    var ChartPIC = echarts.init(document.getElementById('barchartpic'));
    ChartPIC.clear();
    ChartPIC.setOption(optionpic, true);
    ChartPIC.getZr().off();
    ChartPIC.getZr().on('click', params => {

        /* console.log(params.target.dataIndex); */
        if (params.target != undefined) {
            var index = params.target.dataIndex;
            switch (index) {
                case 0:
                    {
                        $("#matrixsumbox").hide();
                        $("#sectionpicresultleft1").toggle();
                        $("#sectionpicresultleftoriginal2").hide();
                        $("#matrix1box").html(picdata[0]);
                        break;
                    }
                case 1:
                    {
                        $("#matrixsumbox").hide();
                        $("#sectionpicresultleft2").toggle();
                        $("#sectionpicresultleftoriginal2").hide();
                        $("#matrix2box").html(picdata[1]);
                        break;
                    }

                case 2:
                    {
                        $("#matrixsumbox").hide();
                        $("#sectionpicresultleft3").toggle();
                        $("#sectionpicresultleftoriginal2").hide();
                        /* $("#matrix3box").toggle(); */
                        $("#matrix3box").html(picdata[2]);
                        break;
                    }
                case 3:
                    {
                        $("#matrixsumbox").hide();
                        $("#sectionpicresultleft4").toggle();
                        $("#sectionpicresultleftoriginal2").hide();
                        /* $("#matrix4box").toggle(); */
                        $("#matrix4box").html(picdata[3]);
                        break;
                    }
                case 4:
                    {
                        $("#matrixsumbox").hide();
                        $("#sectionpicresultleft5").toggle();
                        $("#sectionpicresultleftoriginal2").hide();
                        /*  $("#matrix5box").toggle(); */
                        $("#matrix5box").html(picdata[4]);
                        break;
                    }
                case 5:
                    {
                        $("#matrixsumbox").hide();
                        $("#sectionpicresultleft6").toggle();
                        $("#sectionpicresultleftoriginal2").hide();
                        /*     $("#matrix6box").toggle(); */
                        $("#matrix6box").html(picdata[5]);
                        break;
                    }
            }
        }

    });
    ChartPIC.getZr().on('mousemove', function(params) {
        var pointInPixel = [params.offsetX, params.offsetY];
        if (ChartPIC.containPixel('grid', pointInPixel)) {
            ChartPIC.getZr().setCursorStyle('pointer');
        };
    });
    ChartPIC.on('mouseout', function(params) {
        var pointInPixel = [params.offsetX, params.offsetY];
        if (!ChartPIC.containPixel('grid', pointInPixel)) {
            ChartPIC.getZr().setCursorStyle('default');
        };
    });
}

$(document).on('click', '#stepall', function() {
    $("#stepgif").attr("src", "images\\分步骤场景gif\\全场景.gif");
    $('#steptext').html('全步骤演示图');
});
$(document).on('click', '#step1', function() {
    $("#stepgif").attr("src", "images\\分步骤场景gif\\step1.gif");
    $('#steptext').html('步骤1图示');
});
$(document).on('click', '#step2', function() {
    $("#stepgif").attr("src", "images\\分步骤场景gif\\step2.gif");
    $('#steptext').html('步骤2图示');
});
$(document).on('click', '#step3', function() {
    $("#stepgif").attr("src", "images\\分步骤场景gif\\step3.gif");
    $('#steptext').html('步骤3图示');
});
$(document).on('click', '#step4', function() {
    $("#stepgif").attr("src", "images\\分步骤场景gif\\step4.gif");
    $('#steptext').html('步骤4图示');
});
$(document).on('click', '#taskcontainerstart', function() {
    info_prompt('start allocation');

    allocatecontainer();
});
$(document).on('click', "#taskprocess", function() { //任务输入按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\架构图.jpg");

});
$(document).on('click', "#inputpic", function() { //任务输入按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\任务输入.gif");

});
$(document).on('click', "#requestrate", function() { //算力请求按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\算力请求.gif");

});
$(document).on('click', "#assignrate", function() { //算力分配按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\算力分配.gif");

});
$(document).on('click', "#cutpic", function() { //图像切分按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\图像切分.gif");


});
$(document).on('click', "#sendpic", function() { //子图传送按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\子图传送.gif");
});
$(document).on('click', "#readpic", function() { //子图目标识别按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\子图目标识别.gif");
});
$(document).on('click', "#sendback,#collectpic", function() { //结果反馈按键
    $("#gif").toggle();
    $("#gif").attr("src", "images\\gif\\结果反馈.gif");
});
var images_result;
$(document).on('click', "#taskpicstart", function() {
    info_prompt("start task");
    $("#xygif").attr("src", "images/协议图gif.gif");
    getmatrixdatareal();
    $('#stkdiv').hide();
    $('#gifdiv').show();

});
$(document).on('click', "#d2cpu", function() {
    if (cpuinfo[ip.indexOf('192.168.8.102')] <= 70 && cpuinfo[ip.indexOf('192.168.8.102')] > 0) {
        $.ajax({
            url: "http://192.168.8.102:8083/start_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星2超载');
                }

            }, //请求成功之后要做的事
            error: function() {
                    info_prompt('超载失败');
                } //请求失败
        });
    } else {
        info_prompt('卫星2已超载或未开启，请勿重复点击');
        console.log('超载' + cpuinfo[ip.indexOf('192.168.8.102')]);
    }



});
$(document).on('click', "#d3cpu", function() {
    if (cpuinfo[ip.indexOf('192.168.8.103')] <= 70 && cpuinfo[ip.indexOf('192.168.8.103')] > 0) {
        $.ajax({
            url: "http://192.168.8.103:8083/start_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星3超载');
                }

            }, //请求成功之后要做的事
            error: function() {
                    info_prompt('超载失败');
                } //请求失败
        });
    } else { info_prompt('卫星3已开始超载或未开启，请勿重复点击'); }

});
$(document).on('click', "#d4cpu", function() {
    if (cpuinfo[ip.indexOf('192.168.8.104')] <= 70 && cpuinfo[ip.indexOf('192.168.8.104')] > 0) {
        $.ajax({
            url: "http://192.168.8.104:8083/start_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星4超载');
                }

            }, //请求成功之后要做的事
            error: function() {
                    info_prompt('超载失败');
                } //请求失败
        });
    } else { info_prompt('卫星4已开始超载或未开启，请勿重复点击'); }

});
$(document).on('click', "#d5cpu", function() {
    if (cpuinfo[ip.indexOf('192.168.8.105')] <= 70 && cpuinfo[ip.indexOf('192.168.8.105')] > 0) {
        $.ajax({
            url: "http://192.168.8.105:8083/start_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星5超载');
                }

            }, //请求成功之后要做的事
            error: function() {
                    info_prompt('超载失败');
                } //请求失败
        });
    } else { info_prompt('卫星5已开始超载或未开启，请勿重复点击'); }

});
$(document).on('click', "#tx2cpu", function() {
    if (cpuinfo[ip.indexOf('192.168.8.19')] <= 70 && cpuinfo[ip.indexOf('192.168.8.19')] > 0) {
        $.ajax({
            url: "http://192.168.8.19:8083/start_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星TX2超载');
                }

            }, //请求成功之后要做的事
            error: function() {
                    info_prompt('超载失败');
                } //请求失败
        });
    } else { info_prompt('卫星TX2已开始超载或未开启，请勿重复点击'); }

});
$(document).on('click', "#d2cpustop", function() {
    if (cpuinfo[ip.indexOf('192.168.8.102')] >= 50) {
        $.ajax({
            url: "http://192.168.8.102:8083/stop_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星2停止超载');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('停止失败'); } //请求失败
        });
    } else { info_prompt('卫星2已停止超载，请勿重复点击'); }


});
$(document).on('click', "#d3cpustop", function() {
    if (cpuinfo[ip.indexOf('192.168.8.103')] >= 50) {
        $.ajax({
            url: "http://192.168.8.103:8083/stop_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星3停止超载');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('停止失败'); } //请求失败
        });
    } else { info_prompt('卫星3已停止超载，请勿重复点击'); }


});
$(document).on('click', "#d4cpustop", function() {
    if (cpuinfo[ip.indexOf('192.168.8.104')] >= 50) {
        $.ajax({
            url: "http://192.168.8.104:8083/stop_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星4停止超载');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('停止失败'); } //请求失败
        });
    } else { info_prompt('卫星4已停止超载，请勿重复点击'); }


});
$(document).on('click', "#d5cpustop", function() {
    if (cpuinfo[ip.indexOf('192.168.8.105')] >= 50) {
        $.ajax({
            url: "http://192.168.8.105:8083/stop_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星5停止超载');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('停止失败'); } //请求失败
        });
    } else { info_prompt('卫星5已停止超载，请勿重复点击'); }


});
$(document).on('click', "#tx2cpustop", function() {
    if (cpuinfo[ip.indexOf('192.168.8.19')] >= 50) {
        $.ajax({
            url: "http://192.168.8.19:8083/stop_cpu", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('停止成功');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('停止失败'); } //请求失败
        });
    } else { info_prompt('卫星TX2已停止超载，请勿重复点击'); }


});
$(document).on('click', "#d2add", function() {
    if (cpuinfo[ip.indexOf('192.168.8.102')] <= 0.001 || gpuinfo[ip.indexOf('192.168.8.102')] <= 0.001 || raminfo[ip.indexOf('192.168.8.102')] <= 0.001) {
        $.ajax({
            url: "http://192.168.8.102:8083/add_fog", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星2加入中');
                    if (cpuinfo[ip.indexOf('192.168.8.102')] >= 0.001) {
                        info_prompt('卫星2加入成功');
                    }
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('加入失败'); } //请求失败
        });
    } else { info_prompt('卫星2已加入，请勿重复点击'); }

});
$(document).on('click', "#d3add", function() {
    if (cpuinfo[ip.indexOf('192.168.8.103')] <= 0.001 || gpuinfo[ip.indexOf('192.168.8.103')] <= 0.001 || raminfo[ip.indexOf('192.168.8.103')] <= 0.001) {
        $.ajax({
            url: "http://192.168.8.103:8083/add_fog", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星3加入中');
                    if (cpuinfo[ip.indexOf('192.168.8.103')] >= 0.001) {
                        info_prompt('卫星3加入成功');
                    }
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('加入失败'); } //请求失败
        });
    } else { info_prompt('卫星3已加入，请勿重复点击'); }
});
$(document).on('click', "#d4add", function() {
    if (cpuinfo[ip.indexOf('192.168.8.104')] <= 0.001 || gpuinfo[ip.indexOf('192.168.8.104')] <= 0.001 || raminfo[ip.indexOf('192.168.8.104')] <= 0.001) {
        $.ajax({
            url: "http://192.168.8.104:8083/add_fog", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星4加入中');
                    if (cpuinfo[ip.indexOf('192.168.8.104')] >= 0.001) {
                        info_prompt('卫星4加入成功');
                    }
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('加入失败'); } //请求失败
        });
    } else { info_prompt('卫星4已加入，请勿重复点击'); }
});
$(document).on('click', "#d5add", function() {
    if (cpuinfo[ip.indexOf('192.168.8.105')] <= 0.001 || gpuinfo[ip.indexOf('192.168.8.105')] <= 0.001 || raminfo[ip.indexOf('192.168.8.105')] <= 0.001) {
        $.ajax({
            url: "http://192.168.8.105:8083/add_fog", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星5加入中');
                    if (cpuinfo[ip.indexOf('192.168.8.105')] >= 0.001) {
                        info_prompt('卫星5加入成功');
                        console.log('cpuD5__________' + cpuinfo[ip.indexOf('192.168.8.105')]);
                    }
                }
            }, //请求成功之后要做的事
            error: function() { info_prompt('加入失败'); } //请求失败
        });
    } else { info_prompt('卫星5已加入，请勿重复点击'); }
});
$(document).on('click', "#tx2add", function() {
    if (cpuinfo[ip.indexOf('192.168.8.19')] <= 0.001 || gpuinfo[ip.indexOf('192.168.8.19')] <= 0.001 || raminfo[ip.indexOf('192.168.8.19')] <= 0.001) {
        $.ajax({
            url: "http://192.168.8.19:8083/add_fog", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星TX2加入中');
                    if (cpuinfo[ip.indexOf('192.168.8.19')] >= 0.001) {
                        info_prompt('卫星TX2加入成功');
                    }
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('加入失败'); } //请求失败
        });
    } else { info_prompt('卫星TX2已加入，请勿重复点击'); }
});
$(document).on('click', "#tx2shut", function() {
    if (cpuinfo[ip.indexOf('192.168.8.19')] >= 0.0001 && gpuinfo[ip.indexOf('192.168.8.19')] >= 0.0001 && raminfo[ip.indexOf('192.168.8.19')] >= 0.0001) {
        $.ajax({
            url: "http://192.168.8.19:8083/shut", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('tx2关闭');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('关闭失败'); } //请求失败
        });
    } else { info_prompt('tx2已是关闭状态'); }

});
$(document).on('click', "#d2shut", function() {
    if (cpuinfo[ip.indexOf('192.168.8.102')] >= 0.0001 && gpuinfo[ip.indexOf('192.168.8.102')] >= 0.0001 && raminfo[ip.indexOf('192.168.8.102')] >= 0.0001) {
        $.ajax({
            url: "http://192.168.8.102:8083/shut", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星2关闭');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('关闭失败'); } //请求失败
        });
    } else { info_prompt('卫星2已是关闭状态'); }


});
$(document).on('click', "#d3shut", function() {
    if (cpuinfo[ip.indexOf('192.168.8.103')] >= 0.0001 && gpuinfo[ip.indexOf('192.168.8.103')] >= 0.0001 && raminfo[ip.indexOf('192.168.8.103')] >= 0.0001) {
        $.ajax({
            url: "http://192.168.8.103:8083/shut", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星3关闭');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('关闭失败'); } //请求失败
        });
    } else { info_prompt('卫星3已是关闭状态'); }
});
$(document).on('click', "#d4shut", function() {
    if (cpuinfo[ip.indexOf('192.168.8.104')] >= 0.0001 && gpuinfo[ip.indexOf('192.168.8.104')] >= 0.0001 && raminfo[ip.indexOf('192.168.8.104')] >= 0.0001) {
        $.ajax({
            url: "http://192.168.8.104:8083/shut", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星4关闭');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('关闭失败'); } //请求失败
        });
    } else { info_prompt('卫星4已是关闭状态'); }

});
$(document).on('click', "#d5shut", function() {
    if (cpuinfo[ip.indexOf('192.168.8.105')] >= 0.0001 && gpuinfo[ip.indexOf('192.168.8.105')] >= 0.0001 && raminfo[ip.indexOf('192.168.8.105')] >= 0.0001) {
        $.ajax({
            url: "http://192.168.8.105:8083/shut", //请求路径
            type: 'get', //请求方式
            data: null, //请求数据
            dataType: 'json', //数据格式
            cache: true, //请求缓存
            async: true, //是否异步，默认true
            success: function(boolen) {
                if (boolen) {
                    info_prompt('卫星5关闭');
                }

            }, //请求成功之后要做的事
            error: function() { info_prompt('关闭失败'); } //请求失败
        });
    } else { info_prompt('卫星5已是关闭状态'); }



});
$(document).on('click', "#showbg", function() {
    $("#sectionpicresultleftoriginal2").hide();
    $("#matrixsumbox").hide();
    $("#sectionpicresultleftoriginal").toggle();
    $("#sectionpicresultleftoriginal").css("left", "0px");

});
$(document).on('click', "#showsum", function() {
    $("#sectionpicresultleftoriginal2").toggle();
    $("#sectionpicresultleftoriginal2").css("left", "0px");
});
$(document).on('click', "#showpic1", function() {
    $("#sectionpicresultleftoriginal2").hide();
    $("#matrixsumbox").hide();
    $("#sectionpicresultleft1").toggle();
    /* $("#matrix1box").toggle(); */
    $("#matrix1box").html(picdata[0]);
});
$(document).on('click', "#showpic2", function() {
    $("#matrixsumbox").hide();
    $("#sectionpicresultleft2").toggle();
    $("#sectionpicresultleftoriginal2").hide();
    /* $("#matrix2box").toggle(); */
    $("#matrix2box").html(picdata[1]);
});
$(document).on('click', "#showpic3", function() {
    $("#matrixsumbox").hide();
    $("#sectionpicresultleft3").toggle();
    $("#sectionpicresultleftoriginal2").hide();
    /* $("#matrix3box").toggle(); */
    $("#matrix3box").html(picdata[2]);
});
$(document).on('click', "#showpic4", function() {
    $("#matrixsumbox").hide();
    $("#sectionpicresultleft4").toggle();
    $("#sectionpicresultleftoriginal2").hide();
    /* $("#matrix4box").toggle(); */
    $("#matrix4box").html(picdata[3]);
});
$(document).on('click', "#showpic5", function() {
    $("#matrixsumbox").hide();
    $("#sectionpicresultleft5").toggle();
    $("#sectionpicresultleftoriginal2").hide();
    /*  $("#matrix5box").toggle(); */
    $("#matrix5box").html(picdata[4]);
});
$(document).on('click', "#showpic6", function() {
    $("#matrixsumbox").hide();
    $("#sectionpicresultleft6").toggle();
    $("#sectionpicresultleftoriginal2").hide();
    /*     $("#matrix6box").toggle(); */
    $("#matrix6box").html(picdata[5]);
});


//cpu柱状图显示配置
var optioncpu = {
    title: {
        text: '各卫星信息',
        x: 5,
        y: 15,
        textStyle: {
            color: 'white',
            fontSize: 18
        }
    },
    tooltip: {
        show: true,
        showContent: true,
        showTitle: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'，
            shadowStyle: { color: 'rgba(250,250,150,0.3)' }
        },
        textStyle: {}
    },
    color: ['#34ace0', '#63cdda'], //图标颜色
    legend: {
        data: ['CPU', 'GPU'],
        textStyle: {
            color: 'white',
            fontSize: 18
        },
        top: '15px',
        left: '130px'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        data: ipname, //柱状图ip赋值
        nameTextStyle: {
            color: 'white'
        },

        axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            //  -----   箭头 -----
            symbol: ["circle", "none"], // 是否显示轴线箭头
            symbolSize: [9, 9], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置

            // ----- 线 -------
            lineStyle: {
                color: 'white',
                width: 1,
                type: 'solid'
            }
        },
        axisLabel: {
            fontSize: 16
        }
    },
    yAxis: {
        nameTextStyle: {
            color: 'white'
        },
        axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            //  -----   箭头 -----
            symbol: ['circle', 'none'], // 是否显示轴线箭头
            symbolSize: [9, 9], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置

            // ----- 线 -------
            lineStyle: {

                color: 'white',
                width: 1,
                type: 'solid'
            }
        },
        axisLabel: {
            fontSize: 18,
            formatter: '{value}%'
        }
    },
    series: [{
            name: 'CPU',
            type: 'bar',
            barGap: 0,
            data: cpuinfo, //柱状图cpu赋值
            nameTextStyle: { // 坐标轴名称样式
                color: '#009FEF'
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.3)'
            },
            itemStyle: {
                normal: {
                    color: function(params) { // 设置不同值不同色
                        if (params.data >= 90) {
                            return ('#d32f2f');
                        } else if (params.data < 90 && params.data >= 80) {
                            return ('#f57f17');
                        } else {
                            return ('#34ace0');
                        }
                    },
                    barBorderRadius: [6, 6, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
                },
            },
            label: {
                show: false,
                position: 'top',
            }
        },
        {
            name: 'GPU',
            type: 'bar',
            data: gpuinfo, //柱状图gpu赋值
            nameTextStyle: { // 坐标轴名称样式
                color: '#009FEF'
            },

            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.3)'
            },
            itemStyle: {
                normal: {
                    color: function(params) { // 设置前三个颜色不一样
                        if (params.data >= 90) {
                            return ('#d32f2f');
                        } else if (params.data < 90 && params.data >= 80) {
                            return ('#f57f17');
                        } else {
                            return ('#63cdda');
                        }
                    },
                    barBorderRadius: [6, 6, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
                },
            },
            label: {
                show: false,
                position: 'top'
            }
        }
    ]
};

var optionnum = {
    title: {
        text: '各卫星动态部署',
        x: '20px', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        y: '15px', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        textStyle: {
            color: 'white',
            fontSize: 18
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        textStyle: {
            color: 'white'
        }
    },
    color: ['#9AECDB', '#26a69a'],
    legend: {
        data: ['算例任务1', '算例任务2'],
        textStyle: {
            color: 'white',
            fontSize: 18
        },
        top: '15px',
        left: '150px'
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        position: 'bottom',
        axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            //  -----   箭头 -----
            symbol: ["circle", "none"], // 是否显示轴线箭头
            symbolSize: [9, 9], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置

            // ----- 线 -------
            lineStyle: {
                color: 'white',
                width: 1,
                type: 'solid'
            }
        },

        axisLabel: {
            fontSize: 18,
            formatter: '{value}个'
        }
    },
    yAxis: {
        type: 'category',
        data: numipname,
        axisLine: {
            lineStyle: {
                color: "#fff",
                width: 1
            }
        },
        axisLabel: {
            fontSize: 18
        }
    },
    series: [{ //T2部分
            name: '算例任务1',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideBottom'
            },
            data: numinfoT2,
            itemStyle: {
                normal: {
                    color: function(params) { // 设置前三个颜色不一样
                        var num = params.value;
                        var djg = params.dataIndex; //第几个数
                        var retcoler = '#9AECDB';

                        return retcoler;
                    },
                    barBorderRadius: [0, 0, 0, 0] // 
                },

            }
        }, {
            name: '算例任务2',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideBottom'
            },
            data: numinfoT3,
            itemStyle: {
                normal: {
                    color: function(params) { // 设置前三个颜色不一样
                        var num = params.value;
                        var djg = params.dataIndex; //第几个数
                        var retcoler = '#26a69a';

                        return retcoler;
                    },
                    barBorderRadius: [0, 0, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
                },

            },
        },


    ]
};

var optionpic = {
    tooltip: {
        show: true,
        showContent: true,
        showTitle: true,
        triggerOn: 'mousemove|click',
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'，
            shadowStyle: { color: 'rgba(250,250,150,0.3)' }
        },
        textStyle: {}
    },
    angleAxis: {
        type: 'category',
        data: ['卫星2\n图一\n4', '卫星3\n图二\n2', '卫星TX2\n图三\n3', '卫星1\n图四\n4', '卫星4\n图五\n3', '卫星5\n图六\n7'],
        axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            //  -----   箭头 -----
            symbol: ['none', 'narrow'], // 是否显示轴线箭头
            symbolSize: [8, 8], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置

            // ----- 线 -------
            lineStyle: {
                color: 'white',
                width: 1,
                type: 'solid'
            }
        },
    },
    radiusAxis: {
        axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            //  -----   箭头 -----
            symbol: ['none', 'narrow'], // 是否显示轴线箭头
            symbolSize: [8, 8], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置

            // ----- 线 -------
            lineStyle: {
                color: 'white',
                width: 1,
                type: 'solid'
            }
        },
    },
    polar: {},
    series: [{
        type: 'bar',
        data: [4, 2, 3, 4, 3, 7],
        coordinateSystem: 'polar',
        name: '识别个数',
        stack: 'a',
        label: {
            show: true,
        },
        emphasis: {
            itemStyle: {
                // 高亮时点的颜色。
                color: 'white'
            },
            label: {
                show: true,
                // 高亮时标签的文字。
                formatter: 'This is a emphasis label.'
            }
        },
        itemStyle: {
            normal: {
                color: function(params) { // 设置不同值不同色
                    var num = params.value;
                    var djg = params.dataIndex; //第几个数
                    switch (djg) {
                        case 0:
                            return ('#c5e1a5');
                        case 1:
                            return ('#00bc84');
                        case 2:
                            return ('#29b6f6');
                        case 3:
                            return ('#adc865');
                        case 4:
                            return ('#89d5c9');
                        case 5:
                            return ('#fac172');

                    }

                },
                barBorderRadius: [8, 8, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
            },
        },
    }],
    legend: {
        show: false,
        data: ['A']
    }
};
var optiontopology = {
    title: {
        text: '',
        textStyle: {
            color: 'white',
            fontSize: 15,
        },

    },
    tooltip: {},
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut',
    series: [{
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
            show: true,
            fontSize: 18,
            position: [-30, 0],
            color: ' #8CBFFB'
        },
        edgeSymbol: ['circle'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
            fontSize: 15
        },
        itemStyle: {
            color: '#039be5'
        },
        data: [{
                name: '卫星  ',
                x: 0,
                y: 65,
                symbol: 'image://images\\stl.png',
                symbolSize: [30, 24]
            }, {
                name: '卫星 ',
                x: 900,
                y: 65,
                symbol: 'image://images\\stl.png',
                symbolSize: [30, 24]
            }, {
                name: '计算卫星1',
                x: 500,
                y: 200,
                symbol: 'image://images\\卫星.png',
                symbolSize: [100, 59]
            }, stl2, stl3, stl4, stl5,
            {
                name: '地面云',
                x: 850,
                y: 480,

                symbol: 'image://images\\cloudwhite.png',
                symbolSize: [75, 75]
            }, {
                name: '待探测目标',
                x: 0,
                y: 480,
                symbol: 'image://images\\boat.png',
                symbolSize: [100, 60]
            }, {
                name: '',
                x: 0,
                y: 395,
                symbol: 'image://images\\light.png',
                symbolSize: [150, 70]
            }, {
                name: '遥感卫星',
                x: 0,
                y: 335,
                symbol: 'image://images\\microchipwhite.png',
                symbolSize: [100, 80]
            }
        ],
        // links: [],
        links: [{
                source: '计算卫星1',
                target: '计算卫星2',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    width: 2,

                }
            }, {
                source: '计算卫星1',
                target: '计算卫星3',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    width: 2,

                }
            }, {
                source: '计算卫星1',
                target: '计算卫星4',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    width: 2,

                }
            },
            {
                source: '计算卫星1',
                target: '计算卫星5',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    width: 2,

                }
            },
            {
                source: '计算卫星3',
                target: '计算卫星4',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    curveness: 0
                }
            }, {
                source: '计算卫星2',
                target: '计算卫星3',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',

                }
            }, {
                source: '计算卫星4',
                target: '计算卫星5',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    curveness: 0
                }
            }, {
                source: '计算卫星5',
                target: '地面云',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',

                }
            }, {
                source: '计算卫星1',
                target: '地面云',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',

                }
            },
            {
                source: '计算卫星2',
                target: '遥感卫星',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    curveness: 0
                }
            },
            {
                source: '计算卫星1',
                target: '遥感卫星',
                label: {
                    show: false
                },
                lineStyle: {
                    color: 'white',
                    curveness: 0
                }
            },

        ],
        lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
        }
    }]
};

function id(x) {
    if (typeof x == "string") return document.getElementById(x);
    return x;
}


$(document).on('click', "#cloudclick", function() {
    if ($("#cloudpic").attr("src") == "images/cloudwhite.png") {
        $("#cloudpic").attr("src", "images/cloudred.png");
    } else {
        $("#cloudpic").attr("src", "images/cloudwhite.png");
    }
});

$(document).on('click', "#microchipclick", function() {
    if ($("#microchip").attr("src") == "images/microchipwhite.png") {
        $("#microchip").attr("src", "images/microchipred.png");
    } else {
        $("#microchip").attr("src", "images/microchipwhite.png");
    }
})

function changecomputer(x) {
    x = id(x);
    if (x.src.match("red")) {
        x.src = "images/computerwhite.png";
    } else {
        x.src = "images/computerred.png";
    }
}


/**
 * 弹出式提示框，默认1.2秒自动消失
 * @param message 提示信息
 * @param style 提示样式，有alert-success、alert-danger、alert-warning、alert-info
 * @param time 消失时间
 */
var prompt = function(message, style, time) {
    style = (style === undefined) ? 'alert-success' : style;
    time = (time === undefined) ? 1200 : time;
    $('<div>')
        .appendTo('body')
        .addClass('alert font25 ' + style)
        .html(message)
        .show()
        .delay(time)
        .fadeOut();
};
// 成功提示
var success_prompt = function(message, time) {
    prompt(message, 'alert-success', time);
};

// 失败提示
var fail_prompt = function(message, time) {
    prompt(message, 'alert-danger', time);
};

// 提醒
var warning_prompt = function(message, time) {
    prompt(message, 'alert-warning', time);
};
// 信息提示
var info_prompt = function(message, time) {
    prompt(message, 'alert-info', time);
};