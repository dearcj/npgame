import {$, _} from "./main";
declare let VK: any;
declare let FB: any;
declare let CryptoJS: any;
declare let APP_ADDRESS;
declare let OK_APP_ID: any;
declare let twttr: any;
declare let TW_CONSUMER_KEY: any;

export function vkpost(text: string) {


    function authInfo(response) {
        _.game.submitScore(_.game.score, 'VK:' + response.session.mid,  response.session.user.first_name, response.session.user.last_name);

        if (response.session) {
            VK.api('wall.post', {
                message: text,
                attachments: [(<any>window).VK_PHOTO_LINK ]
            },function(data) {
                console.log(JSON.stringify(data));

                if (data.response) {
                }
            });
        } else {
        }
    }
    VK.Auth.login(authInfo);
}


export function okpost(t) {
    var attachtment =  {"media": [



            /* {
                 "type": "link",
                 "url": LINK_SITE
             },
             {
                 "type": "text",
                 "text": "asdasdasdasd"
             },
             {
                 "type": "app",
                 "text": "Text above image",
                 "images": [
                     {
                         "url": "http://r.mradx.net/img/38/F3C336.jpg",
                         "mark": "prize_1234",
                         "title":"Hover Text!"
                     }
                 ],
                 "actions": [
                     {"text":"Hello",
                         "mark":"hello"}
                 ]

             }*/
        ]
    };

    $.post("http://www.odnoklassniki.ru/oauth/authorize?client_id=" + OK_APP_ID.toString() +"&response_type=code&redirect_uri=" + encodeURIComponent(APP_ADDRESS)).done(( data ) => {

    });


//    $.get("http://www.odnoklassniki.ru/oauth/authorize?client_id=" + OK_APP_ID.toString() +"&response_type=code&redirect_uri=" + encodeURIComponent(APP_ADDRESS)).done(( data ) => {

  //  });


    //let atStr =encodeURIComponent(JSON.stringify(attachtment));
    //let sign =  CryptoJS.MD5(encodeURIComponent("st.attachment=") + atStr + encodeURIComponent("18DAB712D1473119BC78A7E6"));
    //window.open("http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + window.LINK_GAME +"&st.comments=" + encodeURI(t));

//        window.open("https://connect.ok.ru/oauth/authorize?client_id=1246674688&scope=VALUABLE_ACCESS;&response_type=token&redirect_uri=http://localhost/");
    /* $.post( "https://connect.ok.ru/oauth/authorize?client_id=1246674688&scope=VALUABLE_ACCESS;&response_type=token", function( data ) {
         console;
     });*/

    /*
            window.open("http://connect.ok.ru/dk?st.cmd=WidgetMediatopicPost&" +
                    "st.app=1246674688&" +
                    "st.attachment=" + atStr +"&" +
                    "st.signature=" + sign + "&" +
                   // "st.return={return_url}&" +
                  //  "st.popup=on&" +
                  //  "st.silent={silent}&" +
                    "st.utext="+ x);
    */
}

export function twpost(t, img, imgNo, hash) {
    let x = encodeURI(t);
    let href="https://twitter.com/intent/tweet?" +
        "url" + APP_ADDRESS +
        "&text=" + x + hash;
    twttr.connect((data)=>{
        console.log(data);
    })
    window.open(href);
}

export function fbpost() {
    FB.login(function(response){
        let accessToken = response.authResponse.accessToken;
        FB.api('/me', 'get', {fields: "name"}, (x) => {
            _.game.submitScore(_.game.score, 'FB:' + x.id,  x.name, "");

            FB.ui(
                {  method: 'feed',
                    link: (<any>window).LINK_TO_SOCIAL,
                    name: "Level",
                    caption: "",
                    description: "text",
                });
        });


        // Handle the response object, like in statusChangeCallback() in our demo
        // code.
    });

    /*  attachment: {
                     name: 'Name here',
                     caption: 'Caption here.',
                     description: (
                             'description here'
                     ),
                     href: ''
                 },*/
    /* action_links: [
         { text: 'Code', href: 'action url here' }
     ],*/

   /* FB.ui(
        {  method: 'feed',
            link: (<any>window).LINK_GAME,
            picture: img,
            name: "Игра «Волки и овцы: Бе-е-е-зумное превращение»",
            caption: "SHEEPANDWOLVES.RU/GAME",
            description: "Играй в игру, становись участником конкурса и получи шанс выиграть крутую майку от создателей мультфильма «Волки и овцы: Бе-е-е-зумное превращение»",


        },



        function(response) {
            function loadScript(url, callback){

                var script = document.createElement("script")
                script.type = "text/javascript";

                if (script.readyState){  //IE
                    script.onreadystatechange = function(){
                        if (script.readyState == "loaded" ||
                            script.readyState == "complete"){
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {  //Others
                    script.onload = function(){
                        ///    callback();
                    };
                }

                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            }




            if (response && response.post_id) {
                alert('Post was published.');
            } else {
                alert('Post was not published.');
            }
        }
    );*/
}