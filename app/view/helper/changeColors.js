var buttons = [0,0,0];

getButtonsInterval = 1000;

defaultClearColor = '#A2BED8';
redClearColor =  '#d98282';
blueClearColor = '#77a9d8';
yellowClearColor = '#ece686';

purpleClearColor = '#d982d0';
orangeClearColor = '#d9a782';
greenClearColor = '#8cd982';

grayClearColor = '#d9d9d9';

setInterval(function() {
  if (scene) colorButtonPressed(buttons);
}, getButtonsInterval);

function colorButtonPressed(buttons){
  // Single Buttons
  if (buttons[0] && !buttons[1] && !buttons[2]) scene.fog.color.set(redClearColor);
  if (buttons[1] && !buttons[0] && !buttons[2]) scene.fog.color.set(blueClearColor);
  if (buttons[2] && !buttons[0] && !buttons[1]) scene.fog.color.set(yellowClearColor);

  // Combination Buttons
  if (buttons[0] && buttons[1] && !buttons[2]) scene.fog.color.set(purpleClearColor);
  if (buttons[0] && !buttons[1] && buttons[2]) scene.fog.color.set(orangeClearColor);
  if (!buttons[0] && buttons[1] && buttons[2]) scene.fog.color.set(purpleClearColor);

  // All Buttons
  if (buttons[0] && buttons[1] && buttons[2]) scene.fog.color.set(grayClearColor);

  // No Buttons
  if (!buttons[0] && !buttons[1] && !buttons[2]) scene.fog.color.set(defaultClearColor);
}