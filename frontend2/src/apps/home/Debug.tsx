import environment from 'common/environment';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';

export default function Debug (): JSX.Element | null {
  const { scrollPositionFromTop, scrollPositionFromBottom, screenWidth, screenHeight } = useSelector(commonSelector);

  if (environment.showDebug) {
    return (
      <div className='bg-black bg-opacity-70 fixed bottom-0 left-0 p-2 text-white z-[3]'>
        <div>scrollPositionFromTop: {scrollPositionFromTop}</div>
        <div>scrollDistanceFromBottom: {scrollPositionFromBottom}</div>
        <div>screenWidth: {screenWidth}</div>
        <div>screenHeight: {screenHeight}</div>
      </div>
    );
  } else {
    return null;
  }
}
