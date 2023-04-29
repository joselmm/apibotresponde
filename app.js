/*Dependencias de puppeter en shell
(para poderlas instalar en linux -distribucion Debian):


sudo apt-get install -y libxkbcommon-x11-0
sudo apt-get install -y libgtk-3-0
sudo apt-get install -y libgbm1
*/

//const puppeteer = require('puppeteer-extra');
/* const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin()) */
const puppeteer = require('puppeteer');
//const puppeteer = require('puppeteer-core');
const fetch = require('node-fetch');
require('dotenv').config();
let browser = '';
const fs = require('fs').promises;
const port = process.env.PORT || 8080;
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var refreshingThePoePage = false;
const browserPromise = puppeteer.launch({
  headless: true,
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--single-process',
    '--no-zygote',
  ],
  executablePath:
    process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
});
/* process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(), */
browserPromise
  .then(async (browserResult) => {
    //script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec
    https: browser = browserResult;
    app.listen(port, () => {
      console.log(`Servidor de Express escuchando en el puerto ${port}`);
    });
    console.log('el navegador esta lanzado');
  })
  .catch((error) => {
    console.error('Error al lanzar el navegador:', error);
  });
var pageChatGPT = false;
/* https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=actualizar&date=12345&codigo=6789
https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=consultar */
var respondiendo = []
var chats = [];
var chatsUrl = [];
/* {
    nickname:"cabybara"
    responding:false
} */
async function lanzarEiniciar() {
  var page = await browser.newPage();

  // Escuchar el evento 'response' para capturar las respuestas HTTP
  var urls = [];
  var sageChatInfo = false;
  page.on('response', async (response) => {
    if(!response.url().includes("https://poe.com/_next/data"))return;
    
    //  console.log(`Respuesta HTTP de redirección recibida: ${response.url()}`);
      //console.log(`Encabezados de la respuesta: ${JSON.stringify(response.headers())}`);
/*     } else {
      console.log(`Respuesta HTTP recibida: ${response.url()}`);
      //console.log(`Encabezados de la respuesta: ${JSON.stringify(response.headers())}`);
      const responseBody = await response.text();
      console.log(`Cuerpo de la respuesta: ${responseBody}`); */
      var myregex=/https:\/\/poe\.com\/_next\/data\/.+\/.+\.json\?handle=.+/
      var url = response.url();
      if(myregex.test(url) && chatsUrl.indexOf(url)===-1){
        chatsUrl.push(url)
        //console.log(url)
        //sageChatInfo=true;
        
        var resp = await page.evaluate(async (url)=>{
            return await fetch(url)
            .then(res=>res.json())
            .then(res=> res)
        },url)

        if(resp.pageProps?.payload.chatOfBotDisplayName.defaultBotObject.messageLimit.dailyLimit===null){
            
            chats.push((resp));
            respondiendo.push({
                nickname:resp.pageProps.payload.chatOfBotDisplayName.defaultBotObject.nickname,
                responding:false,
                answer:""
            })
            if(respondiendo.length===4){
                console.log(respondiendo)
            }
            
            //console.log(resp.pageProps.payload.chatOfBotDisplayName.defaultBotObject.displayName);
        }
      }
      
    
  });
  
  //await page.goto(videoUrl);
  await page.goto('https://poe.com');
  //await page.screenshot({"path":"y2mate-search.jpg"});
  // Establecer la cookie en la página
  // Habilitar el monitoreo de la red
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  // Capturar los mensajes recibidos a través del WebSocket
  client.on('Network.webSocketFrameReceived', ({ response }) => {
    var message = JSON.parse(JSON.parse(response.payloadData).messages[0]);
    if(message.payload.data.messageAdded?.state==="complete"){
        
            if(responsing && message.payload.data.messageAdded.author==="chinchilla"){
                console.log(message);
                responsing = false;
                answer=message.payload.data.messageAdded.text;
               // console.log(message.payload.data.messageAdded.text)
        
        }
       // console.log(`Mensaje recibido a través del WebSocket: ${ typeof response.payloadData}`);
       
    }
    
  });

  var accountInfo = await page.evaluate(async ()=>{
    return await fetch("https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec")
.then(res=>res.json()).then(obj=>obj)
  });

  await page.evaluate(()=>{
  document.querySelectorAll(".Button_buttonBase__0QP_m.Button_flat__1hj0f")[1].click()
  });
  await wait(1202)
  
  console.log("escribiendo correo "+accountInfo.correo)
  await page.type(".EmailInput_emailInput__4v_bn",accountInfo.correo)

  await wait(1256)

  await page.click(".Button_buttonBase__0QP_m.Button_primary__pIDjn")
  console.log("esperando 15 segundos por codigo")
  await wait(15000)
  var accountInfo = await page.evaluate(async ()=>{
    return await fetch("https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec")
.then(res=>res.json()).then(obj=>obj)
  });

  await page.type(".VerificationCodeInput_verificationCodeInput__YD3KV",accountInfo.codigo)

  await wait(15000)
  await page.click(".Button_buttonBase__0QP_m.Button_primary__pIDjn")
  console.log("ya se ingrso el codigo, esperando 10 segundos")
  /* // Capturar los mensajes enviados a través del WebSocket
  client.on('Network.webSocketFrameSent', ({ response }) => {
    console.log(`Mensaje enviado a través del WebSocket: ${response.payloadData}`);
  }); */
  /* var cookiesString = await fs.readFile('./cookies.json');
  var cookies = JSON.parse(cookiesString); */
  //await page.setCookie(...cookies)
    //var expirationDateInSeconds = expirationDate.getTime() / 1000;
   /*  await page.setCookie({
    name: 'p-b',
    value: "UJ20GQHgs69XdVxubiPn4g%3D%3D",
    domain: 'poe.com',
    path: '/',
    expires: 1716947245.418632,
    size: 31,
    httpOnly: true,
    secure: true,
    session: false,
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
  }); */
  /*
 
  
  [
    {
        "domain": "poe.com",
        "expirationDate": 1716947245.418632,
        "hostOnly": true,
        "httpOnly": true,
        "name": "p-b",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "UJ20GQHgs69XdVxubiPn4g%3D%3D"
    }
]
 
  */

 
  /* var local = ['poe-tchannel-channel', "poe-chan58-8888-qwkyhmebzruujafjrgim"];
  await page.evaluate((local) => {
    const [key, value] = local;
    localStorage.setItem(key, value);
  }, local); */
  /* await page.close();
    return resp; */
  await wait(5621);
  /* await page.reload(); */
  console.log('yendo a chat gpt');
  await page.goto("https://poe.com/ChatGPT");
  
  await wait(2300);
  pageChatGPT = page;
  /* var cookies = await page.cookies()
  await fs.writeFile("./cookies.json",JSON.stringify(cookies, null, 2)) */
  console.log('la pagina esta lista para recibir solicitudes');
  //console.log(respondiendo)
  /* elemento para ir al chat gpt
"a[href='/chatgpt']"
*/

  /* ELemento que aparece cuando termina de escribiruna respuesta, es el elemto de like y dislike
document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I")
*/
  await page.setViewport({ width: 375, height: 667 });
  await page
    .screenshot()
    .then(async (screenshotBuffer) => {
      const base64Image = screenshotBuffer.toString('base64');
      var payload = {
        archivo_name: 'poeshell.jpg',
        file_mime: 'image/jpeg',
        archivo_base64: base64Image,
      };

      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          resp = res;
        });
    })
    .catch((error) => {
      console.log('Error al capturar la pantalla:', error);
    });
  /* await page.close();
    return resp; */
    //await wait(3000)
   /* enviarMensaje(
    {
        chatName:"Sage",
        clearContext:true,
        message:"cuanto es 9x8"  
    }
   ) */
   
}

(async () => {
  browserPromise
    .then(async (browserResult) => {
      browser = browserResult;
      setTimeout(async () => {
        lanzarEiniciar();
        //var result= await searchVideoByUrl("https://www.youtube.com/watch?v=Qh4-hTA-Xgg")
        //console.log(result)
      }, 2000);
    })
    .catch((error) => {
      console.error('Error al lanzar el navegador:', error);
    });
})();

app.get('/refresh', async (req, res) => {
  var respuesta = {
    noError: true,
  };
  if (refreshingThePoePage){
    respuesta.noError=false;
    respuesta.message = "The page is already reloading";
    res.json(respuesta);
    return
  }
  if (responsing){
    respuesta.noError=false;
    respuesta.message = "The chat is currently responsing a request";
    res.json(respuesta);
    return
  }
  
  if(!pageChatGPT){
    respuesta.noError = false;
    respuesta.message = "stoped";
    res.json(respuesta);
    return
  }

  try {
     refreshingThePoePage = true; 
     await new Promise(async (resolve)=>{
        for (let i = 0; i < 20; i++) {
            
            try {
                await pageChatGPT.goto('https://poe.com/ChatGPT');
                
                
                await pageChatGPT.waitForSelector(
                  '.ChatMessageInputView_textInput__Aervw',
                  { timeout: 4000 }
                );
                // Si se encuentra el selector, se ejecutan estas instrucciones:
                console.log('Se encontró el selector durandte el refresh.');
                resolve(true);
                break;
              } catch (error) {
                // Si no se encuentra el selector, se ejecutan estas instrucciones:
                console.log('No se encontró el selector durante el refresh. iteracion: '+i);
                if(i===19){
                    respuesta.message = "no se pudo encontrar el selector de textarea para escribir mensajes"
                    respuesta.noError = false;
                    resolve(false);
                }else{
                    await pageChatGPT.goto('https://poe.com/ChatGPT');
                }
                
                //await pageChatGPT.waitForNavigation();
              }
        }
    })
    
    //await pageChatGPT.click('a[href="/GPT-4"]');
    await wait(4000)
    var payload={};
    await pageChatGPT
      .screenshot()
      .then(async (screenshotBuffer) => {
        const base64Image = screenshotBuffer.toString('base64');
        payload = {
          archivo_name: Date.now() + '.jpg',
          file_mime: 'image/jpeg',
          archivo_base64: base64Image,
        };

        
      })
      .catch((error) => {
        console.log('Error al capturar la pantalla:', error);
      });
      await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res2) => {
            //console.log(res2)
          respuesta.screenshot = res2.downloadLink;
          respuesta.date = Number(res2.fileName.slice(0,-4));
        });
        
  } catch (error) {
    respuesta.noError = false;
    respuesta.message = error.message;
  }

  refreshingThePoePage = false;
  res.json(respuesta);
});


var answer = "";
var responsing = false;
app.post('/talk', express.json(), async function (req, res) {
    //console.log(typeof req.body)
    
  const reqBody = req.body;
  var respuesta = {
    noError: true,
  };
  if(!pageChatGPT){
    respuesta.noError = false;
    respuesta.message = 'the page has been stoped';
    res.json(respuesta);
    return;
    }
  if (refreshingThePoePage) {
    respuesta.noError = false;
    respuesta.message = 'The page is currently refreshing';
    res.json(respuesta);
    return;
  }
  if(!reqBody.message){
    respuesta.noError=false;
    respuesta.message="falta el mensaje o promt"
    res.json(respuesta);
    return
    } 

    //console.log(videoUrl )
    
    

    respuesta = await talk(reqBody);
    
    res.json(respuesta)

    return ;

  
});

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function talk(cuerpo) {
    responsing=true;
  if (cuerpo.clearContext) {
    await pageChatGPT.click('.ChatMessageInputView_paintbrushWraper__DHMNW');
    // document.querySelector(".ChatMessageInputView_paintbrushWraper__DHMNW").click()
  }
  await pageChatGPT.evaluate((promt_recibido) => {
    document.querySelector('.ChatMessageInputView_textInput__Aervw').value =
      promt_recibido;
  }, cuerpo.message);
  await pageChatGPT.click(
    '.Button_buttonBase__0QP_m.Button_primary__pIDjn.ChatMessageInputView_sendButton__reEpT'
  );

        var valor = await new Promise(async (resolve,reject)=>{
        for (let i = 0; i < 100; i++) {
            await wait(500);
            
            if(!responsing){
                resolve(answer);
            }
        }
        }).then(res=>res);
        //console.log(valor)
        var respuesta=
        {
            noError:true,
            botRespuesta:valor
        }
        return  respuesta;

}

async function enviarMensaje(params) {
    // Registra una función de devolución de llamada para capturar los mensajes de consola
    pageChatGPT.on('console', msg => {
        for (let i = 0; i < msg.args.length; ++i)
        console.log(`${i}: ${msg.args[i]}`);
    });
    var message = params.message;
    var clearContext = params.clearContext || false;
    var chatName = params.chatName || "ChatGPT";
   // console.log(chatName)
    
    var chatInfo = chats.filter((chat)=>{
        if(chat.pageProps.payload.chatOfBotDisplayName.defaultBotObject.displayName==chatName){
            return chat;
        }
    })[0];
    

    var responsingChat = respondiendo.filter((e)=>{
        if(chatInfo.pageProps.payload.chatOfBotDisplayName.defaultBotObject.nickname===e.nickname){
            return e
        }
    })[0]

    if(responsingChat.responding){
        return {
            noError: false,
            message: chatInfo.pageProps.payload.chatOfBotDisplayName.defaultBotObject.displayName+" esta respondiendo otra pregunta"
        }
    }


    for (let i = 0; i < respondiendo.length; i++) {
        if(respondiendo[i].nickname===responsingChat.nickname){
            respondiendo[i].responding = true;
        }
    }
    //rerturn
   // console.log("log por aqui")
    //console.log(message)

    console.log(chatInfo.pageProps.payload.chatOfBotDisplayName.chatId)
    console.log(chatInfo.pageProps.payload.chatOfBotDisplayName.defaultBotObject.nickname)
    console.log(message)
    console.log(clearContext)
    console.log(chatInfo.formkey)
     
    
    var respAPost= await pageChatGPT.evaluate(async(chatInfo, message, clearContext)=>{
    console.log(message)
    console.log(clearContext)
    console.log(chatInfo.formkey)
        console.log(chatInfo.pageProps.payload.chatOfBotDisplayName.chatId);
        console.log(chatInfo.pageProps.payload.chatOfBotDisplayName.defaultBotObject.nickname);
    
        function generarId(longitud) {
            var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var idAleatorio = '';
            for (var i = 0; i < longitud; i++) {
            idAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            return idAleatorio;
            }
            
            var payload = {
            "queryName": "chatHelpers_sendMessageMutation_Mutation",
            "variables": {
                
            "chatId": chatInfo.pageProps.payload.chatOfBotDisplayName.chatId,
            "bot": chatInfo.pageProps.payload.chatOfBotDisplayName.defaultBotObject.nickname,
            "query": message,
            "source": null,
            "withChatBreak": clearContext,
            "clientNonce":"Xa8nG0sH34GM5vEK" || generarId(16)
            },

            "query": "mutation chatHelpers_sendMessageMutation_Mutation(\n  $chatId: BigInt!\n  $bot: String!\n  $query: String!\n  $source: MessageSource\n  $withChatBreak: Boolean!\n  $clientNonce: String\n) {\n  messageEdgeCreate(chatId: $chatId, bot: $bot, query: $query, source: $source, withChatBreak: $withChatBreak, clientNonce: $clientNonce) {\n    chatBreak {\n      cursor\n      node {\n        id\n        messageId\n        text\n        author\n        suggestedReplies\n        creationTime\n        state\n      }\n      id\n    }\n    message {\n      cursor\n      node {\n        id\n        messageId\n        text\n        author\n        suggestedReplies\n        creationTime\n        state\n        clientNonce\n        chat {\n          shouldShowDisclaimer\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
        }
            
            return await fetch("https://poe.com/api/gql_POST", {
            "method": "POST",
            "headers": {
            
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
            "Accept": "*/*",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json",
            "poe-formkey": chatInfo.formkey,
            "poe-tag-id":"c1565c074c581a1931c308fd87019b77",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
            },
            "body": JSON.stringify(payload),
            "credentials": "include"
            }).then(res=>res.text())
        },chatInfo, message, clearContext)
            console.log(respAPost)
        var valor = await new Promise(async (resolve,reject)=>{
            for (let i = 0; i < 100; i++) {
                await wait(500);
                var responsingChat = respondiendo.filter((e)=>{
                    if(chatInfo.pageProps.payload.chatOfBotDisplayName.defaultBotObject.nickname===e.nickname){
                        return e
                    }
                })[0]
                if(!responsingChat.responding){
                    resolve(responsingChat.answer);
                }
            }
        }).then(res=>res);
        //console.log(valor)
        var respuesta=
        {
            noError:true,
            botRespuesta:valor
        }
        return  respuesta;
}
