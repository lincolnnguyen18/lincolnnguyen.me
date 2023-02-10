import React from 'react';
import { useDispatch } from 'react-redux';
import { recorderActions } from '../slices/recorderSlice';

export function Recorder () {
  // const { audioUrl } = useSelector(recorderSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let recorder, interval;
    // eslint-disable-next-line new-cap
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.addEventListener('result', function (e) {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
          console.log('finalTranscript', finalTranscript);
          dispatch(recorderActions.addResult(finalTranscript));
        } else {
          interimTranscript += e.results[i][0].transcript;
          console.log('interimTranscript', interimTranscript);
          dispatch(recorderActions.setSlice({ interimResult: interimTranscript }));
        }
      }
    });

    function startRecording () {
      recorder.start();
      recognition.start();
      dispatch(recorderActions.setSlice({ duration: 0, createdAt: Date.now(), results: [], interimResult: '' }));

      interval = setInterval(() => {
        dispatch(recorderActions.incrementDuration(0.1));
      }, 100);
    }

    function stopRecording () {
      // Stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
      recorder.stop();
      recognition.stop();

      clearInterval(interval);
    }

    dispatch(recorderActions.setSlice({ startRecording, stopRecording }));

    function onRecordingReady (e) {
      // e.data contains a blob representing the recording
      const audioUrl = URL.createObjectURL(e.data);
      const audio = document.getElementById('audio');
      audio.src = audioUrl;
      // dispatch(recorderActions.setSlice({ audioUrl }));
    }

    navigator.mediaDevices.getUserMedia({
      audio: true,
    })
      .then(function (stream) {
        recorder = new window.MediaRecorder(stream);

        // listen to dataavailable, which gets triggered whenever we have
        // an audio blob available
        recorder.addEventListener('dataavailable', onRecordingReady);
      });
  }, []);

  // React.useEffect(() => {
  //   if (!audioUrl) return;
  //   const audio = document.getElementById('audio');
  //   if (!audio) return;
  //   console.log('audioUrl', audioUrl);
  //   audio.src = audioUrl;
  //   // audio.addEventListener('loadeddata', function () {
  //   //   audio.play();
  //   // });
  // }, [audioUrl]);

  return (
    <audio id="audio" controls hidden={false}></audio>
  );
}
