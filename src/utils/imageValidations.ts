const userNoImage = '/user-no-image.webp';
const noImage = '/no-image.jpg';
export const verifyIfFilePathIsAnImage = (file?: string) => file && file.match(/\.(jpeg|jpg|png|webp)$/) != null;

interface ReturnsImageOrNoImage {
  url?: string;
  type?: 'user' | 'other';
}

export const getImageOrNoImage = ({
  url,
  type
}: ReturnsImageOrNoImage) => verifyIfFilePathIsAnImage(url) ? url : type === 'user' ? userNoImage : noImage;