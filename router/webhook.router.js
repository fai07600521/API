'use strict';
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const config = require('./../config.json');
const { Router } = require('express');
const MongodbConnect = require('../lib/mongo_connect');
const client = new line.Client(config);

const url = 'mongodb+srv://ping-user_00:65e5e8jyYmKo7Flk@guru-farm-cluster-jllnm.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'guru';

const mongo = new MongodbConnect();

async function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event);
        case 'image':
          return handleImage(message, event);
        case 'video':
          return handleVideo(message, event);
        case 'audio':
          return handleAudio(message, event);
        case 'location':
          return handleLocation(message, event);
        case 'sticker':
          return handleSticker(message, event);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      const profile = await client.getProfile(event.source.userId);
      const followText = `สวัสดีคุณ ${profile.displayName} ยินดีต้อนรับครับ`;
      return client.replyMessage(event.replyToken, { type: 'text', text: followText });

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      const joinText = `Joined ${event.source.type}`;
      return client.replyMessage(event.replyToken, { type: 'text', text: joinText });

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      const postbackText = `Got postback: ${data}`;
      return client.replyMessage(event.replyToken, { type: 'text', text: postbackText });

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      const beaconText = `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`;
      return client.replyMessage(event.replyToken, { type: 'text', text: beaconText });

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

async function handleText(message, event) {
  if(message.text === 'กลุ่มคนเกษตร'){
    const result = await mongo.getallresult('thailand-sage');
    const msg = await createBubble(result);
  
    try {
      return client.replyMessage(event.replyToken,msg);
    }catch(err) {
      // console.log(err.originalError.response.data);
      console.log(err.message);
    }
    
  }else{
    return client.replyMessage(event.replyToken, { type: 'text', text: message.text });
  }
}

function handleImage(message,event ){
  const client = new line.Client({
    channelAccessToken: '0BuQOhbUCpoSAfZ8MqK90QNcy2B7oBZyw24UbM+R9fwD5mTAf5awzoMOvL4OfIM/yYDzZAd8vqvn6fux7X7YWOkmf9BVPMurInok59ESrUY3AHAJg7NIG5izhJcmk7kJwFOh8q5ChVnxWkve4V8I5wdB04t89/1O/w1cDnyilFU='
  });
  client.getMessageContent(message.id)
  .then((stream) => {
    stream.on('data', (chunk) => {
      console.log("success",chunk)
    });
    stream.on('error', (err) => {
      console.log("fail",err)
    });
  });
  
  return client.replyMessage(event.replyToken, {type: 'text', text: 'Got Image'})
}

function handleVideo(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Video' });
}

function handleAudio(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Audio' });
}

function handleLocation(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Location' });
}

function handleSticker(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Sticker' });
}

async function createBubble(data){
  const flexContent = data.map(list => {  
 
       return {
  type: "flex",
  altText: "Flex Message",
  contents: {
    type: "carousel",
    contents: [
      {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover"
        },
        body: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "text",
              text: "Arm Chair, White",
              size: "xl",
              weight: "bold",
              wrap: true
            },
            {
              type: "box",
              layout: "baseline",
              contents: [
                {
                  type: "text",
                  text: "$49",
                  flex: 0,
                  size: "xl",
                  weight: "bold",
                  wrap: true
                },
                {
                  type: "text",
                  text: ".99",
                  flex: 0,
                  size: "sm",
                  weight: "bold",
                  wrap: true
                }
              ]
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "Add to Cart",
                uri: "https://linecorp.com"
              },
              style: "primary"
            },
            {
              type: "button",
              action: {
                type: "uri",
                label: "Add to whishlist",
                uri: "https://linecorp.com"
              }
            }
          ]
        }
      },
      {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover"
        },
        body: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "text",
              text: "Metal Desk Lamp",
              size: "xl",
              weight: "bold",
              wrap: true
            },
            {
              type: "box",
              layout: "baseline",
              flex: 1,
              contents: [
                {
                  text: "$11",
                  flex: 0,
                  size: "xl",
                  weight: "bold",
                  wrap: true
                },
                {
                  type: "text",
                  text: ".99",
                  flex: 0,
                  size: "sm",
                  weight: "bold",
                  wrap: true
                }
              ]
            },
            {
              type: "text",
              text: "Temporarily out of stock",
              flex: 0,
              margin: "md",
              size: "xxs",
              color: "#FF5551",
              wrap: true
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "Add to Cart",
                uri: "https://linecorp.com"
              },
              flex: 2,
              color: "#AAAAAA",
              style: "primary"
            },
            {
              type: "button",
              action: {
                type: "uri",
                label: "Add to wish list",
                uri: "https://linecorp.com"
              }
            }
          ]
        }
      },
      {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "See more",
                uri: "https://linecorp.com"
              },
              flex: 1,
              gravity: "center"
            }
          ]
        }
      }
    ]
  }
}
})
 const msg = {
    type: 'flex',
    altText: 'Event List',
    contents: {
        type: 'carousel',
        contents: flexContent,
    },    
  }
  return msg;
}



const webhookLineRouter = Router();
webhookLineRouter.post('/', (req, res) => {

  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    // check verify webhook event
    if (event.source.userId === 'Udeadbeefdeadbeefdeadbeefdeadbeef') {
      return;
    }
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
})

 
module.exports = webhookLineRouter;
