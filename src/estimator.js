const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    periodType,
    timeToElapse,
    reportedCases,
    // population,
    totalHospitalBeds
  } = input;
  // Challenge 1
  const currentlyInfectedNormal = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;
  const checkRequestedTime = () => {
    let daysValue;
    if (periodType === 'weeks') {
      daysValue = timeToElapse * 7;
    } else if (periodType === 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    return daysValue;
  };

  const getInfectionsByRequestedTimeNormal = (currentlyInfected) => {
    const x = currentlyInfected * (2 ** Math.floor(checkRequestedTime() / 3));
    return x;
  };

  const infectionsByRTN = getInfectionsByRequestedTimeNormal(currentlyInfectedNormal);
  const infectionsByRTS = getInfectionsByRequestedTimeNormal(currentlyInfectedSevere);

  // Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRT) => infectionsByRT * (0.15);
  const severeCaseByRTN = getSevereCaseByRequestedTime(infectionsByRTN);
  const severeCaseByRTS = getSevereCaseByRequestedTime(infectionsByRTS);

  // get number of beds
  const getHospitalBedsByRequestedTime = () => {
    const n = (Math.round(totalHospitalBeds * 0.35)) - severeCaseByRTN;
    const s = (Math.round(totalHospitalBeds * 0.35)) - severeCaseByRTS;
    return {
      normal: n,
      severe: s
    };
  };

  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedNormal,
      infectionsByRequestedTime: infectionsByRTN,
      severeCaseByRequestedTime: severeCaseByRTN,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime().normal,
      casesForICUByRequestedTime: '',
      casesForVentilatorsByRequestedTime: '',
      dollarsInFlight: ''
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRTS,
      severeCaseByRequestedTime: severeCaseByRTS,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime().severe,
      casesForICUByRequestedTime: '',
      casesForVentilatorsByRequestedTime: '',
      dollarsInFlight: ''
    }
  };
};

export default covid19ImpactEstimator;
