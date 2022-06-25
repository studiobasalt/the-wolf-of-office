import soundRegistrations from "../../../../res/sound-registration.js"

// For each option get a optionview with the option label and value
function renderOptions(){
  return soundRegistrations.map(soundRegistration => {
    return renderOptionView(`${soundRegistration.name} - ${soundRegistration.description}`, soundRegistration.name)
  })
}

function renderOptionView(label, value){
  return {
    "text": {
      "type": "plain_text",
      "text": label,
      "emoji": true
    },
    "value": value
  }
}

function generateSoundboardView() {
  return {
    "title": {
      "type": "plain_text",
      "text": "Soundboard"
    },
    "type": "modal",
    "close": {
      "type": "plain_text",
      "text": "Close"
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit"
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "This is a plain text section block.",
          "emoji": true
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select an item",
              "emoji": true
            },
            "options": renderOptions(),
            "action_id": "playsound_input"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Play sound",
              "emoji": true
            },
            "action_id": "playsound_from_input"
          }
        ]
      }
    ]
  }
}

export default generateSoundboardView