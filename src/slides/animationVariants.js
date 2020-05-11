import {teal} from 'material-ui-colors';

export const stateVariants = {
  active: {
    opacity: 1
  },
  inactive: {
    opacity: 0.4
  }
};

export const leftArrowVariants = {
  idle: {
    rotate: 135,
    scale: 1
  },
  tapped: {
    rotate: 135,
    scale: 1.5,
    borderColor: teal[700]
  }
};

export const rightArrowVariants = {
  idle: {
    rotate: -45,
    scale: 1
  },
  tapped: {
    rotate: -45,
    scale: 1.5,
    borderColor: teal[700]
  }
};

export const upArrowVariants = {
  idle: {
    rotate: -135,
    scale: 1
  },
  tapped: {
    rotate: -135,
    scale: 1.5,
    borderColor: teal[700]
  }
}

export const downArrowVariants = {
  idle: {
    rotate: 45,
    scale: 1
  },
  tapped: {
    rotate: 45,
    scale: 1.5,
    borderColor: teal[700]
  }
}

export const trackerVariants = {
  topLeft: {
    top: '25px',
    left: '25px'
  },
  topRight: {
    top: '25px',
    left: '417px'
  },
  bottomRight: {
    top: '417px',
    left: '417px'
  },
  bottomLeft: {
    top: '417px',
    left: '25px'
  }
};
