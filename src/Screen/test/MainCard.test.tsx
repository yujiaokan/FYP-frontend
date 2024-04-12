import { getTimesInRange } from '../CheckIN';



  it('returns an empty array if start time is after end time', () => {
    const startTime = '13:00';
    const endTime = '10:00';

    expect(getTimesInRange(startTime, endTime)).toEqual([]);
  });

  it('returns an empty array if start time is not in allTimes', () => {
    const startTime = '08:00';
    const endTime = '10:00';

    expect(getTimesInRange(startTime, endTime)).toEqual([]);
  });

  it('returns an empty array if end time is not in allTimes', () => {
    const startTime = '09:00';
    const endTime = '15:00'; 

    expect(getTimesInRange(startTime, endTime)).toEqual([]);
  });



