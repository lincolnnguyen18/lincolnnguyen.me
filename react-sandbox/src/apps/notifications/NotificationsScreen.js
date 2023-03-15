import React from 'react';
import { NavbarBlur } from '../../components/NavbarBlur';
import { BackButton } from '../../components/BackButton';
import { Navbar } from '../../components/Navbar';
import { WhiteVignette } from '../../components/WhiteVignette';
import { OverflowContainer } from '../../components/OverflowContainer';
import { formatStringForTimer } from '../../common/stringUtils';

export function NotificationsScreen () {
  const inputRef = React.useRef(null);
  const [initialTimeString, setInitialTimeString] = React.useState('00:00:00');
  const [timeString, setTimeString] = React.useState(initialTimeString);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [alarmTime, setAlarmTime] = React.useState(null);
  const [remainingTime, setRemainingTime] = React.useState(null);
  const [keepAlive, setKeepAlive] = React.useState(null);

  const worker = new Worker('/worker.js');
  worker.onmessage = function () {
    // console.log('Main thread received message:', e.data);
    const randomNumber = Math.random();
    setKeepAlive(randomNumber);
  };

  function startTimer () {
    setInputFocused(false);
    setInitialTimeString(timeString);
    // alert(`Timer started for ${timeString}`);
    inputRef.current.blur();

    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const now = new Date();
    const alarmTime = new Date(now.getTime() + totalSeconds * 1000);
    setAlarmTime(alarmTime);
  }

  function openNotification (title, message) {
    if (!window.Notification) {
      alert(`${title}: ${message}`);
    } else {
      if (Notification.permission !== 'granted') return;
      const notification = new Notification(title, {
        body: message,
      });
      notification.onclick = function () {
        window.focus();
        notification.close();
      };
    }
  }

  React.useEffect(() => {
    // log time in hh:mm:ss format
    // console.log('keepAlive:', keepAlive, new Date().toLocaleTimeString());

    if (alarmTime) {
      const now = new Date();
      const remainingTime = alarmTime - now;
      // format remainingTime into hh:mm:ss
      const hours = Math.floor(remainingTime / 1000 / 3600);
      const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
      const seconds = Math.floor(remainingTime / 1000) % 60;
      const remainingTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setRemainingTime(remainingTimeString);
      if (remainingTime <= 0) {
        setAlarmTime(null);
        setRemainingTime(null);
        // alert('Timer finished');
        openNotification('Timer finished', initialTimeString);
      }
    }
  }, [keepAlive, alarmTime]);

  React.useEffect(() => {
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    setTimeout(() => {
      // console.log('Main thread sending message');
      worker.postMessage('Message');
    }, 3000);
  }, []);


  function onTimerClick () {
    if (!inputFocused) {
      setRemainingTime(null);
      clearInterval(window.interval);
      setInputFocused(true);
      inputRef.current.focus();
    }
  }

  function onInputChange () {
    setTimeString(formatStringForTimer(inputRef.current.value));
  }

  function onInputBlur () {
    inputRef.current.value = '';
    setInputFocused(false);
    startTimer();
  }

  function onFormSubmit (e) {
    e.preventDefault();
    inputRef.current.blur();
  }

  const showOutlineButton = inputFocused;

  return (
    <>
      <NavbarBlur twStyle='bg-blue-custom' />
      <Navbar>
        <BackButton linkPath='/' text='Back' />
        <span className='font-semibold absolute left-1/2 transform -translate-x-1/2'>Notifications</span>
      </Navbar>
      <WhiteVignette />
      <OverflowContainer>
        <div className='flex items-center justify-center'>
          <form className='w-fit h-fit' onSubmit={onFormSubmit}>
            <div
              className='text-white p-3 flex gap-2 items-center text-2xl rounded-lg cursor-pointer select-none transition-all duration-100 w-[128px] justify-center border-2 flex-shrink-0'
              onClick={onTimerClick}
              style={{
                backgroundColor: showOutlineButton ? '#fff' : '#3b6cb8',
                color: showOutlineButton ? '#3b6cb8' : '#fff',
                borderColor: showOutlineButton ? '#3b6cb8' : '#fff',
              }}
            >
              <span
                className='font-semibold'
              >
                {remainingTime ?? timeString}
              </span>
            </div>
            <input
              type='tel'
              className='rounded-lg w-[1px] h-[1px] p-2 border bg-gray-input2  placeholder-gray-500 absolute top-[-1000px] left-[-1000px]'
              ref={inputRef}
              placeholder='Enter a custom message'
              onChange={onInputChange}
              onBlur={onInputBlur}
            />
          </form>
        </div>
      </OverflowContainer>
    </>
  );
}
