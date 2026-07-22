declare module "wow.js" {
  interface WOWOptions {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
    scrollContainer?: string | null;
    resetAnimation?: boolean;
    callback?: (box: Element) => void;
  }

  class WOW {
    constructor(options?: WOWOptions);
    init(): void;
    sync(): void;
  }

  export default WOW;
}
