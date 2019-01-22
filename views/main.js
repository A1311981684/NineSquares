let x;
let y;
function myFunction(d) {


    switch (d) {
        case 0:
            x = 1;
            y = 1;
            break;
        case 1:
            x = 1;
            y = 2;
            break;
        case 2:
            x = 1;
            y = 3;
            break;
        case 3:
            x = 2;
            y = 1;
            break;
        case 4:
            x = 2;
            y = 2;
            break;
        case 5:
            x = 2;
            y = 3;
            break;
        case 6:
            x = 3;
            y = 1;
            break;
        case 7:
            x = 3;
            y = 2;
            break;
        case 8:
            x = 3;
            y = 3;
            break;

    }
}

//退出按钮
function custom_close() {
    if (confirm("Are you sure exit？")) {
        window.opener = null;
        window.open('', '_self');
        window.close();
    } else {
    }
}

//取stamp，


var P1 = {
    id: Math.round(Math.random()*10000),
    name: "韦狗1",
    shape: 0
};
var P2 = {
    id:Math.round(Math.random()*10000),
    name: "韦狗2",
    shape: 1
};
let currentPlayer = P1.id;

$(function () {
    // axios.put("http://10.1.1.136:8080/v1/board/board",{  "Players": [
    //         {
    //             "CanMove": true,
    //             "Id":P1.id,
    //             "Lose": 0,
    //             "Mark": 0,
    //             "Name": P1.name,
    //             "PrivateSituation": 0,
    //             "WinRate": 0,
    //             "Wins": 0
    //         },
    //         {
    //             "CanMove": true,
    //             "Id": P2.id,
    //             "Lose": 0,
    //             "Mark": 0,
    //             "Name": P2.name,
    //             "PrivateSituation": 0,
    //             "WinRate": 0,
    //             "Wins": 0
    //         }
    //     ]}).then(function(response){
    //         console.log("成功");
    // });
    $.ajax({
        type: "put",
        url: "http://10.1.1.136:8080/v1/board/board",
        cache: true,
        data: JSON.stringify({
            Players: [
                {
                    "CanMove": true,
                    "Id":P1.id,
                    "Lose": 0,
                    "Mark": 0,
                    "Name":P1.name,
                    "PrivateSituation": 0,
                    "WinRate": 0,
                    "Wins": 0
                },
                {
                    "CanMove": true,
                    "Id":P2.id,
                    "Lose": 0,
                    "Mark": 0,
                    "Name": P2.name,
                    "PrivateSituation": 0,
                    "WinRate": 0,
                    "Wins": 0
                }
            ]
        }),
            dataType: "json",
            success: function (data) {
                if (data.Status ==200) {
                    console.log(data.Description)
                    // $.ajax({
                    //     type: "POST",
                    //     url: "http://10.1.1.136:8080/v1/board/move",
                    //     cache: false,
                    //     data: {
                    //         "Mover": currentPlayer,
                    //         "Pos": {
                    //             "Col": x,
                    //             "Row": y
                    //         }
                    //     },
                    //     dataType: "json",
                    //     success: function (data) {
                    //         if (data.Status === '200') {
                    //             console.log(data.Description)
                    //         } else {
                    //             alert(data.Description)
                    //         }
                    //     },
                    //     error: function (data) {
                    //
                    //     }
                    // },)
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);});
// $("#button").click(function () {
//             $.ajax({
//                 type: "POST",
//                 url: "http://10.1.1.136:8080/v1/board/move",
//                 cache: true,
//                 data: JSON.stringify({
//                     "Mover": currentPlayer,
//                     "Pos": {
//                         "Col": 1,
//                         "Row": 1
//                     }
//                 }),
//                 dataType: "json",
//                 success: function (data) {
//                     if (data.Status === '200') {
//                         console.log(data.Description)
//                     } else {
//                         alert(data.Description)
//                     }
//                 },
//                 error: function (data) {
//
//                 }
//             },);});


    $("#stamp1").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 1,
                    "Row": 1
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status ==200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
        var stamp1 = document.getElementById("stamp1");//设置盖章按钮为不可用
        stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp1').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp1').val(P2.shape);
            currentPlayer = P1.id;
        }
    });
    $("#stamp2").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 1,
                    "Row": 2
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
        var stamp1 = document.getElementById("stamp2");//设置盖章按钮为不可用
        stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp2').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp2').val(P2.shape);
            currentPlayer = P1.id;
        }
    });
    $("#stamp3").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 1,
                    "Row": 3
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
            var stamp1 = document.getElementById("stamp3");//设置盖章按钮为不可用
            stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp3').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp3').val(P2.shape);
            currentPlayer = P1.id;
        }
        });
    $("#stamp4").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 2,
                    "Row": 1
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
            var stamp1 = document.getElementById("stamp4");//设置盖章按钮为不可用
            stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp4').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp4').val(P2.shape);
            currentPlayer = P1.id;
        }
        });
    $("#stamp5").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 2,
                    "Row": 2
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status ==200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
            var stamp1 = document.getElementById("stamp5");//设置盖章按钮为不可用
            stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp5').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp5').val(P2.shape);
            currentPlayer = P1.id;
        }
        });
    $("#stamp6").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 2,
                    "Row": 3
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
            var stamp1 = document.getElementById("stamp6");//设置盖章按钮为不可用
            stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp6').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp6').val(P2.shape);
            currentPlayer = P1.id;
        }
        });
    $("#stamp7").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 3,
                    "Row": 1
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
            var stamp1 = document.getElementById("stamp7");//设置盖章按钮为不可用
            stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp7').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp7').val(P2.shape);
            currentPlayer = P1.id;
        }
        });
    $("#stamp8").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 3,
                    "Row": 2
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                        console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
        var stamp1 = document.getElementById("stamp8");//设置盖章按钮为不可用
        stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp8').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp8').val(P2.shape);
            currentPlayer = P1.id;
        }
    });
    $("#stamp9").click(function () {
        $.ajax({
            type: "POST",
            url: "http://10.1.1.136:8080/v1/board/move",
            cache: true,
            data: JSON.stringify({
                "Mover": currentPlayer,
                "Pos": {
                    "Col": 3,
                    "Row": 3
                }
            }),
            dataType: "json",
            success: function (data) {
                if (data.Status == 200) {
                    if (data.Description=="move success"){
                    console.log(data.Description)
                    }
                    else {
                        alert(data.Description)
                    }
                } else {
                    alert(data.Description)
                }
            },
            error: function (data) {

            }
        },);
        var stamp1 = document.getElementById("stamp9");//设置盖章按钮为不可用
        stamp1.disabled = true;
        if (P1.id === currentPlayer) {
            $('#stamp9').val(P1.shape);
            currentPlayer = P2.id;
        } else if (P2.id === currentPlayer) {
            $('#stamp9').val(P2.shape);
            currentPlayer = P1.id;
        }
    });






