export interface IAnimateArgs {
  timing: (timeFraction: number) => number;
  draw: (progress: number) => void;
  duration: number;
}
