var ip = ["192.168.8.19", "192.168.8.101", "192.168.8.102", "192.168.8.103", "192.168.8.104", "192.168.8.105"];
var ipname = ["Tx2", "卫星1", "卫星2", "卫星3", "卫星4", "卫星5"];
var cpuinfo = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var raminfo = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var gpuinfo = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var numinfoT2 = [0, 0, 0, 0, 0, 0, 0, 0];
var numinfoT3 = [0, 0, 0, 0, 0, 0, 0, 0];
var numip = ["192.168.8.19", "192.168.8.105", "192.168.8.104", "192.168.8.103", "192.168.8.102", "192.168.8.101", ""];
var numipname = ["Tx2", "卫星5", "卫星4", "卫星3", "卫星2", "卫星1", "云"];
var numsum = [0];
var TX2cpu = [0];
var TX2ram = [0];
var TX2gpu = [0];
var cpuinfonew = [0.0, 0.0, 0.0, 0.0, 0.0];
var raminfonew = [0.0, 0.0, 0.0, 0.0, 0.0];
var gpuinfonew = [0.0, 0.0, 0.0, 0.0, 0.0];
var ipnamenew = ["卫星1", "卫星2", "卫星3", "卫星4", "卫星5"];
var gpu, cpu, ram = [];
var TX2_T2 = [0];
var TX2_T3 = [0];
//容器数量求和
function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);

    return s;
};
//ram,cpu柱状图取数据
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
            console.log('CPU status:' + status);
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
    TX2cpu[0] = 0;
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
    /*     $.get("http://192.168.8.101:8080/jsp/getGpuMap", function(data, status) {
            var map = data.data;
            for (var key in map) {
                gpuip.push(key);
                gpunum.push(map[key]);
            }
            console.log('GPU status:' + status);
        }, dataType = "Json"); //获得gpu
     */
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
            console.log('GPU status:' + status);
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
    TX2gpu[0] = 0;
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

    //------------------------------------获取整理RAM数据
    /*     $.get("http://192.168.8.101:8080/jsp/getRamMap", function(data, status) {
            var map = data.data;
            for (var key in map) {
                ramip.push(key);
                ramnum.push(map[key]);
            }
            console.log('RAM status:' + status);
        }, dataType = "Json"); */
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
            console.log('RAM status:' + status);
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
    TX2ram[0] = 0;
    TX2ram[0] = raminfo[0];
    raminfonew = raminfo.slice(1);
    console.log('ram:' + raminfo);
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
//获取容器数量
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
    console.log('numsum=========' + numsum);
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
    TX2_T2[0] = numinfoT2[0];
    TX2_T3[0] = numinfoT3[0];
    setoptionpie(); //赋值给pie
    $.ajaxSettings.async = true;
}
//求和T2，T3
function getnumsum() {
    numsum = sum(numinfoT2) + sum(numinfoT3);
    return numsum;
}

//矩阵信息获取
function getmatrixdatareal() {
    $.ajax({
        url: 'http://192.168.8.19:8081/hashrate/sendPairHashrateBuffer', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: true, //是否异步，默认true
        beforeSend: function() {},
        success: function(data) {
            var picname = new Array();
            var picdata = new Array();
            var jsonmatrixdata = data.data;
            jsonmatrixdata = [];
            var map = data.data;
            var countdata = 0;
            var picdata;
            for (var ip in map) {
                if (ip = '192.168.8.19') {
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
                pageSize: 4, //单页记录数
                pageList: [4],
                showColumns: false, //
                uniqueId: "id", //主键列
                paginationDetailHAlign: ' hidden',
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

        }, //请求成功之后要做的事 //请求成功之后要做的事
        error: function(status) {
            $("#sectionpicresultright").css("display", "none"); //关掉所有图和矩阵
            ajaxbg.hide();
            $("#sectionpicresultleftseperate").hide();
            $("#gif").css("display", "none");
            window.location.href = "#sectionpicresult";
            $("#taskpicstart").attr('disabled', false); //按钮可点击
            $("#taskpicstart").removeClass('disabled');
            console.log("error:" + status);
            warning_prompt("网络连接错误");
            return false;
        }, //请求失败
        complete: function() {
            //请求完成，loading关闭
            //do something 
            $("#gif").css("display", "none");
            $("#taskpicstart").attr('disabled', false);
            $("#taskpicstart").removeClass('disabled');
            $(".flow").removeClass('yellow');
        }
    });
}
//路由表信息获取
function getroutedata() {

    $.ajax({
        url: 'http://localhost:8083/findSatellite', //请求路径
        type: 'get', //请求方式
        data: null, //请求数据
        dataType: 'json', //数据格式
        cache: true, //请求缓存
        async: true, //是否异步，默认true
        beforeSend: function() {},
        success: function(data) {
            var jsonmatrixdata = new Object();
            var jsonmatrixdata2 = [];
            jsonmatrixdata = data.data;
            /*            var stringdata = JSON.stringify(jsonmatrixdata);
                       stringdata = '[' + stringdata + ']';
                       console.log("--------getstringdata--------" + stringdata);
                       jsonmatrixdata2 = JSON.parse(stringdata); */
            if (data.code == 0) {
                var countdata = 0;

                console.log('this-------' + jsonmatrixdata['this_satellite']);
                jsonmatrixdata2[countdata] = {
                    'this_satellite': jsonmatrixdata['this_satellite'],
                    'other_satellite': jsonmatrixdata['other_satellite'],
                    'delayMap': JSON.stringify(jsonmatrixdata['delayMap']).substring(1, JSON.stringify(jsonmatrixdata['delayMap']).length - 1),
                    'visible_time': jsonmatrixdata['visible_time'],
                    'visible_delay_val': jsonmatrixdata['visible_delay_val'],
                    'ram': jsonmatrixdata['ram'],
                    'cpu': jsonmatrixdata['cpu'],
                    'gpu': jsonmatrixdata['gpu'],
                    'type': jsonmatrixdata['type'],
                    'status': jsonmatrixdata['status']
                };
                countdata++;

                console.log("--------getjsondata--------" + JSON.stringify(jsonmatrixdata2));
                $('#routetabledata').bootstrapTable('refresh');
                $('#routetabledata').bootstrapTable('destroy').bootstrapTable({
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
                            field: "this_satellite",
                            title: '卫星编号',
                            align: 'center'
                        }, {
                            field: "other_satellite",
                            title: '相连卫星编号',
                            align: 'center',
                        }, {
                            field: "delayMap",
                            title: '相连卫星传播延时',
                            align: 'center',
                        }, {
                            field: 'visible_time',
                            title: '对地可见时段',
                            align: 'center',
                        }, {
                            field: 'visible_delay_val',
                            title: '对地传播延时',
                            align: 'center',
                        }, {
                            field: 'type',
                            title: '任务类型',
                            align: 'center',
                        },
                        {
                            field: 'status',
                            title: '信誉度',
                            align: 'center',
                        }
                    ],
                    data: jsonmatrixdata2,
                });
            } else if (data.code == 9) {
                info_prompt("未知错误");
            } else {
                info_prompt("no result");
            }
        }, //请求成功之后要做的事 //请求成功之后要做的事
        error: function(status) {
            return false;
            errorcount++;
        }, //请求失败
        complete: function() {

        }
    });
}



//cpu柱状图显示配置
var optioncpu = {
    title: {
        text: 'TX2信息',
        x: 35,
        y: 0,
        textStyle: {
            color: 'white',
            fontSize: 22
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
    color: ['#66CCCC', '#9fa8da', '#b3e5fc'], //图标颜色
    legend: {
        data: ['CPU', 'GPU', 'RAM'],
        textStyle: {
            color: 'white',
            fontSize: 22
        }
    },
    xAxis: {
        data: ['TX2'], //柱状图ip赋值
        nameTextStyle: {
            color: 'white'
        },
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
        axisLabel: {
            fontSize: 22
        }
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        nameTextStyle: {
            color: 'white'
        },
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
        axisLabel: {
            fontSize: 22
        }
    },
    series: [{
            name: 'CPU',
            type: 'bar',
            barGap: 0,
            data: TX2cpu, //柱状图cpu赋值
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
                            return ('#66CCCC');
                        }
                    },
                    barBorderRadius: [8, 8, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
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
            data: TX2gpu, //柱状图gpu赋值
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
                            return ('#9fa8da');
                        }
                    },
                    barBorderRadius: [8, 8, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
                },
            },
            label: {
                show: false,
                position: 'top'
            }
        },
        {
            name: 'RAM',
            type: 'bar',
            data: TX2ram, //柱状图ram赋值
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
                            return '#d32f2f';
                        } else if (params.data < 90 && params.data >= 80) {
                            return ('#f57f17');
                        } else {
                            return '#b3e5fc';
                        }
                    },
                    barBorderRadius: [8, 8, 0, 0] // 设置柱状图圆角（顺时针左上，右上，右下，左下）
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
        text: 'TX2部署',
        x: '20px', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        y: '20px', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        textStyle: {
            color: 'white',
            fontSize: 22
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
    color: ['#F9A825', '#26a69a'],
    legend: {
        data: ['算例任务1', '算例任务2'],
        textStyle: {
            color: 'white',
            fontSize: 22
        },
        top: '20px',
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
        min: 0,
        max: 15,
        boundaryGap: [0, 0.01],
        position: 'top',
        axisLine: {
            lineStyle: {
                color: "#fff",
                width: 1
            }
        },
        axisLabel: {
            fontSize: 22
        }
    },
    yAxis: {
        type: 'category',
        data: [numipname[0]],
        axisLine: {
            lineStyle: {
                color: "#fff",
                width: 1
            }
        },
        axisLabel: {
            fontSize: 22
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
            data: TX2_T2,
            itemStyle: {
                normal: {
                    color: function(params) { // 设置前三个颜色不一样
                        var num = params.value;
                        var djg = params.dataIndex; //第几个数
                        var retcoler = '#F9A825';

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
            data: TX2_T3,
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
var optionpie0 = {
    tooltip: {
        show: false,
        trigger: 'item',
        formatter: "{a} : {c} ({d}%)"
    },
    color: ['rgba(255,255,255,0.7)', '#fa8231'],
    legend: {
        orient: 'vertical',
        x: '0%',
        top: '0%',
        itemHeight: 15, //图例的高度
        itemGap: 8, //图例之间的间距
        textStyle: {
            fontSize: '20',
            color: 'white'
        },
        data: ['总任务:' + 0 + '个', '本设备任务:' + 0 + '个']
            //图例的名字需要和饼图的name一致，才会显示图例
    },
    series: [{
            name: '总任务:' + 0 + '个',
            type: 'pie',
            radius: ['40%', '80%'],
            //环的位置
            label: {
                show: true,
                position: 'center',
                // normal: { // 显示的位置
                //     position: 'inner'
                // }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            data: [{
                value: 0, //需要显示的数据
                name: '总任务:' + 0 + '个',
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,0.7)'
                    }
                }
            }]
        },
        {
            name: '本设备任务:' + 0 + '个',
            type: 'pie',
            radius: ['40%', '80%'],
            label: {
                show: true,
                position: 'inner',
                // normal: {
                //     position: 'inner'
                // }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            data: []
        }
    ]
};
var optionpie = optionpie0;

function setoptionpie() {
    if (numsum != 0) {
        var total_num = Number(numsum);
        var device_num1 = Number(TX2_T2);
        var device_num2 = Number(TX2_T3);
        var devicesum = Number(TX2_T2) + Number(TX2_T3);
        optionpie = {
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} : {c} ({d}%)"
            },
            color: ['rgba(255,255,255,0.7)', '#fa8231'],
            legend: {
                orient: 'vertical',
                x: '0%',
                top: '0%',
                itemHeight: 15, //图例的高度
                itemGap: 8, //图例之间的间距
                textStyle: {
                    fontSize: '20',
                    color: 'white'
                },
                data: ['总任务:' + numsum + '个', '本设备任务:' + devicesum + '个']
                    //图例的名字需要和饼图的name一致，才会显示图例
            },
            series: [{
                    name: '总任务:' + numsum + '个',
                    type: 'pie',
                    radius: ['40%', '80%'],
                    //环的位置
                    label: {
                        show: true,
                        position: 'center',
                        // normal: { // 显示的位置
                        //     position: 'inner'
                        // }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    data: [{
                            value: numsum, //需要显示的数据
                            name: '总任务:' + numsum + '个',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(255,255,2255,0.7)'
                                }
                            }
                        },
                        {
                            value: 0,
                            //不需要显示的数据，颜色设置成和背景一样
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                }
                            }
                        }
                    ]
                },
                {
                    name: '本设备任务:' + devicesum + '个',
                    type: 'pie',
                    radius: ['40%', '80%'],
                    label: {
                        show: true,
                        position: 'inner',
                        // normal: {
                        //     position: 'inner'
                        // }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    data: [{
                            name: '本设备任务1:' + device_num1 + '个',
                            value: device_num1,
                            itemStyle: {
                                normal: {
                                    color: '#f1c40f'
                                }
                            }
                        },
                        {
                            name: '本设备任务2:' + device_num2 + '个',
                            value: device_num2,
                            itemStyle: {
                                normal: {
                                    color: '#ff793f'
                                }
                            }
                        },
                        {
                            value: total_num - devicesum,
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                }
                            }
                        }
                    ]
                }
            ]
        };
    } else {
        optionpie = optionpie0;
    };
};


function id(x) {
    if (typeof x == "string") return document.getElementById(x);
    return x;
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
        .addClass('alert ' + style)
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