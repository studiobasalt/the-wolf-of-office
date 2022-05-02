async function soundBoardModal(webClient, trigger_id){
    await webClient.views.open({
      trigger_id: trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "My App"
        },
        close: {
          type: "plain_text",
          text: "Close"
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Hi there!"
            }
          }
        ]
      }
    });
}

export default soundBoardModal
