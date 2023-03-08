const insertUserRecord = {
  eventID: '8ea74d340ac205f0e589be4a23da56b5',
  eventName: 'INSERT',
  eventVersion: '1.1',
  eventSource: 'aws:dynamodb',
  awsRegion: 'us-east-1',
  dynamodb: {
    ApproximateCreationDateTime: 1677661022,
    Keys: {
      sk: {
        S: '28c68e1c-1357-4970-b155-ded765dd143d',
      },
      pk: {
        S: 'userData',
      },
    },
    NewImage: {
      playbackSpeed: {
        N: '1',
      },
      transcribeLang: {
        S: 'Japanese',
      },
      transcriptCreatedAt: {
        S: '2023-03-01T08:57:01.663Z',
      },
      password: {
        S: 'password',
      },
      translateLang: {
        S: 'English (United States)',
      },
      sk: {
        S: '28c68e1c-1357-4970-b155-ded765dd143d',
      },
      pk: {
        S: 'userData',
      },
      transcriptUpdatedAt: {
        S: '2023-03-01T08:57:01.663Z',
      },
      username: {
        S: 'username',
      },
    },
    SequenceNumber: '1657100000000002265059020',
    SizeBytes: 267,
    StreamViewType: 'NEW_IMAGE',
  },
  eventSourceARN: 'arn:aws:dynamodb:us-east-1:542773719222:table/lincolnnguyen/stream/2023-02-28T22:38:55.105',
};

const removeUserRecord = {
  eventID: 'c1937e4fb73977947a51419bedb96327',
  eventName: 'REMOVE',
  eventVersion: '1.1',
  eventSource: 'aws:dynamodb',
  awsRegion: 'us-east-1',
  dynamodb: {
    ApproximateCreationDateTime: 1677660962,
    Keys: {
      sk: {
        S: '241ae596-2f0c-446b-b8cb-4167ab94f96c',
      },
      pk: {
        S: 'userData',
      },
    },
    SequenceNumber: '1657000000000002265007432',
    SizeBytes: 48,
    StreamViewType: 'NEW_IMAGE',
  },
  eventSourceARN: 'arn:aws:dynamodb:us-east-1:542773719222:table/lincolnnguyen/stream/2023-02-28T22:38:55.105',
};

const modifyUserRecord = {
  eventID: '21e676a79ba938724dc01f634050314a',
  eventName: 'MODIFY',
  eventVersion: '1.1',
  eventSource: 'aws:dynamodb',
  awsRegion: 'us-east-1',
  dynamodb: {
    ApproximateCreationDateTime: 1677661099,
    Keys: {
      sk: {
        S: '28c68e1c-1357-4970-b155-ded765dd143d',
      },
      pk: {
        S: 'userData',
      },
    },
    NewImage: {
      playbackSpeed: {
        N: '1',
      },
      transcribeLang: {
        S: 'Spanish',
      },
      transcriptCreatedAt: {
        S: '2023-03-01T08:57:01.663Z',
      },
      password: {
        S: 'password',
      },
      translateLang: {
        S: 'English (United States)',
      },
      sk: {
        S: '28c68e1c-1357-4970-b155-ded765dd143d',
      },
      pk: {
        S: 'userData',
      },
      transcriptUpdatedAt: {
        S: '2023-03-01T08:57:01.663Z',
      },
      username: {
        S: 'username',
      },
    },
    SequenceNumber: '1657200000000002265128983',
    SizeBytes: 266,
    StreamViewType: 'NEW_IMAGE',
  },
  eventSourceARN: 'arn:aws:dynamodb:us-east-1:542773719222:table/lincolnnguyen/stream/2023-02-28T22:38:55.105',
};

export { insertUserRecord, removeUserRecord, modifyUserRecord };
