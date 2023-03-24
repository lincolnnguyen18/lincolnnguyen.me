import { Colors } from 'common/data';

export default function AppBackground () {
  return (
    <div
      className='w-full max-w-screen-2xl fixed left-1/2 transform -translate-x-1/2 xl:blur-3xl lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%] z-[-1] transition-all duration-200 ease-out'
      style={{ backgroundColor: Colors.AppBackground }}
    />
  );
}
