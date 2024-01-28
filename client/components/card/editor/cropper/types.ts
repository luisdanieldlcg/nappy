import {
  CropperResult,
  Point,
  ImageSize,
  Size,
  SizeRestrictions,
  Transform,
  VisibleArea,
  Coordinates,
} from "vue-advanced-cropper";

export type ImageCropper = {
  imageSize: ImageSize;
  sizeRestrictions: SizeRestrictions;
  boundaries: Size;
  visibleArea: VisibleArea;
  coordinates: Coordinates;
  getResult: () => CropperResult;
  setCoordinates: (transform: Transform | Transform[]) => void;
  refresh: () => void;
  zoom: (factor: number, center?: Point) => void;
  move: (left: number, top?: number) => void;
  rotate: (angle: number) => void;
  flip: (horizontal: boolean, vertical?: boolean) => void;
  reset: () => void;
};
