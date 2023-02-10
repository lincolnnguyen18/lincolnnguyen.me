import React from 'react';
import { useDispatch } from 'react-redux';
import { transcribeActions } from '../slices/transcribeSlice';

export function Recorder () {
  const dispatch = useDispatch();

  React.useEffect(() => {
    let recorder, interval;
    let isNewInterim = false;
    // eslint-disable-next-line new-cap
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.addEventListener('result', function (e) {
      let interimResult = '';
      let finalResult = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalResult += e.results[i][0].transcript;
          dispatch(transcribeActions.addResult(finalResult));
          dispatch(transcribeActions.setSlice({ interimResult: '' }));
          isNewInterim = true;
        } else {
          interimResult += e.results[i][0].transcript;
          dispatch(transcribeActions.setSlice({ interimResult }));
          if (isNewInterim) {
            dispatch(transcribeActions.setInterimTimestamp());
          }
          isNewInterim = false;
        }
      }
    });

    function startRecording (resuming = false) {
      recorder.start();
      recognition.start();
      dispatch(transcribeActions.addPart());
      if (!resuming) {
        dispatch(transcribeActions.setSlice({ createdAt: Date.now() }));
      }
      dispatch(transcribeActions.setSlice({ updatedAt: Date.now(), mode: 'record' }));

      interval = setInterval(() => {
        dispatch(transcribeActions.incrementDuration(0.1));
      }, 100);
    }

    function stopRecording () {
      recorder.stop();
      recognition.stop();
      clearInterval(interval);
    }

    dispatch(transcribeActions.setSlice({ startRecording, stopRecording }));

    function onRecordingReady (e) {
      const audioUrl = URL.createObjectURL(e.data);
      const audio = document.getElementById('audio');
      audio.src = audioUrl;
      dispatch(transcribeActions.setLatestPart({ audioUrl }));
    }

    navigator.mediaDevices.getUserMedia({
      audio: true,
    })
      .then(function (stream) {
        recorder = new window.MediaRecorder(stream);
        recorder.addEventListener('dataavailable', onRecordingReady);
      });
  }, []);

  return (
    <audio id="audio" controls hidden={true}></audio>
  );
}
