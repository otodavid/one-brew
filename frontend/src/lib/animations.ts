export const sideNavVariant = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },

  exit: {
    x: '100vw',
    opacity: 0,
    transition: {
      ease: 'easeOut',
    },
  },
};

export const menuVariant = {
  open: {
    // delay: 0.3,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const menuItemVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const closeButtonVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};

export const heroContentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.9,
    },
  },
};

export const FadeInVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
    },
  },
};

export const slideInBottomVariant = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const avatarGrowOutVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 1.7,
    },
  },
};

export const growOutVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      // duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      // delay: 1.7,
    },
  },
};

export const projectsPageVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.6,
    },
  },
};
