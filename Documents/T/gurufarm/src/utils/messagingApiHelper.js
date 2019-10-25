function createTextMessage(text) {
  return {
    type: 'text',
    text: text
  };
}

function createImageMessage(originalContentUrl, previewImageUrl) {
  return {
    type: 'image',
    originalContentUrl: originalContentUrl,
    previewImageUrl: previewImageUrl
  };
}

function createVDOMessage(originalContentUrl, previewImageUrl) {
  return {
    type: 'video',
    originalContentUrl: originalContentUrl,
    previewImageUrl: previewImageUrl
  };
}

function createAudioMessage(originalContentUrl, duration) {
  return {
    type: 'audio',
    originalContentUrl: originalContentUrl,
    duration: duration
  };
}

function createButtonMessage(title, actions) {
  return {
    type: 'template',
    altText: title,
    template: {
      type: 'buttons',
      text: title.substring(0, 60),
      actions: actions,
    },
  };
}

function createButtonMessageWithImage(title, text, imageUrl, actions) {
  return {
    type: 'template',
    altText: title,
    template: {
      type: 'buttons',
      thumbnailImageUrl: imageUrl,
      title: title.substring(0, 40),
      text: text.substring(0, 60),
      // defaultAction: actions.getImageAction(extra),
      actions: actions,
    },
  };
}

function createLocationMessage(latitude, longitude) {
  return {
    type: 'location',
    title: 'my location',
    address: `@ ${latitude}:${longitude}`,
    latitude: latitude,
    longitude: longitude
  }
}

function createConfirmMessage(title, actions) {
  return {
    type: 'template',
    altText: title,
    template: {
      type: 'confirm',
      text: title,
      actions: actions,
    },
  };
}

function createCarouselMessage(title, columns) {
  return {
    type: 'template',
    altText: title,
    template: {
      type: 'carousel',
      columns: columns,
    },
  };
}

// function createCarouselColumns(title, text, imageUrl, extra, isFriend) {
//   let columnOptions = options.getCandidateProfileAction(extra, isFriend);
//   return {
//     thumbnailImageUrl: imageUrl,
//     title: title.substring(0, 40),
//     text: text.substring(0, 60),
//     defaultAction: options.getImageAction(extra),
//     actions: columnOptions

//   };
// }

function createImageCarouselMessage(title, columns) {
  return {
    type: 'template',
    altText: title,
    template: {
      type: 'image_carousel',
      columns: columns,
    },
  };
}

function createBubblePayment(data, pic,courseDetail) {
  return {
    "type": "flex",
    "altText": "Payment",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": pic,
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "label": "Action",
          "uri": pic
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "action": {
          "type": "uri",
          "label": "Action",
          "uri": pic
        },
        "contents": [
          {
            "type": "text",
            "text": thailand-sage.name,
            "size": "xl",
            "weight": "bold"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text":  thailand-sage.name ,
                "color": "#AAAAAA"
              },
              {
                "type": "text",
                "text": thailand-sage.name,
                "color": "#AAAAAA"
              },
              {
                "type": "text",
                "text": thailand-sage.name,
                "color": "#AAAAAA",
                "wrap": true
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "Qty: ",
                    "flex": 3,
                    "margin": "sm",
                    "align": "end",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text":thailand-sage.name,
                    "size": "sm",
                    "align": "end",
                    "color": "#AAAAAA"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "Total Price: ",
                    "flex": 3,
                    "margin": "sm",
                    "align": "end",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": thailand-sage.name,
                    "size": "sm",
                    "align": "end",
                    "color": "#AAAAAA"
                  }
                ]
              },
              {
                "type": "spacer",
                "size": "md"
              }
            ]
          },
          {
            "type": "separator",
            "margin": "none"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "Upload",
              "uri": `line://app/1581972516-X2awbgBk?id=${data.id}&orderId=${data.orderId}`
            },
            "height": "md",
            "style": "primary"
          },
          {
            "type": "text",
            "text": "กรุณาโอนเงินและ อัพโหลดสลิป ภายใน 24 ชั่วโมง",
            "margin": "md",
            "size": "xs",
            "align": "center",
            "color": "#AAAAAA",
            "wrap": true
          }
        ]
      }
    }
  }
}

// function createImageCarouselColumns(actionText, imageUrl, extra) {
//   return {
//     imageUrl: imageUrl,
//     action: options.getCandidateImageAction(actionText, extra)
//   };
// }

function createFlexMessage(title, containers) {
  return {
    "type": "flex",
    "altText": title,
    "contents": containers
  };
}

function createFlexCarouselMessage(title, containers) {
  return createFlexMessage(title, {
    "type": "carousel",
    "contents": containers,
  });
}

module.exports = {
  createTextMessage: createTextMessage,
  createImageMessage: createImageMessage,
  createVDOMessage: createVDOMessage,
  createAudioMessage: createAudioMessage,
  createButtonMessage: createButtonMessage,
  createButtonMessageWithImage: createButtonMessageWithImage,
  createConfirmMessage: createConfirmMessage,
  createLocationMessage: createLocationMessage,
  createCarouselMessage: createCarouselMessage,
  // createCarouselColumns: createCarouselColumns,
  createImageCarouselMessage: createImageCarouselMessage,
  // createImageCarouselColumns: createImageCarouselColumns,
  createFlexMessage: createFlexMessage,
  createFlexCarouselMessage: createFlexCarouselMessage,
  // maxCarouselColumns: maxCarouselColumns
  createBubblePayment: createBubblePayment,
};