// EYES

const moveEye = (tag, mouseX, mouseY) => {
  // center of the eye
  const eyeMidX = tag.getBoundingClientRect().left;
  const eyeMidY = tag.getBoundingClientRect().top;

  // find the difference between the eye and the mouse
  const diffX = mouseX - eyeMidX;
  const diffY = mouseY - eyeMidY - window.pageYOffset;

  // pythagoras theorem
  const diff = Math.sqrt(diffX * diffX + diffY * diffY);

  // what is the capped radius
  const radius = Math.min(3, diff);
  // tan in math
  const angle = Math.atan2(diffY, diffX);

  // let's get the capped version on this based on the angle
  const cappedX = radius * Math.cos(angle);
  const cappedY = radius * Math.sin(angle);

  const eyeTag = tag.querySelector('div');

  eyeTag.style.left = `${cappedX}px`;
  eyeTag.style.top = `${cappedY}px`;
};

export default {
  moveEye,
};
